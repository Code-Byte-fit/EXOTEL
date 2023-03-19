import React from "react";
import style from "./Rooms.module.css"
import EditImg from "../../../Assets/Images/edit.png"
import DeleteImg from "../../../Assets/Images/Trash.png"

function EditDeleteJpg(){
    return(

<>
        <span className={style.img}>
        <img src={EditImg} className={style.EditImg}/>
        <img src={DeleteImg} className={style.DeleteImg}/>
</span>
</>
    )
}

export default EditDeleteJpg;


