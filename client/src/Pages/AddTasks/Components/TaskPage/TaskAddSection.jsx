import React, { useState } from "react";
import axios from "axios";
import style from "../TaskPage/HKstyle.module.css";
import { getRoomNumber, getTaskType, getRoomBoyNumber } from "./HKDummy";
import Input from "../../../General/Inputs/Inputs";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const TaskAddSection = () => {
  const curr = new Date();
  const date = curr.toISOString().substring(0, 10); // convert date type returned from Date function to ISO type and then take the first 10 characters which includes the date
  const time = curr.toTimeString().substring(0, 5);

  const [rNumber, setrNumber] = useState(getRoomNumber());
  const [rbNumber, setrbNumber] = useState(getRoomBoyNumber());
  const [taskType, settasktype] = useState(getTaskType());
  const [selectedDate, setSelectedDate] = useState(date);
  const [selectedTime, setSelectedTime] = useState(time);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const formData = {
  //     roomNumber: event.target.roomNumber.value,
  //     roomBoyNumber: event.target.roomBoyNumber.value,
  //     taskType: event.target.taskType.value,
  //     taskDate: event.target.taskDate.value,
  //     taskTime: event.target.taskTime.value,
  //     specialNotes: event.target.specialNotes.value,
  //   };
  //   // console.log(formData);
  //   // const response = await axios.post(`http://localhost:3001/tasks/`, formData); // this line is for passing data to backend
  //   // console.log(response.data);
  //   // You can process the form data here as required
  // };

  const initialValues = {
    roomNumber: "",
    roomBoy: "",
    taskType: "",
    taskDate: date,
    taskTime: time,
    specialNotes: "",
  };

  const validationSchema = Yup.object().shape({
    roomNumber: Yup.string().required("Room number is required"),
    roomBoy: Yup.string().required("Room boy is required"),
    taskType: Yup.string().required("Task type is required"),
    taskDate: Yup.date().required("Task date is required"),
    taskTime: Yup.string().required("Task time is required"),
    specialNotes: Yup.string(),
  });

  const makeReq = async (formData) => {
    await axios.post("http://localhost:3001/tasks/", formData);
  };

  const onSubmit = (data) => {
    makeReq(data);
  };

  // rbNumber.map((roomboy) => console.log(roomboy));
  return (
    <div className={style.divAddTaskSection}>
      <div className={style.divTitleAddTask}>ADD TASKS</div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <div className={style.divInputRow1}>
            <div className={style.labelRow1s}>
              <Field
                name="roomNumber"
                component={Input}
                label="Room Number"
                type="select"
                options={rNumber}
                style={{ width: "17.2vw" }}
              />
              <ErrorMessage
                name="errRoomNumber"
                component="div"
                className={style.error}
              />
            </div>
            <div className={style.labelRow1s} style={{ marginLeft: "0.5vw" }}>
              <Field
                name="roomBoy"
                component={Input}
                label="Room Boy"
                type="select"
                options={rbNumber}
                style={{ width: "17.2vw" }}
              />
              <ErrorMessage
                name="errRoomBoy"
                component="div"
                className={style.error}
              />
            </div>
            <div className={style.labelRow1s} style={{ marginLeft: "0.5vw" }}>
              <Field
                name="taskType"
                component={Input}
                label="Task Type"
                type="select"
                options={rbNumber}
                style={{ width: "17.2vw" }}
              />
              <ErrorMessage
                name="errRoomNumber"
                component="div"
                className={style.error}
              />
            </div>
            <div className={style.labelRow1s} style={{ marginLeft: "0.5vw" }}>
              <Field
                name="taskDate"
                component={Input}
                label="Task Date"
                type="date"
                width="17.2vw"
              />
              <ErrorMessage
                name="errTaskDate"
                component="div"
                className={style.error}
              />
            </div>
            <div className={style.labelRow1s} style={{ marginLeft: "0.5vw" }}>
              <Field
                name="taskTime"
                component={Input}
                label="Task Time"
                type="time"
                width="17.2vw"
              />
              <ErrorMessage
                name="errTaskTime"
                component="div"
                className={style.error}
              />
            </div>
          </div>
          <div className={style.divInputRow2}>
            <Field
              name="specialNotes"
              component={Input}
              label="Task Time"
              type="textarea"
              style={{ width: "88vw", height: "10vh", resize: "none" }}
            />
            <ErrorMessage
              name="errTaskTime"
              component="div"
              className={style.error}
            />
          </div>
          <div className={style.divBtnAddToList}>
            <button className={style.btnaddItems}>Add Items</button>
            <input
              type="submit"
              className={style.btnAddToList}
              value="Add to List"
            />
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default TaskAddSection;
