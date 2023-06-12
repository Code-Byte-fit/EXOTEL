import React from 'react'
import style from '../components/Card.module.css'

export default function Side() {
  return (
    <div className={style.container}>
      <h2 className={style.title}>Today's Cash</h2>
      <div className={style.cardList}>
        <div className={style.card}>
          <div className={style.cardText}>Starting balance</div>
        </div>
        <div className={style.card}>
          <div className={style.cardText}>Current Balance</div>
        </div>
        <div className={style.card}>
          <div className={style.cardText}>Cash Flow</div>
        </div>
        
      </div>
    </div>
  )
}
