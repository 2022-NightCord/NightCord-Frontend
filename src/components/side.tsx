import React from "react";
import { ReactComponent as Discord } from "../svg/discord.svg";
import { ReactComponent as Plus } from "../svg/plus.svg";
import { ReactComponent as Search } from "../svg/search.svg";

import "../style/side.css";
import ChatRoomList from "./chat-room-list";

const Side: React.FC<{}> = () => {
    return (
        <div className="side-bar">
            <div className="server-list">
                <div className="change--blue">
                    <div className="side--icon">
                        <Discord className="side--icon--discord" fill="#ffffff"></Discord>
                    </div>
                    <div className="side--bar--divide"></div>
                    <div className="side--icon">
                        <span>현준님의 서버</span>
                    </div>
                </div>
                <div className="change--green">
                    <div className="side--icon">
                        <Plus className="side--icon--discord" fill="#469d63"></Plus>
                    </div>
                    <div className="side--icon">
                        <Search className="side--icon--discord" fill="#469d63"></Search>
                    </div>
                </div>
            </div>
            <ChatRoomList />
        </div>
    )

}

export default Side;