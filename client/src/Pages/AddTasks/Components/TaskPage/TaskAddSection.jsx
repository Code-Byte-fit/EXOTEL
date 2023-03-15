import React, { useState } from "react";
import axios from "axios";
import style from "../TaskPage/HKstyle.module.css";
import { getRoomNumber, getTaskType, getRoomBoyNumber } from "./HKDummy";

const TaskAddSection = () => {
  const curr = new Date();
  const date = curr.toISOString().substring(0, 10); // convert date type returned from Date function to ISO type and then take the first 10 characters which includes the date
  const time = curr.toTimeString().substring(0, 5);

  const [rNumber, setrNumber] = useState(getRoomNumber());
  const [rbNumber, setrbNumber] = useState(getRoomBoyNumber());
  const [taskType, settasktype] = useState(getTaskType());
  const [selectedDate, setSelectedDate] = useState(date);
  const [selectedTime, setSelectedTime] = useState(time);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      roomNumber: event.target.roomNumber.value,
      roomBoyNumber: event.target.roomBoyNumber.value,
      taskType: event.target.taskType.value,
      taskDate: event.target.taskDate.value,
      taskTime: event.target.taskTime.value,
      specialNotes: event.target.specialNotes.value,
    };
    console.log(formData);
    const response = await axios.post(`http://localhost:3001/tasks/`, formData); // this line is for passing data to backend
    console.log(response.data);
    // You can process the form data here as required
  };

  return (
    <div className={style.divAddTaskSection}>
      <div className={style.divTitleAddTask}>ADD TASKS</div>
      <form onSubmit={handleSubmit}>
        <div className={style.divInputRow1}>
          <div class="mb-3">
            <div className={style.labelRow1s}>
              <label
                for="roomNumber"
                class="form-label"
                className={style.labelRow1Text}
              >
                Room Number
              </label>
            </div>

            <select
              name="roomNumber"
              class="form-control"
              className={style.inputFieldRow1}
              required
            >
              <option selected disabled>
                Select a Room
              </option>
              {rNumber.map((room) => (
                <option value={room}>{room}</option>
              ))}
            </select>
          </div>

          <div class="mb-3">
            <div className={style.labelRow1s}>
              <label
                for="roomBoyNumber"
                class="form-label"
                className={style.labelRow1Text}
              >
                Room Boy Name
              </label>
            </div>
            <select
              name="roomBoyNumber"
              class="form-control"
              className={style.inputFieldRow1}
              required
            >
              <option selected disabled>
                Select a Name
              </option>
              {rbNumber.map((roomboy) => (
                <option value={roomboy.id}>{roomboy.name}</option>
              ))}
            </select>
          </div>

          <div class="mb-3">
            <div className={style.labelRow1s}>
              <label
                for="taskType"
                class="form-label"
                className={style.labelRow1Text}
              >
                Task Type
              </label>
            </div>
            <select
              name="taskType"
              class="form-control"
              className={style.inputFieldRow1}
              required
            >
              <option selected disabled>
                Select a Task
              </option>
              {taskType.map((taskType) => (
                <option value={taskType}>{taskType}</option>
              ))}
            </select>
          </div>

          <div class="mb-3">
            <div className={style.labelRow1s}>
              <label
                for="taskDate"
                class="form-label"
                className={style.labelRow1Text}
              >
                Date
              </label>
            </div>
            <input
              name="taskDate"
              type="date"
              class="form-control"
              className={style.inputFieldRow1}
              defaultValue={selectedDate}
            />
          </div>

          <div class="mb-3">
            <div className={style.labelRow1s}>
              <label
                for="taskTime"
                class="form-label"
                className={style.labelRow1Text}
              >
                Time
              </label>
            </div>
            <input
              name="taskTime"
              type="time"
              class="form-control"
              id="exampleFormControlInput1"
              className={style.inputFieldRow1}
              defaultValue={selectedTime}
            />
          </div>
        </div>
        <div className={style.divInputRow2}>
          <div class="mb-3">
            <div className={style.labelRow1s}>
              <label
                for="specialNotes"
                class="form-label"
                className={style.labelRow1Text}
              >
                Special Notes
              </label>
            </div>
            <textarea
              name="specialNotes"
              cols="30"
              rows="10"
              className={style.inputFieldRow2}
            ></textarea>
          </div>
        </div>
        <div className={style.divBtnAddToList}>
          <input
            type="submit"
            class="btn btn-primary btn-sm"
            className={style.btnAddToList}
            value="Add to List"
          />
        </div>
      </form>
    </div>
  );
};

export default TaskAddSection;
