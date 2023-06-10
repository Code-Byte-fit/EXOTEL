import React from 'react'
import HashLoader  from "react-spinners/HashLoader";
import style from "./Style.module.css"

export default function Spinner(props) {
  return (
    <>
        <div className={style.spinner}>
            <HashLoader color="#a59c50" size={50} loading={props.loading} />
        </div>
    </>
  )
}
