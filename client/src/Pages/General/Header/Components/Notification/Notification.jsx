import React, { useEffect, useState } from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';
import io from 'socket.io-client';
import style from "./Notification.module.css"


export default function Notification() {
  const socket = io('http://your-backend-url'); 
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on('notification', (notification) => {
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off('notification');
    };
  }, []);
  return (
    <>
        <span className={style.notificationContainer}>
        <IoMdNotificationsOutline size={30} />
          {notifications.length > 0 && (
            <div className="notification-list">
              {notifications.map((notification, index) => (
                <div key={index}>{notification.content}</div>
              ))}
            </div>
          )}
        </span>
    </>
  )
}
