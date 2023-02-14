import React from 'react'
import resCalenderIcon from "../../../Assets/Images/resCalender.png"
import style from "./Style.module.css"

export default function ResCalender() {
  return (
    <>
            <div className={style.calenderContainer}>
                <img src={resCalenderIcon}/>
                <span>23rd jan,2022</span>
            </div>
    </>
  )
}
