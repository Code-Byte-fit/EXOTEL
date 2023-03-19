import React, { useState, useEffect } from "react";
import style from "./RBTaskViewstyle.module.css";
import { getTaskData } from "./HKDummy";
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
      name: "ROOM-NUMBER",
      selector: (row) => row.ReservationNo,
      sortable: true,
    },
    {
      name: "ROOM-BOY",
      selector: (row) => row.userId,
      sortable: true,
    },
    {
      name: "TASK-TYPE",
      selector: (row) => row.TaskType,
      sortable: true,
    },
    {
      name: "DATE",
      selector: (row) => row.TaskDate,
      sortable: false,
    },
    {
      name: "TIME",
      selector: (row) => row.TaskTime,
      sortable: false,
    },
    {
      name: "NOTES",
      selector: (row) => row.Notes,
      sortable: false,
    },
  ];

  console.log(getTaskList());

  return (
    <div className={style.divEditDeleteTableSection}>
      <div className={style.divTitleEditDelete}>EDIT/DELETE TASK</div>

      <div className={style.divTblEditDelete}>
        <Table columns={columns} data={getTaskList()} height="80vh" />
      </div>
    </div>
  );
};

export default TaskEditDeleteTableSection;
