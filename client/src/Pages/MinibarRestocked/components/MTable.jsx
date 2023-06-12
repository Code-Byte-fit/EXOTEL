import React from "react";
import Table from "../../General/Table/Table"
import EditDelete from "../../General/Table/EditDelete";
import style from "../components/Minibar.module.css";

function MTable(props) {
  
  const columns = [
    {
      name: 'Restocked Id',
      selector: row=>row.RestockId,
      sortable: true,
    },
    {
      name: 'Res Number',
      selector: row=>row.ReservationId,
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
