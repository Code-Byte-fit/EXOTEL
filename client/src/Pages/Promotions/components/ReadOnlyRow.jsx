import React from "react";
import editIcon from "../../../Assets/Images/Small FAB(1).png"
import deleteIcon from "../../../Assets/Images/Small FAB.png"
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
                <td>{room.value}</td>
                <td>{room.maxUses}</td>
                <td>{room.status}</td>
                <td>{room.sDate}</td>
                <td>{room.eDate}</td>
                <td>
                    <button type="button" className={style.editBtn} onClick={(event) => handleEditClick(event,room)}><img src={editIcon}/></button>
                    <button type="button" className={style.deleteBtn}><img src={deleteIcon}/></button>
                </td>
               
            </tr>
        </>
    )

}

export default ReadOnlyRow;


