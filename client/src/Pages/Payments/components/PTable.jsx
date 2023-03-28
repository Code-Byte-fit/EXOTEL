import React, { useState } from "react";
import Table from "../../General/Table/Table"
import EditDelete from "../../General/Table/EditDelete";
import style from "../components/Payments.module.css";
import axios from "axios";


function PTable(props) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMinibar, setSelectedMinibar] = useState(null);

   const columns = [
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

  const [isLeftActive, setIsLeftActive] = useState(true);

  const handleLeftClick = () => {
    setIsLeftActive(true);
  };

  const handleRightClick = () => {
    setIsLeftActive(false);
  };


  return (

    <>
    <div className={style.comb}>
    <div className={style['button-container']}>
      <button
        className={`${style['left-button']} ${isLeftActive ? style.active : ''}`}
        onClick={handleLeftClick}
        disabled={isLeftActive}
      >Due</button>
      <button
        className={`${style['right-button']} ${!isLeftActive ? style.active : ''}`}
        onClick={handleRightClick}
        disabled={!isLeftActive}
      >Payments</button>
      </div>
    </div>
    <span className={style.tableContainer}>
        <label className={style.labelTwo}>Entries</label>
        <div className={style.tbl}>
          <span className={style.div3}>
            <Table columns={columns} data={props.listOfMinibar} height='35vh' />
          </span>
        </div>
      </span></>
  );
}

export default PTable;
