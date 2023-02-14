import React from 'react'
import notificationIcon from "../../../../../Assets/Images/NotificationIcon.png"
import notificationEclipse from "../../../../../Assets/Images/NotificationEclipse.png"
import style from "./Notification.module.css"


export default function Notification() {
  return (
    <>
        <span className={style.notificationContainer}>
             <img src={notificationIcon}/>
             <img src={notificationEclipse} className={style.notificationEclipse}/>
        </span>
    </>
  )
}
