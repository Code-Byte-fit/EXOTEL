import React from "react";
import style from "./Rooms.module.css"
import saveJpg from "../../Images/save3.png"

const EditOnlyRow = ({ editFormData, handleEditFormChange, handleEditFormSubmit }) => {
    return (
        <tr>
            <td></td>
            <td><input
                type="text"
                className={style.editOne}
                placeholder="Promo Code"
                name="promoCode"
                required="required"
                value={editFormData.promoCode}
                onChange={handleEditFormChange}
            />
            </td>
            <td>
                <input
                    type="text"
                    className={style.editOne}
                    placeholder="Promo Type"
                    name="promoType"
                    required="required"
                    value={editFormData.promoType}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>

                <input
                    type="text"
                    className={style.editOne}
                    placeholder="Value"
                    name="value"
                    required="required"
                    value={editFormData.value}
                    onChange={handleEditFormChange}
                />


            </td>
            <td>
                <input
                    type="text"
                    className={style.editTwo}
                    placeholder="Max Uses"
                    name="maxUses"
                    required="required"
                    value={editFormData.maxUses}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <select className={style.editTwo} name="status" required="required" value={editFormData.status} onChange={handleEditFormChange}>

                    <option value="" disabled selected hidden>Status</option>
                    <option value="sq1">Active</option>
                    <option value="sq2">Disabled</option>
                    <option value="sq3">Expired</option>
                </select>
            </td>
            <td>
                <button type="button" className={style.saveBtn} onClick={handleEditFormSubmit}><img src={saveJpg} /></button>
                {/* <button type="submit" className="button-3" onClick={handleCancelClick}>cancel</button> */}
            </td>
        </tr>
    )
}

export default EditOnlyRow;

// onClick={(event) => handleEditClick(event,room)}