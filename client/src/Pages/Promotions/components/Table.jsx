import React, { useState } from "react";
import style from "./Rooms.module.css"
import editIcon from "../../../Assets/Images/Small FAB(1).png"
import deleteIcon from "../../../Assets/Images/Small FAB.png"
import sort from "../../../Assets/Images/sort.png"
import { useEffect } from "react";
import axios from 'axios';

function Table({ promotions }) {

    
    const [listOfPromotions, setlistOfPromotions] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/promotions").then((response) => {
            setlistOfPromotions(response.data);
        })
    }, [])


    return (

        <span className={style.tableContainer}>
            <label className={style.labelTwo}>Edit/Delete Promotions</label>
          
            <div className={style.tbl}>
                <span className={style.div3}>
                    <form >
                        <table className={style.tableOne}>
                            <thead>
                                <tr>
                 
                                    <th>Promo Code <img src={sort} className={style.sort1} /></th>
                                    <th>Promo Type<img src={sort} className={style.sort1} /></th>
                                    <th>Value<img src={sort} className={style.sort1} /></th>
                                    <th>Max Uses<img src={sort} className={style.sort1} /></th>
                                    <th>Status<img src={sort} className={style.sort1} /></th>
                                    <th>Start Date<img src={sort} className={style.sort1} /></th>
                                    <th>End Date<img src={sort} className={style.sort1} /></th>
                                    <th>Actions<img src={sort} className={style.sort1} /></th>


                                </tr>
                            </thead>
                        
                        {listOfPromotions.map((value, key) => {
                            return (
                     
                                    <tbody>
                                        <td>{value.PromoCode}</td>
                                        <td>{value.PromoType}</td>
                                        <td>{value.Value}</td>
                                        <td>{value.MaxUses}</td>
                                        <td>{value.Status}</td>
                                        <td>{value.Startdate}</td>
                                        <td>{value.Enddate}</td>
                                        <td>
                    <button type="button" className={style.editBtn} ><img src={editIcon}/></button>
                    <button type="button" className={style.deleteBtn}><img src={deleteIcon}/></button>
                </td>
                                    </tbody>
                                   

                            );
                        })}
                        </table>
                    </form>
                </span>
            </div>
        </span>

    )
}


export default Table;