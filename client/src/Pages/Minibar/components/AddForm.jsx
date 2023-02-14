import React from "react";
import style from '../components/Minibar.module.css'


function AddForm({handleAddFormChange}){
    return(
        
        <>
        <span className={style.formContainer}>
        <form handleAddFormSubmit><label className={style.labelOne}>Add New Entry</label>
        <div className={style.div1}>
        <label for="roomNum">Room Number<br/>
                <select name="roomNum" className={style.selectOne} onChange={handleAddFormChange}>

                    <option value="Room Number" disabled selected hidden>Room Number</option>
                    <option value="Room Number 1">Room Number 1</option>
                    <option value="Room Number 2">Room Number 2</option>
                    <option value="Room Number 3">Room Number 3</option>
                    <option value="Room Number 4">Room Number 4</option>
                    <option value="Room Number 5">Room Number 5</option>
                </select>
                </label>
                <label for="date">Date <br/>
                <input
                    type="date"
                    name="date"
                    className={style.inputTwo}
                    placeholder=" Date"
                    id='text' required
                    onChange={handleAddFormChange} /></label>
                    <label for="itemname">Item Name <br/>
                <input
                    type="text"
                    className={style.inputOne}
                    placeholder="Item Name"
                    name="item"
                    onChange={handleAddFormChange} /></label>

                    <label for="qty">Quantity <br/>
                <input
                    type="text"
                    className={style.inputOne}
                    placeholder="Quantity"
                    name="qty"
                    onChange={handleAddFormChange} /> </label>
            </div>
            <span className={style.div2}>
            <label for="add">Additional Information <br/>
                <textarea className={style.textArea1} rows="4" cols="50">Additional Information
                </textarea></label>
                <span className={style.createBtn}></span>
            </span>
            </form>
        </span>
        </>
      
    )
}

export default AddForm;