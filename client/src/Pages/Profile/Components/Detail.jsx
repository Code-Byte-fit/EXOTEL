import React from 'react'
import style from "./Style.module.css"

export default function Detail(props) {
  return (
    <div className={style.detail}>
        <span className={style.label}>{props.label}</span>
        <span className={style.value}>{props.value}</span>
    </div>
  )
}
