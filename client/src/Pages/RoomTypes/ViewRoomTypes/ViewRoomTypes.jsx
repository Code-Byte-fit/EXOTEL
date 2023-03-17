import React from "react";
import axios from 'axios';
import style from "../ViewRoomTypes/components/ViewRoomTypes.module.css";
import RoomTable from "../../General/Table/Table";
import EditDelete from "../../General/Table/EditDelete";
import { useEffect, useState } from "react";

function ViewRoomTypes() {

    const [listOfRoomTypes, setlistOfRoomTypes] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3001/roomtypes").then((response) => {
          setlistOfRoomTypes(response.data);
        });
      }, []);
    

   
  const columns = [
    {
        name: 'Type Name',
        selector: row => row.TypeName,
        sortable: true,
    },
    {
        name: 'No of Beds',
        selector: row => row.NoOfBeds,
        sortable: true,
    },

    {
      name: 'Square Feet',
      selector: row => row.sqFeet,
      sortable: true,
    },
    {
      name: 'Standard Charge',
      selector: row => row.StandardCharge,
      sortable: true,
    },
    {
      name: 'Add Info',
      selector: row => row.AddInfo,
      sortable: true,
      cell: row => (
        <div className={style.tooltip}>
          {row.AddInfo}
          <span className={style.tooltipText}>{row.AddInfo}</span>
        </div>
      ),
    },
   
];
    return (
        <div className={style.tableContainer}>
            <div className={style.heading}>
                <h1>Available Room Types</h1>
            </div>
            <RoomTable columns={columns} data={listOfRoomTypes} height="110vh" pagination />
        </div>
    );
}

export default ViewRoomTypes;
