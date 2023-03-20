import React from "react";
import axios from 'axios';
import style from "./components/AddOns.module.css";
import RoomTable from "../../General/Table/Table";
import { useEffect, useState } from "react";


function ViewAddOns() {

    const [listOfAddons, setlistOfAddons] = useState([]);
 

    useEffect(() => {
        axios.get("http://localhost:3001/addon").then((response) => {
            setlistOfAddons(response.data);
            console.log(listOfAddons)
        })
    }, [])

   
    
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
    
  
];


    return (
        <div className={style.tableContainer}>
            <div className={style.heading}>
                <h1>Available Add-Ons</h1>
            </div>
            <RoomTable columns={columns} data={listOfAddons} height="150vh" pagination />
        </div>
    );
}

export default ViewAddOns;
