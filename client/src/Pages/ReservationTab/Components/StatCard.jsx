import React from 'react'
import style from "./Style.module.css"

export default function StatCard(props) {
  return (
    <>
        <div className={style.card}>
            <span className={style.value}>{props.value}</span>
            <span className={style.desc}>{props.desc}</span>
        </div>
    </>
  )
}
