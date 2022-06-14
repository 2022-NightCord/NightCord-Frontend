import React from 'react';
import '../style/main.css'
import { Socket } from 'socket.io-client';
import Chat from './chat';

interface propsType {
    socket: Socket,
    guestId: number
}

const Main: React.FC<propsType> = (props: propsType) => {
    return (
        <main>
            <Chat socket={props.socket} guestId={props.guestId} />
        </main>
    );
}
export default Main;