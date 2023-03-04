import React, { useEffect, useState } from 'react'
import resCalenderIcon from "../../../Assets/Images/resCalender.png"
import style from "./Style.module.css"

export default function ResCalender() {
  const [currentDate,setCurrentDate]=useState(new Date())
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  const formattedDate = `${day}${getDaySuffix(day)} ${month.charAt(0).toUpperCase() + month.slice(1)}, ${year}`;
  return (
    <>
            <div className={style.calenderContainer}>
                <img src={resCalenderIcon}/>
                <span>{formattedDate}</span>
            </div>
    </>
  )
}

function getDaySuffix(day) {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}
