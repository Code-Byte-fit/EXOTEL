import React, { useState, useEffect } from "react";
import style from "./RBTaskViewstyle.module.css";
import { getTaskData } from "./HKDummy";
import axios from "axios";

const TaskEditDeleteTableSection = () => {
  const [taskData, setTaskData] = useState([]);

  const viewTasks = async () => {
    const response = await axios.get(`http://localhost:3001/tasks/`);
    setTaskData(response.data);
  };

  useEffect(() => {
    viewTasks();
  }, []);

  return (
    <div className={style.divEditDeleteTableSection}>
      <div className={style.divTitleEditDelete}>EDIT/DELETE TASK</div>

      <div class="class=table-responsive-lg" className={style.divTblEditDelete}>
        <table class="table table-hover" className={style.tblTaskEditDelete}>
          <thead>
            <tr>
              <th style={{ width: "10vw" }}>STATUS</th>
              <th style={{ width: "12vw" }}>ROOM NUMBER</th>
              <th style={{ width: "12vw" }}>ROOMBOY NUMBER</th>
              <th style={{ width: "12vw" }}>TYPE</th>
              <th style={{ width: "12vw" }}>DATE</th>
              <th style={{ width: "12vw" }}>TIME</th>
              <th style={{ width: "20vw" }}>SPECIAL NOTES</th>
              {/* <th style={{ width: "12vw" }}>ACTIONS</th> */}
            </tr>
          </thead>
          <tbody
            class="table-group-divider"
            className={style.bodyTblTaskEditDelete}
          >
            {taskData.map((task) => (
              <tr>
                <td>
                  <input
                    type="checkbox"
                    style={{ width: "10vw" }}
                    className={style.select}
                  />
                </td>
                <td style={{ width: "10vw" }}>{task.RoomNumber}</td>
                <td style={{ width: "12vw" }}>{task.RoomboyNumber}</td>
                <td style={{ width: "12vw" }}>{task.Type}</td>
                <td style={{ width: "12vw" }}>{task.Date}</td>
                <td style={{ width: "12vw" }}>{task.Time}</td>
                <td style={{ width: "22vw" }}>{task.SpecialNotes}</td>
                {/* <td style={{ width: "10vw" }}>sq sq2</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskEditDeleteTableSection;
