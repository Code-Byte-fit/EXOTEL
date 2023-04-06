import React, { useState } from "react";
import Table from "../../General/Table/Table"
import EditDelete from "../../General/Table/EditDelete";
import style from "../components/Compensation.module.css";
import axios from "axios";


function CTable(props) {

  const columns = [
    {
      name: 'Comp Id',
      selector: row=>row.compId,
      sortable: true,
    },
    {
      name: 'Res Number',
      selector: row=>row.resNumber,
      sortable: true,
    },
    {
      name: 'Room Number',
      selector: row=>row.roomNumber,
      sortable: true,
    },
    {
      name: 'Date',
      selector: row=>row.date,
      sortable: true,
    },
    {
      name: 'Time',
      selector: row=>row.time,
      sortable: true,
    },
    {
      name: 'Amount',
      selector: row=>row.amount,
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
        <Table columns={columns} data = {props.listOfComp} height ='35vh'/>
        </span>
      </div>
    </span>
  );
}

export default CTable;
