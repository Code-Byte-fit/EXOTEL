import React, { useEffect, useState } from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';

import style from "./Notification.module.css"


export default function Notification() {
  return (
    <>
        <span className={style.notificationContainer}>
        <IoMdNotificationsOutline size={30} />
        </span>
    </>
  )
}
