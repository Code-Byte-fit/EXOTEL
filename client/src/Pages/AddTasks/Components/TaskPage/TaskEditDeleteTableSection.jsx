import React, { useState, useEffect } from "react";
import style from "./HKstyle.module.css";
// import { getTaskData } from "./HKDummy";
import axios from "axios";
import Table from "../../../General/Table/Table";

const TaskEditDeleteTableSection = () => {
  const [taskData, setTaskData] = useState([]);

  const viewTasks = async () => {
    const response = await axios.get(`http://localhost:3001/tasks/`);
    setTaskData(response.data);
  };

  useEffect(() => {
    viewTasks();
  }, []);

  const getTaskList = () => {
    return taskData;
  };

  const columns = [
    {
      name: "TASK-ID",
      selector: (row) => row.taskNo,
      sortable: true,
    },
    {
      name: "ROOM-ID",
      selector: (row) => row.RoomNo,
      sortable: true,
    },
    {
      name: "USER-ID",
      selector: (row) => row.userId,
      sortable: true,
    },
    {
      name: "USER-NAME",
      selector: (row) => row.User.FirstName,
      sortable: true,
    },
    {
      name: "TASK-TYPE",
      selector: (row) => row.taskType,
      sortable: true,
    },
    {
      name: "DATE",
      selector: (row) => row.taskDate,
      sortable: false,
    },
    {
      name: "TIME",
      selector: (row) => row.taskTime,
      sortable: false,
    },
    {
      name: "NOTES",
      selector: (row) => row.Notes,
      sortable: false,
    },
  ];

  return (
    <div className={style.divEditDeleteTableSection}>
      <div className={style.divTitleEditDelete}>EDIT/DELETE TASK</div>

      <div class="class=table-responsive-lg" className={style.divTblEditDelete}>
        <Table
          columns={columns}
          data={getTaskList()}
          height="35vh"
          pagination
        />
      </div>
    </div>
  );
};

export default TaskEditDeleteTableSection;
