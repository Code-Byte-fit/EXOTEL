import React, { useContext } from 'react';
import { AppContext } from '../../../../../Helpers/AppContext';
import style from './UserCard.module.css';

export default function UserCard() {
  const { authState,host } = useContext(AppContext);
  const avatar=authState.proPic.split('\\')[2];


  return (
    <>
      <img src={`${host}/Images/${avatar}`} className={style.avatarPic} alt="Profile picture" />
      <div className={style.userTextContainer}>
        <span className={style.name}>{authState.FirstName} {authState.LastName}</span>
        <span className={style.role}>{authState.userRole}</span>
      </div>
    </>
  );
}

