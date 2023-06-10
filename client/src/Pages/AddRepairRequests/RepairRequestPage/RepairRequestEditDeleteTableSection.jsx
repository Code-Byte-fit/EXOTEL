import React, { useState, useEffect, useContext } from "react";
import style from "./RepairRequeststyle.module.css";
import axios from "axios";
import Table from "../../General/Table/Table";
import EditDelete from "../../General/Table/EditDelete";
import Spinner from "../../General/Spinner/Spinner";
import { AppContext } from "../../../Helpers/AppContext";
import Edit from "./Edit";

const RepairRequestEditDeleteTableSection = ({ refresh, onEditRequest }) => {
  const { host } = useContext(AppContext);
  const [success, setSuccess] = useState(true);
  const [isDone, setIsDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [repairRequests, setRepairRequests] = useState("");

  useEffect(() => {
    setLoading(true);
    axios.get(`${host}/repairs`).then((res) => {
      setRepairRequests(res.data);
      setLoading(false);
    });
  }, []);

  const handleDone = () => {
    setIsDone(false);
    setLoading(true);
    axios.get(`${host}/repairs`).then((response) => {
      setRepairRequests(response.data);
      setLoading(false);
    });
  };

  const [requestData, setRequestData] = useState([]);

  // const viewRepairs = async () => {
  //   const response = await axios.get(`http://localhost:3001/repairs/`);
  //   setRequestData(response.data);
  // };

  // const handleEdit = (data) => {
  //   onEditRequest(data);
  // };

  // const handleDelete = (data) => {};

  // useEffect(() => {
  //   viewRepairs();
  // }, []);

  useEffect(() => {
    // viewRepairs();
    handleDone();
  }, [refresh]);

  // const getRequestList = () => {
  //   return requestData;
  // };

  const columns = [
    {
      name: "REPAIR-ID",
      selector: (row) => row.RepairRequestNo,
      sortable: true,
    },
    {
      name: "ROOM-ID",
      selector: (row) => row.RoomNo,
      sortable: true,
    },
    {
      name: "ITEM-ID",
      selector: (row) => row.RoomItemNo,
      sortable: true,
    },
    {
      name: "ITEM-NAME",
      selector: (row) => row.RoomItem.RoomItemName,
      sortable: true,
    },
    {
      name: "DATE",
      selector: (row) => row.createdAt.substring(0, 10),
      sortable: false,
    },
    {
      name: "STATUS",
      selector: (row) => row.DoneStatus,
      sortable: false,
      cell: (row) => (
        <span
          className={
            row.DoneStatus === "Waiting" ? style.redBadge : style.blueBadge
          }
        >
          {row.DoneStatus}
        </span>
      ),
    },
    {
      name: "NOTES",
      selector: (row) => row.Notes,
      sortable: false,
    },
    {
      selector: (row) => row,
      cell: (row) => (
        <EditDelete
          editOption
          isDone={isDone}
          handleDone={handleDone}
          setIsDone={setIsDone}
          success={success}
          editComponent={
            <Edit values={row} setIsDone={setIsDone} setSuccess={setSuccess} />
          }
        />
      ),
    },
  ];

  return (
    <div className={style.divEditDeleteTableSection}>
      {loading && <Spinner loading={loading} />}
      <div className={style.divTitleEditDelete}>
        EDIT/CANCEL REPAIR REQUESTS
      </div>

      <div class="class=table-responsive-lg" className={style.divTblEditDelete}>
        <Table
          columns={columns}
          data={repairRequests}
          height="35vh"
          pagination
        />
      </div>
    </div>
  );
};

export default RepairRequestEditDeleteTableSection;
