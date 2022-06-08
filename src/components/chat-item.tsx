import React from 'react';

interface propsType {
    guestId: number,
    date: Date,
    content: string
}

const ChatItem: React.FC<propsType> = (props: propsType) => {
    return (
        <li className='chat--item'>
            <div className='chat--item--profile'>
                <span>{props.guestId}</span>
            </div>
            <div className='chat--item--content-wrap'>
                <div className='chat--item--header'>
                    <div className='chat--item--nickname'>{`${props.guestId}번째 방문자`}</div>
                    <div className='chat--item--date'>{props.date.toLocaleString()}</div>
                </div>
                <div className='chat--item--content'>{props.content}</div>
            </div>
        </li>
    );
}
export default ChatItem;