import React from 'react';
import '../style/main.css'
import { Socket } from 'socket.io-client';
import Chat from './chat';
import User from './now-user';

interface propsType {
    socket: Socket,
    guestId: number
}

const Main: React.FC<propsType> = (props: propsType) => {
    return (
        <main>
            <Chat socket={props.socket} guestId={props.guestId} />
            <User socket={props.socket}/>
        </main>
    );
}
export default Main;