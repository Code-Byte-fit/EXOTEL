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
            <label>{props.label}</label>
            {props.type!=="select" && props.type!=="textarea" && <input {...field} {...props} type={props.type} className={style.Input} />}
            {props.type==="select" && 
              <select {...field} {...props} className={style.Input}>
                  {props.options.map((option) => {
                        return (
                            <option key={option.value} value={option.value}>
                              {option.key}
                            </option>
                            );})}
              </select>
            }
            {props.type==="textarea" &&
              <textarea {...field} {...props} className={style.Input} rows={props.rows} cols={props.cols} />
            }
        </div>
    </>
  )
}
