import React from 'react';
import './App.css';
import { io } from 'socket.io-client';
import Chat from './components/chat';

const socket = io('http://localhost:3000', {
    transports: ['websocket']
});

function App() {
    return (
        <div className="App dark">
            <Chat socket={socket} />
        </div>
    );
}

export default App;
