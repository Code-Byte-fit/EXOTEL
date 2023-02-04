import React from 'react'
import style from "./Selected.module.css"

export default function Selected() {
  return (
    <>
    <div className={style.selectedContainer}>
        <span className={style.selectedText}>SELECTED</span>
        <span>room 2</span>
        <span>room 4</span>
        <span>room 6</span>
    </div>
      
    </>
  )
}

