import React from 'react';
import { ReactComponent as Discord } from "../svg/discord.svg";
import '../style/profile-info.css'

interface propsType {
    guestId: number
}

const ProfileInfo: React.FC<propsType> = (props: propsType) => {
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
        <div className='side-profile-info'>
            <div className={findPersonalColor(props.guestId)} id="user--personal--icon">
                <Discord className="side--icon--discord" fill="#ffffff"></Discord>
                <div className="user--personal--icon--online--gray"></div>
                <div className="user--personal--icon--online"></div>
            </div>
            <div className='right-wrap'>
                <span className='profile-info--nickname'>Guest {props.guestId}</span>
                <span className='profile-info--id'>{props.guestId}</span>
            </div>
        </div>
    );
}
export default ProfileInfo;