import React, { useState } from "react";
import ReadOnlyRow from "./ReadOnlyRow";
import EditOnlyRow from "./EditOnlyRow";
import style from "./Rooms.module.css"
import EditDeleteJpg from "./EditDeleteJpg";
import sort from "../../Images/sort.png"

function Table({ rooms, setRooms }) {

    //edit
    const [editFormData, setEditFormData] = useState({
        promoCode: '',
        promoType: '',
        baseCharge: '',
        floor: '',
        sqFeet: ''
    })
    const handleEditFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);

    }
    
    const [editRoomId, setEditRoomId] = useState(null);

    const handleEditClick = (event, room) => {
        event.preventDefault();
        setEditRoomId(room.id);

        const formValues = {
            promoCode: room.promoCode,
            promoType: room.promoType,
            baseCharge: room.baseCharge,
            floor: room.floor,
            sqFeet: room.sqFeet
        }

        setEditFormData(formValues);
    };
    const handleEditFormSubmit = (event) => {
        event.preventDefault();
    
        const editedRoom = {
            id : editRoomId,
            promoCode: editFormData.promoCode,
            promoType: editFormData.promoType,
            baseCharge: editFormData.baseCharge,
            floor: editFormData.floor,
            sqFeet: editFormData.sqFeet
        }
        const newRooms = [...rooms];
    
        const index = rooms.findIndex((room) =>room.id === editRoomId)
    
        newRooms[index] = editedRoom;
    
         setRooms(newRooms)
        setEditRoomId(null);
    }


    return (
        <span className={style.tableContainer}>
            <label className={style.labelTwo}>Edit/Delete Promotion</label>
            <span> <EditDeleteJpg /></span>
            <span className={style.filter}>
                <select name="Promo Code" className={style.selectTwo} >

                    <option value="Promo Code" disabled selected hidden>Promo Code</option>
                    <option value="001">P001</option>
                    <option value="002">P002</option>
                    <option value="003">P003</option>
                    <option value="004">P004</option>
                </select>
            </span>
            <div className={style.tbl}>
            <span className={style.div3}>
                <form >
                    <table className={style.tableOne}>
                        <thead>
                            <tr>
                                <th>

                                    <input type="checkbox" className={style.checkOne} />

                                </th>
                                <th>Promo Code <img src={sort} className={style.sort1}/></th>
                                <th>Promo Type<img src={sort} className={style.sort1}/></th>
                                <th>Value<img src={sort} className={style.sort1}/></th>
                                <th>Max Uses<img src={sort} className={style.sort1}/></th>
                                <th>Status<img src={sort} className={style.sort1}/></th>
                                <th>Start<img src={sort} className={style.sort1}/></th>
                                <th>End<img src={sort} className={style.sort1}/></th>
                                <th>Actions<img src={sort} className={style.sort1}/></th>


                            </tr>
                        </thead>
                        <tbody>
                            {rooms.map((room) => (

                                <React.Fragment>
                                {editRoomId ===room.id ? (
                                     <EditOnlyRow editFormData={editFormData} handleEditFormChange={handleEditFormChange}
                                     handleEditFormSubmit={handleEditFormSubmit} />
                                     ):(
                                        <ReadOnlyRow room={room} handleEditClick={handleEditClick}/>
                             ) }
                                   
                                   
                                </React.Fragment>
                            ))}

                        </tbody>
                    </table>
                </form>
            </span>
            </div>
        </span>
        
    )
}

export default Table;