import React from 'react'
import style from '../components/Minibar.module.css'
export default function Topbutton() {
  return (
    <div className={style.comb}>
    <button className={style.btn1}>Laundry</button>
    <button className={style.btn2}>Minibar</button>
    </div>
  )
}
