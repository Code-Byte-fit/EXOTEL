import React, { useState, useEffect } from "react";
import style from "./RepairRequeststyle.module.css";
// import { getTaskData } from "./HKDummy";
import axios from "axios";
import Table from "../../General/Table/Table";
import { BsPencil, BsTrash } from "react-icons/bs";

const RepairRequestEditDeleteTableSection = ({ refresh, onEditRequest }) => {
  const [requestData, setRequestData] = useState([]);

  const viewRepairs = async () => {
    const response = await axios.get(`http://localhost:3001/repairs/`);
    setRequestData(response.data);
  };

  const handleEdit = (data) => {
    onEditRequest(data);
  };

  const handleDelete = (data) => {};

  useEffect(() => {
    viewRepairs();
  }, []);

  useEffect(() => {
    viewRepairs();
  }, [refresh]);

  const getRequestList = () => {
    return requestData;
  };

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
      name: "NOTES",
      selector: (row) => row.Notes,
      sortable: false,
    },
    {
      name: "Actions",
      selector: (row) => (
        <>
          <button onClick={() => handleEdit(row)}>
            <BsPencil color="grey" />
          </button>
          <button onClick={() => handleDelete(row)}>
            <BsTrash color="grey" />
          </button>
        </>
      ),
      sortable: false,
    },
  ];

  return (
    <div className={style.divEditDeleteTableSection}>
      <div className={style.divTitleEditDelete}>EDIT/CANCEL TASK</div>

      <div class="class=table-responsive-lg" className={style.divTblEditDelete}>
        <Table
          columns={columns}
          data={getRequestList()}
          height="35vh"
          pagination
        />
      </div>
    </div>
  );
};

export default RepairRequestEditDeleteTableSection;
