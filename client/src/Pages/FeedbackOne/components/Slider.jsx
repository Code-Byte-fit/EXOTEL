import React from 'react'
import style from "../components/PageTwo.module.css"

export default function Slider(props) {
  return (
    <>
        <div className={style.container}>
            <label for={props.id} className={style.label}>{props.desc}</label>
            <div className={style.slider}>
                <input type="range" min={0} max={100}  className={style.rangeInput} id={props.id} onChange={props.onChange} defaultValue={props.defaultValue} 
                />
            </div>
        </div>
    </>
  )
}
