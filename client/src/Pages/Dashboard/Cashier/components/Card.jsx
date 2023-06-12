import React from 'react'
import {FaPlus} from 'react-icons/fa'
import style from '../components/Card.module.css'
export default function Card() {
  return (

      <div className={style.contain} >
      <div className={style.card1}>
        {/* <div className={style.value}></div> */}
        <div className={style.text}>Check Outs</div>
      </div>
      <div className={style.card1}>
        {/* <div className={style.value}></div> */}
        <div className={style.text}>Cash in Hands</div>
      </div>
      <div className={style.card1}>
        {/* <div className={style.value}></div> */}
        <div className={style.text}>Total Bills</div>
      </div>
      <div className={style.card1}>
        {/* <div className={style.value}></div> */}
        <div className={style.text}>Create <br></br>new<br></br> bill
        <div className={style.new}><FaPlus className={style.com}/></div></div>
      </div>
    </div>
  );
}

  

