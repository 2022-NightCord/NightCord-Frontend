import React from 'react';
import { ReactComponent as Discord } from "../svg/discord.svg";

interface propsType {
    guestId: number,
    date: Date,
    content: string
}

const ChatItem: React.FC<propsType> = (props: propsType) => {

    const findPersonalColor = (guestId: number): string => {
        switch (guestId % 5) {
            case 0:
                return 'chat--item--profile-gray';
            case 1:
                return 'chat--item--profile-blue';
            case 2:
                return 'chat--item--profile-green';
            case 3:
                return 'chat--item--profile-yellow';
            case 4:
                return 'chat--item--profile-red';
        } 
        return 'chat--item--profile-blue';
    }

    return (
        <li className='chat--item'>
            <div className={findPersonalColor(props.guestId)} id="chat--item--profile">
                <Discord className="side--icon--discord" fill="#ffffff"></Discord>
            </div>
            <div className='chat--item--content-wrap'>
                <div className='chat--item--header'>
                    <div className='chat--item--nickname'>{`Guest ${props.guestId}`}</div>
                    <div className='chat--item--date'>{props.date.toLocaleString()}</div>
                </div>
                <div className='chat--item--content'>{props.content}</div>
            </div>
        </li>
    );
}
export default ChatItem;