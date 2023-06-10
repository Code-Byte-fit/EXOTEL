import React, { useState, useEffect, useContext } from "react";
import style from "./HKstyle.module.css";
import { AppContext } from "../../../../Helpers/AppContext";
import axios from "axios";
import Table from "../../../General/Table/Table";
import EditDelete from "../../../General/Table/EditDelete";
import Edit from "./Edit";
import Spinner from "../../../General/Spinner/Spinner";

const TaskEditDeleteTableSection = ({ refresh, onEditTask }) => {
  const { host } = useContext(AppContext);
  const [success, setSuccess] = useState(true);
  const [isDone, setIsDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState("");

  useEffect(() => {
    setLoading(true);
    axios.get(`${host}/tasks`).then((res) => {
      setTasks(res.data);
      setLoading(false);
    });
  }, []);

  const handleDone = () => {
    setIsDone(false);
    setLoading(true);
    axios.get(`${host}/tasks`).then((response) => {
      setTasks(response.data);
      setLoading(false);
    });
  };
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    handleDone();
  }, [refresh]);

  const columns = [
    {
      name: "TASK-ID",
      selector: (row) => row.taskId,
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

      <div className={style.divTitleEditDelete}>EDIT/CANCEL TASK</div>

      <div class="class=table-responsive-lg" className={style.divTblEditDelete}>
        <Table
          columns={columns}
          // data={getTaskList()}
          data={tasks}
          height="35vh"
          pagination
        />
      </div>
    </div>
  );
};

export default TaskEditDeleteTableSection;
