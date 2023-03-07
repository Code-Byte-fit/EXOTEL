import React from "react";
import style from "../Promotion/Rooms.module.css"
import EditImg from "../../Images/edit.png"
import DeleteImg from "../../Images/Trash.png"

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


