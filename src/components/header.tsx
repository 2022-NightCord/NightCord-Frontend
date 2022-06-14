import React from "react";
import { ReactComponent as Hash } from "../svg/hash.svg";
import { ReactComponent as HashMassage } from "../svg/hashMessage.svg";
import { ReactComponent as Alarm } from "../svg/alarm.svg";
import { ReactComponent as Pin } from "../svg/pin.svg";
import { ReactComponent as Member } from "../svg/member.svg";
import { ReactComponent as Letter } from "../svg/letter.svg";
import { ReactComponent as Help } from "../svg/help.svg";

import "../style/header.css";

const Header: React.FC<{}> = () => {

    const chatroom: string = "일반"

    return(
        <div className="header">
            <div className="header--left">
                <Hash className="header--hash" fill="#829297"/>
                <div className="header--title">{ chatroom }</div>
            </div>
            <div className="header--right">
                <HashMassage className="header--hashmessage" fill="#babbbf"></HashMassage>
                <Alarm className="header-alarm" fill="#babbbf"></Alarm>
                <Pin className="header--pin" fill="#babbbf"></Pin>
                <Member className="header--member" fill="#babbbf"></Member>
                <input className="header--input" placeholder="검색하기"></input>
                <Letter className="header--letter" fill="#babbbf"></Letter>
                <Help className="header--help" fill="#babbbf"></Help>
            </div>
        </div>

    )
}

export default Header;