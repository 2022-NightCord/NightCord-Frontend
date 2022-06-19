import React from "react";
import { ReactComponent as Hash } from "../svg/hash.svg";
import { ReactComponent as HashMassage } from "../svg/hashMessage.svg";
import { ReactComponent as Alarm } from "../svg/alarm.svg";
import { ReactComponent as Pin } from "../svg/pin.svg";
import { ReactComponent as Member } from "../svg/member.svg";
import { ReactComponent as Letter } from "../svg/letter.svg";
import { ReactComponent as Help } from "../svg/help.svg";
import { ReactComponent as Theme } from "../svg/theme.svg";

import "../style/header.css";

interface propsType {
    toggleTheme: VoidFunction
}

const Header: React.FC<propsType> = (props: propsType) => {

    const chatroom: string = "일반"

    return(
        <div className="header">
            <div className="header--left">
                <Hash className="header--hash" fill="#829297"/>
                <div className="header--title">{ chatroom }</div>
            </div>
            <div className="header--right">
                <Theme className="header--hashmessage" onClick={props.toggleTheme}></Theme>
                <HashMassage className="header--hashmessage"></HashMassage>
                <Alarm className="header-alarm"></Alarm>
                <Pin className="header--pin"></Pin>
                <Member className="header--member"></Member>
                <input className="header--input" placeholder="검색하기"></input>
                <Letter className="header--letter"></Letter>
                <Help className="header--help"></Help>
            </div>
        </div>

    )
}

export default Header;