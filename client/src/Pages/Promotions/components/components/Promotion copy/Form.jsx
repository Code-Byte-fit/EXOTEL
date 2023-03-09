import React from "react";
import CreateBtn from "./CreateBtn";
import style from "./Rooms.module.css";


function Form({ handleAddFormChange }) {
    return (
        <span className={style.formContainer}>
            <label className={style.labelOne}>Add Promotions</label>
            <span className={style.div1}>
                <input
                    type="text"
                    className={style.inputOne}
                    placeholder="Promo Code"
                    name="promoCode"
                    required="required"
                    onChange={handleAddFormChange}
                />

                <input
                    type="text"
                    className={style.inputOne}
                    placeholder="Promo Type"
                    name="promoType"
                    required="required"
                    onChange={handleAddFormChange}
                />

                <input
                    type="text"
                    className={style.inputOne}
                    placeholder="Value"
                    name="value"
                    required="required"
                    onChange={handleAddFormChange}
                />


                <input
                    type="text"
                    className={style.inputOne}
                    placeholder="Max Uses"
                    name=" maxUses"
                    required="required"
                    onChange={handleAddFormChange}
                />

                <select className={style.selectOne} name="status" required="required" onChange={handleAddFormChange}>

                    <option value="" disabled selected hidden>Status</option>
                    <option value="sq1">Active</option>
                    <option value="sq2">Disabled</option>
                    <option value="sq3">Expired</option>
                  
                </select>

            </span>

          
                     
            <span className={style.div2}>
            <input
                    type="date"
                    className={style.inputTwo}
                    placeholder="Start Date"
                    name="sDate"
                    required="required"
                    onChange={handleAddFormChange}
                />
                 <input
                    type="date"
                    className={style.inputTwo}
                    placeholder="End Date"
                    name="eDate"
                    required="required"
                    onChange={handleAddFormChange}
                />
                <textarea className={style.textArea1} rows="4" cols="50" placeholder="Additional Information"></textarea>


            </span>
        </span>
    )
}

export default Form;