import React, { useState } from "react";
import style from "./Rooms.module.css";
import axios from "axios";
import { useEffect } from "react";
import RoomTable from "../../General/Table/Table";
import EditDelete from "../../General/Table/EditDelete";
import Popup from "./EditPopup";

function Table(props) {
  const [listOfRooms, setlistOfRooms] = useState([]);
 

  useEffect(() => {
    axios.get("http://localhost:3001/rooms").then((response) => {
      setlistOfRooms(response.data);
      console.log(listOfRooms)
      
    });
  },[]);

 
  const columns = [
    {
        name: 'ROOM-NO',
        selector: row => row.RoomNo,
        sortable: true,
    },
 
    {
      name: 'TYPE-NAME',
      selector: row => row.RoomTypeView,
      sortable: true,
    },
  //   {
  //   name: 'ROOM-TYPE-VIEW',
  //   selector: row => `${row.TypeName}-${row.View}`,
  //   sortable: true,
  // },
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
      name: 'BASE CHARGE',
      selector: row => row.BaseCharge,
      sortable: true,
    },
    {
      name: 'ADD-INFO',
      selector: row => row.AddInfo,
      sortable: true,
      cell: row => (
        <div className={style.tooltip}>
          {row.AddInfo}
          <span className={style.tooltipText}>{row.AddInfo}</span>
        </div>
      ),
    },
    {
      selector: row => row,
      cell: (row) => <EditDelete/>
    },
];


  return (
    <div className={style.tableContainer}>
    <label className={style.labelTwo}>Edit/Delete Room</label>
      <RoomTable columns={columns} data={props.listOfRooms} height="30vh" edit pagination/>

    </div>
  );
}

export default Table;
