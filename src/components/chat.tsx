import React from 'react';
import { useInView } from "react-intersection-observer";
import ChatItem from './chat-item';
import axios, { AxiosPromise } from 'axios';
import '../style/chat.css';
import { Socket } from 'socket.io-client';

interface propsType {
    socket: Socket,
    guestId: number
}

interface chatType {
    id: number
    guestId: number,
    date: Date,
    content: string
}

const Chat: React.FC<propsType> = (props: propsType) => {
    const [chatItemEl, setChatItemEl] = React.useState<JSX.Element[]>([]);
    const [startChatId, setStartChatId] = React.useState(0);
    const [loading, setLoading] = React.useState(true);
    const [chatLoadRef, inView] = useInView();
    const chatListRef = React.useRef<HTMLUListElement>(null);
    const chatInputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        init();
    }, []);

    const init = () => {
        reciveChat();
        InitChatList();
    }

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

    const InitChatList = async () => {
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
    }
    
    const getChatList = (startChatId: number = 0): AxiosPromise<chatType[]> => {
        return axios.get(`http://localhost:3000/api/chat?startChatId=${startChatId}`); 
    }

    const reciveChat = () => {
        props.socket.on('chat', async (chat: chatType) => {
            console.log(chat)
            setChatItemEl((prev) => [
                ...prev,
                <ChatItem key={chat.id} {...chat} date={new Date(chat.date)} />
            ]);
            // 리렌더링 시간 때문에 잠시 딜레이
            setTimeout(() => {
                // 스크롤 위치 이동
                chatListRef.current?.scrollTo({
                    top: (chatListRef.current.scrollTop == chatListRef.current.scrollHeight)?
                        chatListRef.current.scrollTop:
                        chatListRef.current.scrollHeight
                });
            }, 1);
        });
    }

    const sendChat = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (chatInputRef.current?.value) {
            props.socket.emit('chat', {
                guestId: props.guestId,
                content: chatInputRef.current.value
            });
            chatInputRef.current.value = '';
        } else {
            return alert('채팅을 보내는 중에 문제가 발생하였습니다.');
        }
    }

    return (
        <section className='chat'>
            <ul className='chat--item-list scroll-bar' ref={chatListRef}>
                {startChatId > 1 || startChatId == 0? <li className='chat--load' ref={chatLoadRef}></li>: null}
                {chatItemEl}
            </ul>
            <form className='chat--input' onSubmit={sendChat}>
                <input
                    ref={chatInputRef}
                    name="chat-content"
                    type="text"
                    placeholder="보낼 내용 입력"
                    required
                />
                <button>보내기</button>
            </form>
        </section>
    );
}
export default Chat;