import React from 'react';
import { Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { ReactComponent as Discord } from "../svg/discord.svg";
import '../style/user.css';
import '../style/profile-background.css';

interface propsType {
    socket: Socket
}

const User: React.FC<propsType> = (props: propsType) => {
    const [nowClients, setNowClients] = useState<number[]>([]);
    const [countClients, setCountClients] = useState<number>(0);

    useEffect(() => {
        props.socket.on('nowClients', (res) => {
            // 현재 접속한 클라이언트 Guestid 배열
            setNowClients(res);
            // console.log(res);
        })
        props.socket.on('users', (res: number) => {
            // 현재 접속한 유저 수 
            setCountClients(res);
        })
    }, []);


    const Users = nowClients.map((Guestid) => {
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
            <div className="user--personal">
                <div className={findPersonalColor(Guestid)} id="user--personal--icon">
                    <Discord className="side--icon--discord" fill="#ffffff"></Discord>
                    <div className="user--personal--icon--online--gray"></div>
                    <div className="user--personal--icon--online"></div>
                </div>
                <span>Guest {Guestid}</span>
            </div>
        )
    })

    return (
        <section className='now-user'>
            <div className='count-users'>온라인 - {countClients}</div>
            <div className='users'>
                {Users}
            </div>
        </section>
    );
}
export default User;