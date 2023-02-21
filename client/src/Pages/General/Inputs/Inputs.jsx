import React from 'react'
import style from "./Style.module.css"

export default function Input({
  field, 
  form: { touched, errors },
  ...props
}) {

  return (
    <>
        <div className={style.InputContainer}>
            <label for={props.id}>{props.label}</label>
            {props.type!=="select" && <input {...field} {...props} type={props.type} id={props.id} className={`${style.Input}`} style={{width:props.width}}/>}
            {props.type==="select" && 
              <select {...field} {...props} className={style.Input} id={props.id} style={props.style}>
                  {props.options.map((option) => {
                        return (
                            <option key={option.value} value={option.value}>
                              {option.key}
                            </option>
                            );})}
              </select>
            }
        </div>
    </>
  )
}

export function FileInput({
  field, 
  form: { touched, errors },
  ...props
}) {
  return (
    <>
        <div className={style.fileInputContainer}>
            <label for={props.id} className={style.fileInputLabel}><img src={props.img}/>{props.label}</label>
            <input {...field} {...props} type="file" id={props.id} className={style.fileInput}/>
        </div>
    </>
  )
}


