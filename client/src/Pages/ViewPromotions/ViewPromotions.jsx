import React from "react";
import axios from 'axios';
import style from "../ViewPromotions/Components/ViewPromotions.module.css";

import { useEffect, useState } from "react";

function ViewPromotions() {

    const [listOfPromotions, setlistOfPromotions] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/promotions").then((response) => {
            setlistOfPromotions(response.data);
        })
    }, [])
    return (
        <>
        <div className={style.heading}>
<h1>Available Promotions</h1>
        </div>
        <div className={style.container}>

            <table className={style.tableTwo}>
                <thead>
                    <th>Promo Code</th>
                    <th>Promo Type</th>
                    <th>Value</th>
                    <th>Max Uses</th>
                    <th>Status</th>
                    <th>Start Date</th>
                    <th>End Date</th>
             
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
                        </tbody>


                );
            })}

            </table>
                    </div>
</>
    )
}

export default ViewPromotions;