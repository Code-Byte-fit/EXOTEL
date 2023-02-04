import React from 'react'
import style from "./AmountBar.module.css"

export default function AmountBar() {
  return (
    <>
        <div className={style.amountBar}>
              <div className={style.amountBarItems}>
                  <span className={style.item}>
                      <span>Sub-Total</span>
                      <span className={style.amount}>$0.00</span>
                  </span>
                  <span className={style.item}>
                      <span>Grand-Total</span>
                      <span className={style.amount}>$0.00</span>
                  </span>
                  <span className={style.item}>
                      <span>Balance-Due</span>
                      <span className={style.amount}>$0.00</span>
                  </span>
              </div>
        </div>
    </>
  )
}
