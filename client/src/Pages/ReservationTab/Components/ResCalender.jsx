import React from 'react'
import resCalenderIcon from "../../../Assets/Images/resCalender.png"
import style from "./Style.module.css"

export default function ResCalender() {
  return (
    <>
            <div className={style.calenderContainer}>
                <img src={resCalenderIcon}/>
                <span>15th Feb,2023</span>
            </div>
    </>
  )
}
