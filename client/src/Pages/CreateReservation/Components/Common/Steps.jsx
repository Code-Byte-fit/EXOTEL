import React from 'react'
import style from "./Style.module.css"

export default function Steps(props) {
  return (
    <div>
        <span className={`${style.step} ${props.completed && style.stepCompleted}`}>{props.step}</span>
        <span className={style.stepText}>{props.text}</span>
    </div>
  )
}
