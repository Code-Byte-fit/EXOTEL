import React from "react";
import style from '../Minibar/components/Minibar.module.css'
import DisplayFormData from '../Minibar/components/DisplayFormData'
import Topbutton from '../Minibar/components/Topbutton'


function Minibar(){
   return(<>
        <Topbutton/>
        <span className={style.container} >
        <DisplayFormData/>
        </span>
   </>) 
}

export default Minibar;