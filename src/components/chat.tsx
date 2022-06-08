import React from 'react';
import ChatItem from './chat-item';
import axios, { AxiosPromise } from 'axios';
import '../style/chat.css'

interface chatType {
    id: number
    guestId: number,
    date: Date,
    content: string
}

const Chat: React.FC = () => {
    const [chatItemEl, setChatItemEl] = React.useState<JSX.Element[]>([]);

    React.useEffect(() => {
        (async () => {
            const chatData: chatType[] = (await getChatList()).data.reverse();
            setChatItemEl(() => chatData.map(chat => <ChatItem key={chat.id} {...chat} date={new Date(chat.date)} />));
        })();
    }, []);
    
    const getChatList = (startChatId: number = 0): AxiosPromise<chatType[]> => {
        return axios.get(`http://localhost:3000/api/chat?startChatId=${startChatId}`);
    }

    return (
        <section className='chat'>
            <ul className='chat--item-list'>
                {chatItemEl}
            </ul>
        </section>
    );
}
export default Chat;