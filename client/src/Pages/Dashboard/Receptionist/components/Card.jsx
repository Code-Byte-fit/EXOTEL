import React from 'react'
import style from "../Receptionist.module.css"

export default function Card({img,value,desc}) {
  return (
    <div className={style.card}>
        <div className={style.cardContent}>
        <img src={img} className={style.cardImg}/> 
        <span className={style.value}>{value}</span>
        <span>{desc}</span>
        </div>
        
    </div>
  )
}
