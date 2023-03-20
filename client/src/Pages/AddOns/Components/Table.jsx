import React, { useState } from "react";
import style from "./AddOns.module.css"
import axios from 'axios';
import { useEffect } from "react";
import AddOnTable from '../../General/Table/Table'
import EditDelete from "../../General/Table/EditDelete";




function Table(props) {

    const [listOfAddons, setlistOfAddons] = useState([]);
 


   

    useEffect(() => {
        axios.get("http://localhost:3001/addon").then((response) => {
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
      cell: (row) => <EditDelete/>
    },
];

    return (
        <span className={style.tableContainer}>
            <label className={style.labelTwo}>Edit/Delete Add Ons</label>
            <AddOnTable columns={columns} data={props.listOfAddons} height="35vh" edit pagination/>
            
           
        </span>

    )
}


export default Table;