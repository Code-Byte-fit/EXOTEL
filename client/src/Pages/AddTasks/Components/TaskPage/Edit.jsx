import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../../../Helpers/AppContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Combobox from "react-widgets/Combobox";
// import countries from "../../RegisterUser/Components/CountryList.json";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Input from "../../../General/Inputs/Inputs";
import axios from "axios";
import { ReactComponent as Exclamation } from "../../../../Assets/Images/exclamation.svg";
import style from "./Style.module.css";

export default function Edit(props) {
  const { host } = useContext(AppContext);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleEdit = (data, success) => {
    success
      ? axios.put(`${host}/tasks`, data).then((res) => {
          props.setIsDone(true);
          props.setSuccess(success);
        })
      : props.setIsDone(true);
    props.setSuccess(success);
  };

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
    console.log(props.values);
    viewTasks();
  }, []);

  const [roomNumbers, setRoomNumbers] = useState([]);
  const [rbNumber, setrbNumber] = useState([]);

  const Task = [
    { key: "Laundry", value: "laundry" },
    { key: "Mini-Bar", value: "minibar" },
    { key: "Clean", value: "clean" },
  ];

  const extraOption = { key: "None Selected", value: "" };
  const roomNumberOptions = [extraOption, ...roomNumbers];
  const roomBoyOptions = [extraOption, ...rbNumber];
  const taskOptions = [extraOption, ...Task];

  return (
    <>
      <div className={style.editCont}>
        <div className={style.editHeading}>Edit Task</div>
        <Formik
          initialValues={props.values}
          onSubmit={handleEdit}
          validationSchema={null}
        >
          {(formikValues) => (
            <Form>
              <div className={style.formCont}>
                <div className={style.inputCont}>
                  <span className={style.input}>
                    <Field
                      name="RoomNo"
                      component={Input}
                      label="Room Number"
                      type="select"
                      options={roomNumberOptions}
                      style={{ width: "14vw" }}
                    />
                    <ErrorMessage
                      name="RoomNo"
                      component="div"
                      className={style.error}
                    />
                  </span>
                  <span className={style.input}>
                    <Field
                      name="userId"
                      component={Input}
                      label="Room Boy"
                      type="select"
                      options={roomBoyOptions}
                      style={{ width: "14vw" }}
                    />
                    <ErrorMessage
                      name="userId"
                      component="div"
                      className={style.error}
                    />
                  </span>
                </div>
                <div className={style.inputCont}>
                  <span className={style.input}>
                    <Field
                      name="taskType"
                      component={Input}
                      label="Task Type"
                      type="select"
                      options={taskOptions}
                      style={{ width: "14vw" }}
                    />
                    <ErrorMessage
                      name="taskType"
                      component="div"
                      className={style.error}
                    />
                  </span>
                  <span className={style.input}>
                    <Field
                      name="taskDate"
                      component={Input}
                      label="Task Date"
                      type="date"
                      width="14vw"
                    />
                    <ErrorMessage
                      name="TaskDate"
                      component="div"
                      className={style.error}
                    />
                  </span>
                </div>
                <div className={style.inputCont}>
                  <span className={style.input}>
                    <Field
                      name="taskTime"
                      component={Input}
                      label="Task Time"
                      type="time"
                      width="14vw"
                    />
                    <ErrorMessage
                      name="TaskTime"
                      component="div"
                      className={style.error}
                    />
                  </span>
                </div>

                <div className={style.inputCont}>
                  <span className={style.input}>
                    <Field
                      name="Notes"
                      component={Input}
                      label="Special Notes"
                      type="textarea"
                      style={{ width: "29vw", height: "5vh", resize: "none" }}
                    />
                  </span>
                </div>

                <div className={style.confirmBtnCont}>
                  <button
                    type="button"
                    className={`${style.editBtn} ${style.cancelBtn}`}
                    onClick={() => {
                      handleEdit(formikValues.values, false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className={`${style.editBtn} ${style.confirmBtn}`}
                    onClick={() => {
                      props.values.Role !== formikValues.values.Role
                        ? setShowConfirmation(true)
                        : handleEdit(formikValues.values, true);
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
              {showConfirmation && (
                <Popup open={true} closeOnDocumentClick={false}>
                  <div className={style.popup}>
                    <Exclamation className={style.exclamation} />
                    <span>
                      You are trying to change the Role of a user,are you sure
                      you want to proceed?
                    </span>
                    <div className={style.confirmBtnCont}>
                      <button
                        type="button"
                        className={`${style.editBtn} ${style.cancelBtn}`}
                        onClick={() => {
                          handleEdit(formikValues.values, false);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className={`${style.editBtn} ${style.confirmBtn}`}
                        onClick={() => {
                          handleEdit(formikValues.values, true);
                        }}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </Popup>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
