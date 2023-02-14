import React from 'react'
import avatarPic from "../../../../../Assets/Images/DP2.png"
import style from "./UserCard.module.css"

export default function UserCard() {
  return (
    <>
        <img src={avatarPic} className={style.avatarPic}/>
        <div className={style.userTextContainer}>
            <span className={style.name}>Shamly Shanawaz </span>
            <span className={style.role}>Receptionist</span>
        </div>
    </>
  )
}
