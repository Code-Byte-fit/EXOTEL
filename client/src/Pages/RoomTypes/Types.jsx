import React from "react";
import style from '../RoomTypes/components/Types.module.css'

import DisplayFormData from "../RoomTypes/components/DisplayFormData";



function RoomTypes(){
   return(<>
        <div className={style.cover}>
      <DisplayFormData />
      </div>
   </>) 
}

export default RoomTypes;