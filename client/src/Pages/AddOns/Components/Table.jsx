import React, { useState } from "react";
import style from "./AddOns.module.css"
import axios from 'axios';
import sort from "../../../Assets/Images/sort.png"
import editIcon from "../../../Assets/Images/Small FAB(1).png"
import deleteIcon from "../../../Assets/Images/Small FAB.png"
import { useEffect } from "react";

function Table({room}) {

    


    const [listOfRooms, setlistOfRooms] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3001/rooms").then((response) => {
            setlistOfRooms(response.data);
        })
    }, [])

    function handleEditClick() {
        setShowPopup(true);
    }

    function handleDeleteClick() {
        // Handle delete logic here
    }

    return (
        <span className={style.tableContainer}>
            <label className={style.labelTwo}>Edit/Delete Room</label>
          
            <div className={style.tbl}>
                <span className={style.div3}>
                    <form >
                        <table className={style.tableOne}>
                            <thead>
                                <tr>
                 
                                    <th>Room Number <img src={sort} className={style.sort1} /></th>
                                    <th>Room Type<img src={sort} className={style.sort1} /></th>
                                    <th>Base Charge<img src={sort} className={style.sort1} /></th>
                                    <th>Floor<img src={sort} className={style.sort1} /></th>
                                    <th>Sq.Feet<img src={sort} className={style.sort1} /></th>
                                    <th>Actions<img src={sort} className={style.sort1} /></th>


                                </tr>
                            </thead>
                        
                        {listOfRooms.map((value, key) => {
                            return (
                     
                                    <tbody>
                                        <td>{value.RoomNo}</td>
                                        <td>{value.roomType}</td>
                                        <td>{value.baseCharge}</td>
                                        <td>{value.floor}</td>
                                        <td>{value.sqFeet}</td>
                                        <td>
                    <button type="button" className={style.editBtn}  onClick={handleEditClick} ><img src={editIcon}/></button>
                    <button type="button" className={style.deleteBtn} onClick={handleDeleteClick}><img src={deleteIcon}/></button>
                </td>
                                    </tbody>
                                   

                            );
                        })}
                        </table>
                    </form>
                </span>
            </div>
            {showPopup && (
                <div className={style.popup}>
                <h1>hello</h1>
                    </div>
               
            )}
        </span>

    )
}


export default Table;