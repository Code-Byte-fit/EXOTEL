import React from "react";
import style from '../components/Login.module.css'

function TextInput(props){
    return <input placeholder={props.placeholder} type={props.type} className={style.inputs} required=""/>
}

export default TextInput;