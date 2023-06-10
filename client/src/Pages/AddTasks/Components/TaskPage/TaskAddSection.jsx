import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import style from "./HKstyle.module.css";
import Input from "../../../General/Inputs/Inputs";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AppContext } from "../../../../Helpers/AppContext";

const TaskAddSection = ({ taskToEdit, onRefresh }) => {
  const { host } = useContext(AppContext);
  const curr = new Date();
  const date = curr.toISOString().substring(0, 10);
  const time = curr.toTimeString().substring(0, 5);

  const initialValues = {
    RoomNo: "",
    userId: "",
    taskType: "",
    taskDate: date,
    taskTime: time,
    Notes: "",
  };

  const [roomNumbers, setRoomNumbers] = useState([]);
  const [rbNumber, setrbNumber] = useState([]);
  const [initValues, setInitValues] = useState(initialValues);

  useEffect(() => {}, [initValues]);

  //create task
  const makeReq = async (formData) => {
    await axios.post(`${host}/tasks`, formData);
    onRefresh();
    setInitValues(initialValues);
  };

  const onSubmit = (data) => {
    makeReq(data);
  };

  // async function handleSchedule() {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:3001/tasks/autoSchedule"
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  //Retrieve data from room and user tables for the drop downs in the forms
  async function viewTasks() {
    try {
      const response = await axios.get(`${host}/tasks/taskDetails`);
      // console.log(response);
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
  }, []);

  //Task Type array
  const Task = [
    { key: "Laundry", value: "laundry" },
    { key: "Mini-Bar", value: "minibar" },
    { key: "Clean", value: "clean" },
  ];

  const extraOption = { key: "None Selected", value: "" };
  const roomNumberOptions = [extraOption, ...roomNumbers];
  const roomBoyOptions = [extraOption, ...rbNumber];
  const taskOptions = [extraOption, ...Task];

  //Form validations using Yup
  const validationSchema = Yup.object().shape({
    RoomNo: Yup.string().required("Required"),
    userId: Yup.string().required("Required"),
    taskType: Yup.string().required("Required"),

    // taskDate: Yup.date().min(new Date(), "Date cannot be before today"),
    //   .required("Date is required"),
    taskTime: Yup.string().required("Task time is required"),
    Notes: Yup.string(),
  });

  return (
    <div className={style.divAddTaskSection}>
      <div className={style.divTitleAddTask}>
        ADD TASKS
        {/* <input
          type="button"
          className={style.btnAutoSchedule}
          value="Auto Schedule"
          onClick={handleSchedule}
        /> */}
      </div>
      <Formik
        initialValues={initValues}
        enableReinitialize={true}
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
