import React from 'react';
import '../style/chat-room-list.css'
import { ReactComponent as Hash } from "../svg/hash.svg";

const ChatRoomList: React.FC = () => {
    return (
        <div className='side-room-info'>
            <div className='room-title'>
                <h4>현준님의 서버</h4>
                <span>v</span>
            </div>
            <ul className='chat-room-list'>
                <li>
                    <span className='category'>채팅 채널</span>
                    <ul className='room-list'>
                        <li>
                            <Hash className="hash" fill="#829297"/>
                            <span>일반</span>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}
export default ChatRoomList;