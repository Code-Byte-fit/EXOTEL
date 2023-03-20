import React from 'react';
import style from './components/NotificationCard.module.css'

const NotificationBox = () => {
    return (
        <div className={style.notificationbox}>
            <div className={style.head}>Notifications</div>
            <div className={style.all}>View All</div>
            <div className={style.notification}>
                <div className={style.profilepic}>
                    <img src="https://via.placeholder.com/50" alt="Profile pic" />
                </div>
                <div className={style.notificationcontent}>
                    <div className={style.heading}>Notification Heading</div>
                    <div className={style.message}>Notification Message</div>
                    <div className={style.time}>12:30 PM</div>

                </div>
                <div className={style.remove}>
                    <button>X</button>
                </div>
            </div>
            <div className={style.notification}>
                <div className={style.profilepic}>
                    <img src="https://via.placeholder.com/50" alt="Profile pic" />
                </div>
                <div className={style.notificationcontent}>
                    <div className={style.heading}>Notification Heading</div>
                    <div className={style.message}>Notification Message</div>
                    <div className={style.time}>12:30 PM</div>

                </div>
                <div className={style.remove}>
                    <button>X</button>
                </div>
            </div>
            <div className={style.notification}>
                <div className={style.profilepic}>
                    <img src="https://via.placeholder.com/50" alt="Profile pic" />
                </div>
                <div className={style.notificationcontent}>
                    <div className={style.heading}>Notification Heading</div>
                    <div className={style.message}>Notification Message</div>
                    <div className={style.time}>12:30 PM</div>

                </div>
                <div className={style.remove}>
                    <button>X</button>
                </div>
            </div>
          
        </div>
    )
}

export default NotificationBox;


