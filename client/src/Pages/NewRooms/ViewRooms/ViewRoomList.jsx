import React from "react";
import axios from 'axios';
import style from "../ViewRooms/components/ViewRooms.module.css";
import RoomTable from "../../General/Table/Table";
import EditDelete from "../../General/Table/EditDelete";
import { useEffect, useState } from "react";

function ViewRooms() {

    const [listOfRooms, setlistOfRooms] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3001/rooms").then((response) => {
            setlistOfRooms(response.data);
        });
    }, []);

    const columns = [
        {
            name: 'ROOM-NO',
            selector: row => row.RoomNo,
            sortable: true,
        },
        {
            name: 'ROOM-TYPE',
            selector: row => row.RoomTypeView,
            sortable: true,
        },
        {
            name: 'FLOOR',
            selector: row => row.floor,
            sortable: true,
        },
        {
            name: 'STATUS',
            selector: row => row.Status,
            sortable: true,
            cell: row => (
                <div
                    style={{
                        backgroundColor: row.Status === "Available" ? "blue" : "pink",
                        borderRadius: "8px",
                        padding: "5px",
                    }}
                >
                    {row.Status}
                </div>
            ),
        },
        {
            name: 'TOTAL CHARGE',
            selector: row => row.TotalCharge,
            sortable: true,
        },
    ];

    return (
        <div className={style.tableContainer}>
            <div className={style.heading}>
                <h1>Available Rooms</h1>
            </div>
            <RoomTable columns={columns} data={listOfRooms} height="110vh" pagination />
        </div>
    );
}

export default ViewRooms;
