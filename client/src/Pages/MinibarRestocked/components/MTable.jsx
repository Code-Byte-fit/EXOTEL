import React, { useState } from "react";
import Table from "../../General/Table/Table"
import EditDelete from "../../General/Table/EditDelete";
import style from "../components/Minibar.module.css";
import axios from "axios";
// import sort from "../../../Assets/Images/sort.png";
// import editIcon from "../../../Assets/Images/Small FAB(1).png";
// import deleteIcon from "../../../Assets/Images/Small FAB.png";
// import Popup from "./Popup";

function MTable(props) {
  // const [listOfMinibar, setListOfMinibar] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMinibar, setSelectedMinibar] = useState(null);

  // useEffect(() => {
  //   axios.get("http://localhost:3001/minibar")
  //   .then((response) => {
  //     setListOfMinibar(response.data);
  //   });
  // }, []);

  function handleEditClick(bar) {
    setSelectedMinibar(bar);
    setShowPopup(true);
  }

  function handleDeleteClick() {
    // Handle delete logic here
  }

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
      <label className={style.labelTwo}>Entries</label>
      <div className={style.tbl}>
        <span className={style.div3}>
        <Table columns={columns} data = {props.listOfMinibar} height ='35vh'/>
        </span>
      </div>
    </span>
  );
}

export default MTable;
