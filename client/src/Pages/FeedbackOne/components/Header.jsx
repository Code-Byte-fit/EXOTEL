import React from 'react'
import ProgressBarStepThree from './ProgressBarStepThree'
import style from "./ProgressBarStepThree.module.css"

export default function Header(props) {
  return (
    <>
    <div className={style.stepsCont}>
        <ProgressBarStepThree step="1" completed={props.one}/>
        <ProgressBarStepThree step="2" completed={props.two}/>
    </div>
    </>
  )
}
