import React, { useState } from "react";
import Table from "../../General/Table/Table"
import EditDelete from "../../General/Table/EditDelete";
import style from "../components/Laundry.module.css";
import axios from "axios";
// import sort from "../../../Assets/Images/sort.png";
// import editIcon from "../../../Assets/Images/Small FAB(1).png";
// import deleteIcon from "../../../Assets/Images/Small FAB.png";
import { useEffect } from "react";
// import Popup from "./Popup";

function LTable(props) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedLaundry, setSelectedLaundry] = useState(null);

  function handleEditClick(bar) {
    setSelectedLaundry(bar);
    setShowPopup(true);
  }

  function handleDeleteClick() {
    // Handle delete logic here
  }

  const columns = [
    {
      name: 'Laundry Id',
      selector: row=>row.laundryId,
      sortable: true,
    },
    {
      name: 'Res Number',
      selector: row=>row.resNumber,
      sortable: true,
    },
    {
      name: 'Receive Date',
      selector: row=>row.receivedDate,
      sortable: true,
    },
    {
      name: 'Return Date',
      selector: row=>row.returnDate,
      sortable: true,
    },
    {
      name: 'Load',
      selector: row=>row.load,
      sortable: true,
    },
    {
      name: 'Charge',
      // selector: row=>row.load,
      // sortable: true,
    },
   
    {
      selector: row => row,
      cell:(row)=><EditDelete/>
    }
  ]
  return (
    <span className={style.tableContainer}>
      <label className={style.labelTwo}>Entries</label>
      <div className={style.tbl}>
        <span className={style.div3}>
        <Table columns={columns} data = {props.listOfLaundry} height ='35vh'/>
        </span>
      </div>
    </span>
  );
}

export default LTable;
