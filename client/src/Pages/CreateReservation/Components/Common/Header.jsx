import React from 'react'
import Steps from './Steps'
import style from "./Style.module.css"

export default function Header(props) {
  return (
    <div className={style.Header}>
        <span className={style.heading}>NEW RESERVATION</span> 
        <div className={style.stepsContainer}>
          <Steps step="1" text="AVAILABILITY" completed={props.completedOne}/>
          <Steps step="2" text="DETAILS" completed={props.completedTwo}/>
          <Steps step="3" text="CONFIRM" completed={props.completedThree}/>
        </div>
    </div>
  )
}