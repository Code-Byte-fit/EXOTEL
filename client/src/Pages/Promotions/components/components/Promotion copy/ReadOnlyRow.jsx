import React from "react";
import editIcon from "../../Images/edit2.png"
import deleteIcon from "../../Images/small.png"
import style from "./Rooms.module.css"


const ReadOnlyRow = ({room , handleEditClick}) => {
    return (
        <>
            <tr>

                <td>
                <input type="checkbox" className={style.checkOne}/>

                </td>

                <td>{room.promoCode}</td>
                <td>{room.promoType}</td>
                <td>{room.baseCharge}</td>
                <td>{room.floor}</td>
                <td>{room.sqFeet}</td>
                <td>
                    <button type="button" className={style.editBtn} onClick={(event) => handleEditClick(event,room)}><img src={editIcon}/></button>
                    <button type="button" className={style.deleteBtn}><img src={deleteIcon}/></button>
                </td>
               
            </tr>
        </>
    )

}

export default ReadOnlyRow;


