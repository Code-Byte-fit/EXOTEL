import React from "react";
import axios from 'axios';
import style from "../ManageRooms/components/ViewRooms.module.css";

import { useEffect, useState } from "react";

function ViewRooms() {

    const [listOfRooms, setlistOfRooms] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3001/rooms").then((response) => {
            setlistOfRooms(response.data);
        })
    }, [])
    
    return (
        <>
        <div className={style.heading}>
<h1>Available Rooms</h1>
        </div>
        <div className={style.container}>

            <table className={style.tableTwo}>
                <thead>
                    <th>Room Number</th>
                    <th>Room Type</th>
                    <th>Base Charge</th>
                    <th>Floor</th>
                    <th>Sq.Feet</th>
             
                </thead>
                {listOfRooms.map((value, key) => {
                return (
                        <tbody>
                            <td>{value.RoomNo}</td>
                            <td>{value.roomType}</td>
                            <td>{value.baseCharge}</td>
                            <td>{value.floor}</td>
                            <td>{value.sqFeet}</td>
                        </tbody>


                );
            })}

            </table>
                    </div>
</>
    )
}

export default ViewRooms;