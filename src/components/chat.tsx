import React from 'react';
import { useInView } from "react-intersection-observer";
import ChatItem from './chat-item';
import axios, { AxiosPromise } from 'axios';
import '../style/chat.css';

interface chatType {
    id: number
    guestId: number,
    date: Date,
    content: string
}

const Chat: React.FC = () => {
    const [chatItemEl, setChatItemEl] = React.useState<JSX.Element[]>([]);
    const [startChatId, setStartChatId] = React.useState(0);
    const [loading, setLoading] = React.useState(true);
    const [chatLoadRef, inView] = useInView();
    const chatListRef = React.useRef<HTMLUListElement>(null);

    React.useEffect(() => {
        (async () => {
            const chatData: chatType[] = (await getChatList()).data.reverse();
            // 채팅 목록이 없으면
            if (!chatData.length) {
                return setLoading(false);
            }

            setStartChatId(() => chatData[0].id);
            setChatItemEl(() => chatData.map(chat => <ChatItem key={chat.id} {...chat} date={new Date(chat.date)} />));

            // 리렌더링 시간 때문에 잠시 딜레이
            await (() => new Promise((resolve) => {
                setTimeout(() => {
                    // 첫 렌더링시에는 무조건 스크롤이 바닥에 붙어있어야 함
                    chatListRef.current?.scrollTo({
                        top: chatListRef.current.scrollHeight
                    });
                    resolve(true);
                }, 1);
            }))();
            // 스크롤 변경도 딜레이 필요
            setTimeout(() => {
                setLoading(false);
            }, 1);
        })();
    }, []);

    React.useEffect(() => {
        // 스크롤이 아직 남아있거나 로딩중이라면
        if (!inView || loading) {
            return;
        }
        // 아니면 다음 채팅 목록을 가져옴
        setLoading(true);
        (async () => {
            const chatData: chatType[] = (await getChatList(startChatId)).data.reverse();
            // 채팅 목록이 없으면
            if (!chatData.length) {
                return setLoading(false);
            }

            setStartChatId(() => chatData[0].id);
            const prevScrollY = Number(chatListRef.current?.scrollTop);
            const prevHeight = Number(chatListRef.current?.scrollHeight);
            setChatItemEl((prev) => [
                ...chatData.map(chat => <ChatItem key={chat.id} {...chat} date={new Date(chat.date)} />),
                ...prev
            ]);

            // 리렌더링 시간 때문에 잠시 딜레이
            await (() => new Promise((resolve) => {
                setTimeout(() => {
                    // 원래 스크롤 위치로 이동
                    chatListRef.current?.scrollTo({
                        top: chatListRef.current.scrollHeight - prevHeight + prevScrollY
                    });
                    resolve(true);
                }, 1);
            }))();
            // 리로딩 쿨타임
            setTimeout(() => {
                setLoading(false);
            }, 200);
        })();
    }, [inView, loading]);
    
    const getChatList = (startChatId: number = 0): AxiosPromise<chatType[]> => {
        return axios.get(`http://localhost:3000/api/chat?startChatId=${startChatId}`); 
    }

    return (
        <section className='chat'>
            <ul className='chat--item-list' ref={chatListRef}>
                {startChatId > 1 || startChatId == 0? <li className='chat--load' ref={chatLoadRef}></li>: null}
                {chatItemEl}
            </ul>
        </section>
    );
}
export default Chat;