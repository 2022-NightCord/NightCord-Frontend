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
    const [darkTheme, setDarkTheme] = React.useState<Boolean>(true);
    const [guestId, setGuestId] = React.useState<number>(0);

    React.useEffect(() => {
        // themeInit();
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

    const themeInit = () => {
        const prevTheme = localStorage.getItem('dark_theme');
        // 기존 테마 설정이 있다면
        if (prevTheme !== null) {
            return setDarkTheme(Boolean(prevTheme));
        }

        // 기존 테마 설정이 없다면 현재 디바이스의 기본 테마 설정을 가져옴
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        if (prefersDarkScheme.matches) {
            localStorage.setItem('dark_theme', 'true');
            setDarkTheme(true);
        } else {
            localStorage.setItem('dark_theme', 'false');
            setDarkTheme(false);
        }
    }

    const toggleTheme = () => {
        if (darkTheme) {
            localStorage.setItem('dark_theme', 'false');
            setDarkTheme(false);
        } else {
            localStorage.setItem('dark_theme', 'true');
            setDarkTheme(true);
        }
    }

    return (
        <div className={`App${darkTheme? ' dark': ''}`}>
            <Header toggleTheme={toggleTheme}/>
            <Side/>
            <Main socket={socket} guestId={guestId} />
        </div>
    );
}

export default App;
