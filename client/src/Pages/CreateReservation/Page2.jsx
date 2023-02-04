import React from 'react'
import Header from './Components/Header/Header'
import DetailsForm from './Components/Page2/DetailsForm'
import Selected from './Components/Selected/Selected'
import AmountBar from './Components/AmountBar/AmountBar'
import style from "./Components/Page2/Style.module.css"

export default function ResPageTwo() {
  return (
    <>
    <div className={style.container}>
        <Header/> 
        <div className={style.body}>
            <DetailsForm/>
            <Selected/> 
        </div>
        <AmountBar/>
    </div>
    </>
  )
}
