import React from 'react';
import './App.css';
import axios from 'axios';
import { io } from 'socket.io-client';
import Header from './components/header'
import Side from './components/side';
import Main from './components/main';
import User from './components/now-user';

const socket = io('http://localhost:3000', {
    transports: ['websocket']
});

function App() {
    const [guestId, setGuestId] = React.useState<number>(0);

    React.useEffect(() => {
        (async() => {
            const loadGuestId = localStorage.getItem('guestId');
            // 만약 기존 데이터가 있다면
            if (loadGuestId !== null) {
                socket.emit('getGuestId', Number(loadGuestId));
                return setGuestId(() => Number(JSON.parse(loadGuestId)));
            }
            const newGuestId = await getGuestId();
            localStorage.setItem('guestId', JSON.stringify(newGuestId));
            setGuestId(() => newGuestId);

            socket.emit('getGuestId', Number(newGuestId));
        })();
    }, []);

    const getGuestId = async() => {
        return Number((await axios.post('http://localhost:3000/api/chat/user')).data.newGuestId);
    }
    return (
        <div className="App dark">
            <Header/>
            <Side/>
            <Main socket={socket} guestId={guestId} />
        </div>
    );
}

export default App;
