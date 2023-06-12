import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../Helpers/AppContext"
import axios from 'axios';
import style from "../ViewRoomTypes/components/ViewRoomTypes.module.css";
import RoomTable from "../../General/Table/Table";
import EditDelete from "../../General/Table/EditDelete";
import Spinner from '../../General/Spinner/Spinner';

function ViewRoomTypes() {
  const { host } = useContext(AppContext);
    const [listOfRoomTypes, setlistOfRoomTypes] = useState([]);
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
      setLoading(true)
        axios.get(`${host}/roomtypes`).then((response) => {
          setlistOfRoomTypes(response.data);
          setLoading(false)
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
      <>
        {loading && <Spinner loading={loading}/>}
         <div className={style.tableContainer}>
            <div className={style.heading}>
                <h1>Available Room Types</h1>
            </div>
            <RoomTable columns={columns} data={listOfRoomTypes} height="110vh" pagination />
        </div>
      </>
       
    );
}

export default ViewRoomTypes;
