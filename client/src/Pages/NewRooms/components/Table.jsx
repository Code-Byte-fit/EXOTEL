import React, { useState, useEffect,useContext } from "react";
import {AppContext} from "../../../Helpers/AppContext"
import style from "./Rooms.module.css";
import axios from "axios";
import RoomTable from "../../General/Table/Table";
import EditDelete from "../../General/Table/EditDelete";
import EditRoom from "./EditRoom";
import Spinner from '../../General/Spinner/Spinner';

function Table(props) {
  const [listOfRooms, setlistOfRooms] = useState([]);
  const {host}=useContext(AppContext);
  const [isDone, setIsDone] = useState(false);
  const [success,setSuccess]=useState(true);
  const [loading, setLoading] = useState(false); 

  const handleDone=()=>{
    setIsDone(false)
    setLoading(true)
    axios.get(`${host}/rooms`).then((response)=>{
      setlistOfRooms(response.data)
      setLoading(false)
    })
  }

  const handleRemove=(RoomNo)=>{
    axios.delete(`${host}/rooms/${RoomNo}`).then((res)=>{
      setIsDone(true)
    })
  }

  useEffect(() => {
    setLoading(true)
    axios.get(`${host}/rooms`).then((response) => {
      setlistOfRooms(response.data);
      setLoading(false)
      // console.log(listOfRooms)

    });
  }, []);

  const columns = [
    {
      name: 'ROOM NO',
      selector: row => row.RoomNo,
      sortable: true,
    },

    {
      name: 'TYPE NAME',
      selector: row => row.RoomTypeView,
      sortable: true,
    },
    //   {
    //   name: 'ROOM-TYPE-VIEW',
    //   selector: row => `${row.TypeName}-${row.View}`,
    //   sortable: true,
    // },
    {
      name: 'FLOOR',
      selector: row => row.floor,
      sortable: true,
    },
    {
      name: 'STATUS',
      selector: row => row.Status,
      sortable: true,
      cell: row => (
        <div
          style={{
            backgroundColor: row.Status === "Available" ? "blue" : "pink",
            borderRadius: "8px",
            padding: "5px",
          }}
        >
          {row.Status}
        </div>
      ),
    },

    {
      name: 'TOTAL CHARGE($)',
      selector: row => row.TotalCharge,
      sortable: true,
    },
    {
      name: 'ADD-INFO',
      selector: row => row.AddInfo,
      sortable: true,
      cell: row => (
        <div className={style.tooltip}>
          {row.AddInfo}
          <span className={style.tooltipText}>{row.AddInfo}</span>
        </div>
      ),
    },
    {
      selector: row => row,
      cell: (row) => <EditDelete setlistOfRooms={setlistOfRooms} row={row} editOption  isDone={isDone} handleDone={handleDone} success={success}
      removeOption deleteHeading ="Confirm Remove" deleteBody="Are you sure you want to remove?"  onRemove={handleRemove} id= {row.RoomNo} successMsg="Room removed Successfully!"
        editComponent={<EditRoom  values={row} setIsDone={setIsDone} setSuccess={setSuccess}  />} 
      />
    },
  ];


  return (
    <>
      {loading && <Spinner loading={loading}/>}
       <div className={style.tableContainer}>
      <label className={style.labelTwo}>Edit/Delete Room</label>
      <RoomTable columns={columns} data={props.listOfRooms} height="30vh" edit pagination />

    </div>
    </>
   
  );
}

export default Table;
