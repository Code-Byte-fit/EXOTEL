import React, { useState } from 'react'
import Select from 'react-select';
import style from "./Input.module.css"

export default function Input(props) {
      const [selectedOption, setSelectedOption] = useState(null);
  return (
    <>
        <div className={style.InputContainer}>
            <label>{props.label}</label>
            <input type={props.type} className={style.Input} name={props.name} style={{display:`${props.type==="select" && "none"}`}}/>
            <Select defaultValue={selectedOption} onChange={setSelectedOption} options={props.options} 
            className={`${style.select} ${props.type!="select" && style.unselect} `}
            />
        </div>
    </>
  )
}
