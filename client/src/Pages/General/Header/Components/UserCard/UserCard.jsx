import React from 'react'
import avatarPic from "../../../../../Assets/Images/DP2.png"
import style from "./UserCard.module.css"

export default function UserCard() {
  return (
    <>
        <img src={avatarPic} className={style.avatarPic}/>
        <div className={style.userTextContainer}>
            <span className={style.name}>Malithi Abayadeera </span>
            <span className={style.role}>Administrator</span>
        </div>
    </>
  )
}
