import React from "react";
import style from '../AddOns/Components/AddOns.module.css'

import DisplayFormData from "../AddOns/Components/DisplayFormData";



function AddOns() {
   return (<>
      <div className={style.cover}>
         <DisplayFormData />
      </div>
   </>)
}

export default AddOns;