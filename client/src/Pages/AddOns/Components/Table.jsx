import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../Helpers/AppContext"
import style from "./AddOns.module.css"
import axios from 'axios';
import AddOnTable from '../../General/Table/Table'
import EditDelete from "../../General/Table/EditDelete";
import EditAddon from "./EditAddon";

function Table(props) {
  const { host } = useContext(AppContext);
  const [isDone, setIsDone] = useState(false);
  const [success,setSuccess]=useState(true);

  const handleDone = () => {
    setIsDone(false)
    axios.get(`${host}/addon`).then((response) => {
      setlistOfAddons(response.data)
    })
  }

  const handleRemove=(addonID)=>{
    axios.delete(`${host}/addon/${addonID}`).then((res)=>{
      setIsDone(true)
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
      cell: (row) => <EditDelete setlistOfAddons={setlistOfAddons} row={row} editOption isDone={isDone} handleDone={handleDone} success={success}
      removeOption deleteHeading ="Confirm Remove" deleteBody="Are you sure you want to remove?" onRemove={handleRemove} id= {row.addonID} successMsg="Add-On removed Successfully!"
      editComponent={<EditAddon values={row} setIsDone={setIsDone} setSuccess={setSuccess}  />} 
       />
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