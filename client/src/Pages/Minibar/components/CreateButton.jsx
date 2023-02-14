import React from 'react'
import style from '../components/Minibar.module.css'

export default function CreateButton({handleAddFormSubmit}) {
  return (
    <div>
        <button class={style.button1} onClick={handleAddFormSubmit}><h1>CREATE</h1></button>
    </div>
  )
}
