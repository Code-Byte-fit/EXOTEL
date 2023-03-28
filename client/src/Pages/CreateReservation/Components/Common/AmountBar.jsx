import React from 'react'
import style from "./Style.module.css"

export default function AmountBar(props) {
  return (
    <>
        <div className={style.amountBar}>
              <div className={style.amountBarItems}>
                  <span className={style.item}>
                      <span>Sub-Total</span>
                      <span className={style.amount}>${props.subTotal}</span>
                  </span>
                  <span className={style.item}>
                      <span>Discounts</span>
                      <span className={style.amount}>${props.discounts}</span>
                  </span>
                  <span className={style.item}>
                      <span>Grand-Total</span>
                      <span className={style.amount}>${props.GrandTotal}</span>
                  </span>
              </div>
        </div>
    </>
  )
}
