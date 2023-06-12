import React from "react";
import Table from "../../General/Table/Table"
import EditDelete from "../../General/Table/EditDelete";
import style from "../components/Laundry.module.css";


function LTable(props) {
   
  const columns = [
    {
      name: 'Laundry Id',
      selector: row=>row.laundryId,
      sortable: true,
    },
    {
      name: 'Res Number',
      selector: row=>row.ReservationId,
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
      name: 'Type',
      selector: row=>row.type,
      sortable: true,
    },
    {
      name: 'Load',
      selector: row=>row.load,
      sortable: true,
    },
    {
      name: 'Charge',
      selector: row=>row.charge,
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
        <Table columns={columns} data = {props.listOfLaundry} height ='35vh'/>
        </span>
      </div>
    </span>
  );
}

export default LTable;
