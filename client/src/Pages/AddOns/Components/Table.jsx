import React, { useState, useEffect,useContext } from "react";
import {AppContext} from "../../../Helpers/AppContext"
import style from "./AddOns.module.css"
import axios from 'axios';
import AddOnTable from '../../General/Table/Table'
import EditDelete from "../../General/Table/EditDelete";
import EditAddon from "./EditAddon";


function Table(props) {
  const {host}=useContext(AppContext);
  const [isDone, setIsDone] = useState(false);

  const handleDone=()=>{
    setIsDone(false)
    axios.get(`${host}/addon`).then((response)=>{
      setlistOfAddons(response.data)
    })
  }

  const [listOfAddons, setlistOfAddons] = useState([]);
  useEffect(() => {
    axios.get(`${host}/addon`).then((response) => {
      setlistOfAddons(response.data);
    });
  }, []);


  const columns = [
    {
      name: 'AddOn No',
      selector: row => row.addonID,
      sortable: true,
    },
    {
      name: 'AddOn',
      selector: row => row.AddOn,
      sortable: true,
    },
    {
      name: 'Unit',
      selector: row => row.Unit,
      sortable: true,
    },

    {
      name: 'Charge',
      selector: row => row.Charge,
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
      cell: (row) => <EditDelete editComponent={<EditAddon  values={row} setIsDone={setIsDone}   />} setlistOfAddons={setlistOfAddons} row={row} editOption  isDone={isDone} handleDone={handleDone}/>
    },
  ];

  return (
    <span className={style.tableContainer}>
      <label className={style.labelTwo}>Edit/Delete Add Ons</label>
      <AddOnTable columns={columns} data={props.listOfAddons} height="35vh" edit pagination />
    </span>

  )
}


export default Table;