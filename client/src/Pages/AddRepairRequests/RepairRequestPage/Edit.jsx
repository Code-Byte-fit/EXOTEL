import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../../Helpers/AppContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Combobox from "react-widgets/Combobox";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Input from "../../General/Inputs/Inputs";
import axios from "axios";
import { ReactComponent as Exclamation } from "../../../Assets/Images/exclamation.svg";
import style from "./Style.module.css";

export default function Edit(props) {
  const { host } = useContext(AppContext);

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleEdit = (data, success) => {
    success
      ? axios.put(`${host}/repairs`, data).then((res) => {
          props.setIsDone(true);
          props.setSuccess(success);
        })
      : props.setIsDone(true);
    props.setSuccess(success);
  };

  async function viewRepairs() {
    try {
      const response = await axios.get(`${host}/repairs/repairItemDetails`);

      const room = response.data.roomDetails.map((value) => {
        return {
          key: value.RoomNo,
          value: value.RoomNo,
        };
      });

      const item = response.data.itemDetails.map((value) => {
        return {
          key: `${value.roomItemNo} - ${value.RoomItemName}`,
          value: value.roomItemNo,
        };
      });

      setItems(item);
      setRoomNumbers(room);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    viewRepairs();
  }, []);

  const [roomNumbers, setRoomNumbers] = useState([]);
  const [items, setItems] = useState([]);

  const extraOption = { key: "None Selected", value: "" };
  const roomNumberOptions = [extraOption, ...roomNumbers];
  const itemOptions = [extraOption, ...items];
  const statusOptions = [
    extraOption,
    { key: "Waiting", value: "Waiting" },
    { key: "Done", value: "Done" },
  ];

  return (
    <>
      <div className={style.editCont}>
        <div className={style.editHeading}>Edit Repairs</div>
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
                      style={{ width: "17.2vw" }}
                    />
                    <ErrorMessage
                      name="RoomNo"
                      component="div"
                      className={style.error}
                    />
                  </span>
                </div>
                <div className={style.inputCont}>
                  <span className={style.input}>
                    <Field
                      name="RoomItemNo"
                      component={Input}
                      label="Room Item"
                      type="select"
                      options={itemOptions}
                      style={{ width: "17.2vw" }}
                    />
                    <ErrorMessage
                      name="RoomItemNo"
                      component="div"
                      className={style.error}
                    />
                  </span>
                  <span className={style.input}></span>
                </div>
                <div className={style.inputCont}>
                  <span className={style.input}>
                    <Field
                      name="DoneStatus"
                      component={Input}
                      label="Status"
                      type="select"
                      options={statusOptions}
                      style={{ width: "17.2vw" }}
                    />
                    <ErrorMessage
                      name="DoneStatus"
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
