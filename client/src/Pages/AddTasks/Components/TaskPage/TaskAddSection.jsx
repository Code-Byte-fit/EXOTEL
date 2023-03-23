import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "../TaskPage/HKstyle.module.css";
import Input from "../../../General/Inputs/Inputs";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const TaskAddSection = () => {
  const curr = new Date();
  const date = curr.toISOString().substring(0, 10); // convert date type returned from Date function to ISO type and then take the first 10 characters which includes the date
  const time = curr.toTimeString().substring(0, 5);

  const [roomNumbers, setRoomNumbers] = useState([]);
  const [rbNumber, setrbNumber] = useState([]);
  // const [taskType, settasktype] = useState(getTaskType());
  // const [selectedDate, setSelectedDate] = useState(date);
  // const [selectedTime, setSelectedTime] = useState(time);

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
    RoomNo: "",
    userId: "",
    taskType: "",
    taskDate: date,
    taskTime: time,
    Notes: "",
  };

  const makeReq = async (formData) => {
    await axios.post("http://localhost:3001/tasks/", formData);
  };

  const onSubmit = (data) => {
    console.log(data);
    makeReq(data);
  };

  //Retrieve data from room and user tables for the drop downs in the forms
  async function viewTasks() {
    try {
      const response = await axios.get(
        "http://localhost:3001/tasks/taskDetails"
      );
      console.log(response);
      const room = response.data.roomDetails.map((value) => {
        return {
          key: value.RoomNo,
          value: value.RoomNo,
        };
      });

      const roomBoy = response.data.roomBoyDetails.map((value) => {
        return {
          key: `${value.RoomBoyId} - ${value.RoomBoyName}`,
          value: value.RoomBoyId,
        };
      });

      setRoomNumbers(room);
      setrbNumber(roomBoy);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    viewTasks();
    console.log(roomNumbers);
  }, []);

  useEffect(() => {
    // viewTasks();
    console.log(...roomNumbers);
  }, [roomNumbers]);

  //Task Type array
  const Task = [
    { key: "Laundry", value: "laundry" },
    { key: "Mini-Bar", value: "minibar" },
    { key: "Clean", value: "clean" },
  ];
  // console.log(roomNumbers);

  const extraOption = { key: "None Selected", value: "" };
  const roomNumberOptions = [extraOption, ...roomNumbers];
  const roomBoyOptions = [extraOption, ...rbNumber];
  const taskOptions = [extraOption, ...Task];

  const validationSchema = Yup.object().shape({
    RoomNo: Yup.string().required("Required"),
    userId: Yup.string().required("Required"),
    taskType: Yup.string().required("Required"),

    // taskDate: Yup.date().min(new Date(), "Date cannot be before today"),
    //   .required("Date is required"),
    taskTime: Yup.string().required("Task time is required"),
    Notes: Yup.string(),
  });

  // const onSubmit = (values, { setSubmitting }) => {
  //   console.log(values);
  //   setSubmitting(false);
  // };

  return (
    <div className={style.divAddTaskSection}>
      <div className={style.divTitleAddTask}>ADD TASKS</div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ values }) => (
          <Form>
            <div className={style.divInputRow1}>
              <div className={style.labelRow1s}>
                <Field
                  name="RoomNo"
                  component={Input}
                  label="Room Number"
                  type="select"
                  options={roomNumberOptions}
                  style={{ width: "17.2vw" }}
                />
                <ErrorMessage
                  name="RoomNo"
                  component="div"
                  className={style.error}
                />
              </div>
              <div className={style.labelRow1s} style={{ marginLeft: "0.5vw" }}>
                <Field
                  name="userId"
                  component={Input}
                  label="Room Boy"
                  type="select"
                  options={roomBoyOptions}
                  style={{ width: "17.2vw" }}
                />
                <ErrorMessage
                  name="userId"
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
                  options={taskOptions}
                  style={{ width: "17.2vw" }}
                />
                <ErrorMessage
                  name="taskType"
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
                  name="TaskDate"
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
                  name="TaskTime"
                  component="div"
                  className={style.error}
                />
              </div>
            </div>
            <div className={style.divInputRow2}>
              <Field
                name="Notes"
                component={Input}
                label="Special Notes"
                type="textarea"
                style={{ width: "88vw", height: "10vh", resize: "none" }}
              />
            </div>
            <div className={style.divBtnAddToList}>
              {/* <button className={style.btnaddItems}>+ Add Items </button> */}
              <input
                type="submit"
                className={style.btnAddToList}
                value="Add to List"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TaskAddSection;
