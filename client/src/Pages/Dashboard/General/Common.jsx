import React from 'react'
import WelcomeBar from '../General/WelcomeBar/WelcomeBar'
import NotificationBox from '../General/NotificationBox/NotificationBox'
import Cal from '../General/Calendar/Cal'
import style from '../General/Common.module.css'



const Common = (props) => {
  return (
    <div className={style.Container}>
    <div className={style.LeftPanel}>
     <WelcomeBar />
     <div className={style.otherCont}>
        {props.children}
     </div>
    </div>
    <div className={style.RightPanel}>
      <NotificationBox />
      
      <Cal />

    </div>
  </div>
  )
}

export default Common
