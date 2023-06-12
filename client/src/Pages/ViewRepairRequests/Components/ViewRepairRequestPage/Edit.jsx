import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../../../Helpers/AppContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Combobox from "react-widgets/Combobox";
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
    console.log("jbvdyhsbnvj");
    success
      ? axios.put(`${host}/repairs/sentDetails`, data).then((res) => {
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
  // const roomNumberOptions = [extraOption, ...roomNumbers];
  // const itemOptions = [extraOption, ...items];
  const statusOptions = [
    extraOption,
    { key: "Waiting", value: "Waiting" },
    { key: "Sent", value: "Sent" },
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
                  <div className={style.inputSection}>Repair ID</div>
                  <div className={style.inputSection}>
                    : {props.values.RepairRequestNo}
                  </div>
                </div>
                <div className={style.inputCont}>
                  <div className={style.inputSection}>Room ID</div>
                  <div className={style.inputSection}>
                    : {props.values.RoomNo}
                  </div>
                </div>
                <div className={style.inputCont}>
                  <div className={style.inputSection}>Item ID</div>
                  <div className={style.inputSection}>
                    : {props.values.RoomItemNo}
                  </div>
                </div>
                <div className={style.inputCont}>
                  <div className={style.inputSection}>Item Name</div>
                  <div className={style.inputSection}>
                    : {props.values.RoomItem.RoomItemName}
                  </div>
                </div>
                <div className={style.inputCont}>
                  <div className={style.inputSection}>Date</div>
                  <div className={style.inputSection}>
                    : {props.values.createdAt.substring(0, 10)}
                  </div>
                </div>
                <div className={style.inputCont}>
                  <div className={style.inputSection}>Notes</div>
                  <div className={style.inputSection}>
                    : {props.values.Notes}
                  </div>
                </div>
                {/* <div className={style.inputCont}>
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
                </div> */}
                <div className={style.inputCont}>
                  <span className={style.input}>
                    <Field
                      name="SentStatus"
                      component={Input}
                      label="Status"
                      type="select"
                      options={statusOptions}
                      style={{ width: "17.2vw" }}
                    />
                    <ErrorMessage
                      name="SentStatus"
                      component="div"
                      className={style.error}
                    />
                  </span>
                </div>

                {/* <div className={style.inputCont}>
                  <span className={style.input}>
                    <Field
                      name="Notes"
                      component={Input}
                      label="Special Notes"
                      type="textarea"
                      style={{ width: "29vw", height: "5vh", resize: "none" }}
                    />
                  </span>
                </div> */}

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
