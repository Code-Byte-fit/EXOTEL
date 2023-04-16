import React from 'react'
import style from './ProgressBarStepThree.module.css'

export default function ProgressBarStepThree(props) {
  return (
    <div class= {style.progress}>
          <span className={`${style.step} ${props.completed && style.stepCompleted}`}>{props.step}</span>
      </div>
  )
}
