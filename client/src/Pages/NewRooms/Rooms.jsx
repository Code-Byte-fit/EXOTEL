import React from "react";
import style from '../NewRooms/components/Rooms.module.css'

import DisplayFormData from "../NewRooms/components/DisplayFormData";



function Rooms() {
   return (<>
      <div className={style.cover}>
         <DisplayFormData />
      </div>
   </>)
}

export default Rooms;