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
    const chatListRef = React.useRef<HTMLUListElement>(null)

    React.useEffect(() => {
        (async () => {
            const chatData: chatType[] = (await getChatList()).data.reverse();
            // 채팅 목록이 없으면
            if (!chatData.length) {
                return setLoading(false);
            }

            setStartChatId(() => chatData[0].id);
            setChatItemEl(() => chatData.map(chat => <ChatItem key={chat.id} {...chat} date={new Date(chat.date)} />));
            chatListRef.current?.scrollTo({
                top: chatListRef.current.scrollHeight
            });
            setLoading(false);
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
            setChatItemEl((prev) => [
                ...chatData.map(chat => <ChatItem key={chat.id} {...chat} date={new Date(chat.date)} />),
                ...prev
            ]);
            chatListRef.current?.scrollTo({
                top: chatListRef.current.scrollHeight
            });
            setLoading(false);
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