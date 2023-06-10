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
  const [selectedMinibarItems, setSelectedMinibarItems] = useState(null);

  // useEffect(() => {
  //   axios.get("http://localhost:3001/minibar")
  //   .then((response) => {
  //     setListOfMinibar(response.data);
  //   });
  // }, []);

  function handleEditClick(bar) {
    setSelectedMinibarItems(bar);
    setShowPopup(true);
  }

  function handleDeleteClick() {
    // Handle delete logic here
  }

  const columns = [
   
    {
      name: 'Item Name',
      selector: row=>row.ItemName,
      sortable: true,
    },
    {
      name: 'Item Price ($)',
      selector: row=>row.ItemPrice,
      sortable: true,
    },

    {
      name: 'Description',
      selector: row=>row.addInfo,
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
        <Table columns={columns} data = {props.listOfMinibarItems} height ='35vh'/>
        </div>
    </span>
  );
}

export default MTable;
