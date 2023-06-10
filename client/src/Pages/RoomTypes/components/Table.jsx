import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../Helpers/AppContext"
import style from "./Types.module.css";
import axios from "axios";
import RoomTypeTable from '../../General/Table/Table'
import EditDelete from "../../General/Table/EditDelete";
import EditAddon from "../../AddOns/Components/EditAddon";
import EditType from "./EditType";



function Table(props) {
  const [listOfRoomTypes, setlistOfRoomTypes] = useState([]);
  const { host } = useContext(AppContext);
  const [success,setSuccess]=useState(true);

  const [isDone, setIsDone] = useState(false);
  
  const handleDone=()=>{
    setIsDone(false)
    axios.get(`${host}/roomtypes`).then((response)=>{
      setlistOfRoomTypes(response.data)
    })
  }

  useEffect(() => {
    axios.get(`${host}/roomtypes`).then((response) => {
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
      name: 'VIEW',
      selector: row => row.View,
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
    {
      selector: row => row,
      cell: (row) => <EditDelete  setlistOfRoomTypes={setlistOfRoomTypes} row={row} editOption  isDone={isDone} handleDone={handleDone}  success={success}
        editComponent={<EditType  values={row} setIsDone={setIsDone}  setSuccess={setSuccess}  />} 
      />
    },
  ];
  return (
    <span className={style.tableContainer}>
      <label className={style.labelTwo}>Edit/Delete Room Types</label>
      <RoomTypeTable columns={columns} data={props.listOfRoomTypes} height="35vh" edit pagination />

    </span>
  );
}

export default Table;
