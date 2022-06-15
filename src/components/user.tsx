import React from 'react';
import { Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';

interface propsType {
    socket: Socket
}

const User: React.FC<propsType> = (props: propsType) => {
    const [nowClients, setNowClients] = useState<number[]>();
    const [countClients, setCountClients] = useState<number>();

    useEffect(() => {
        props.socket.on('nowClients', (res) => {
            // 현재 접속한 클라이언트 Guestid 배열
            setNowClients(res);
            console.log(res);
        })
        props.socket.on('users', (res: number) => {
            // 현재 접속한 유저 수 
            setCountClients(res);
        })
    }, []);

    return (
        <div>
            {nowClients}
        </div>
    );
}
export default User;