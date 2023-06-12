import React, { useState, useEffect } from "react";
import Table from "../../General/Table/Table"
import EditDelete from "../../General/Table/EditDelete";
import style from "../components/Minibar.module.css"
import axios from "axios";

function ViewMRestock() {
    const [listOfMinibar, setListOfMinibar] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/Minibar/minibarrestocks")
        .then((response) => {
          setListOfMinibar(response.data);
        });
      }, []);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedMinibar, setSelectedMinibar] = useState(null);

  const columns = [
    {
      name: 'Restocked Id',
      selector: row=>row.RestockId,
      sortable: true,
    },
    {
      name: 'Reservation Number',
      selector: row=>row.ResNumber,
      sortable: true,
    },
    {
      name: 'Last Restocked',
      selector: row=>row.LastRestocked,
      sortable: true,
    },
    {
      name: 'Item Name',
      selector: row=>row.ItemName,
      sortable: true,
    },
    {
      name: 'Quantity',
      selector: row=>row.Quantity,
      sortable: true,
    },
    {
      name: 'Amount',
      selector: row=>row.Amount,
      sortable: true,
    },
   
    {
      selector: row => row,
      cell:(row)=><EditDelete/>
    }
  ]
  return (
    <span className={style.tableContainer}>
      <label className={style.labelTwo}>Minibar Restock</label>
      <div className={style.tbl}>
        <span className={style.div3}>
        <Table columns={columns} data = {listOfMinibar} height ='35vh'/>
        </span>
      </div>
    </span>
  );
}

export default ViewMRestock;
