import React, { useState } from "react";
import Table from "../../General/Table/Table"
import EditDelete from "../../General/Table/EditDelete";
import style from "../components/Payments.module.css";
import axios from "axios";
import Button from "./Button";


function PTable(props) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMinibar, setSelectedMinibar] = useState(null);

   const columnsL = [
    {
      name: 'Res Number',
      selector: row=>row.restId,
      sortable: true,
    },
    {
      name: 'Check In',
      selector: row=>row.CheckIn,
      sortable: true,
    },
    {
      name: 'Check Out',
      selector: row=>row.CheckOut,
      sortable: true,
    },
    {
      name: 'Amount',
      selector: row=>row.totalAmount,
      sortable: true,
    },
   
    {
      selector: row => row,
      cell:(row)=><EditDelete/>
    }
  ]

  


  return (

    <>
    <Button/>
    <span className={style.tableContainer}>
        <label className={style.labelTwo}>Entries</label>
        <div className={style.tbl}>
          <span className={style.div3}>
            <Table columns={columnsL} data={props.listOfMinibar} height='35vh' />
          </span>
        </div>
      </span></>
  );
}

export default PTable;
