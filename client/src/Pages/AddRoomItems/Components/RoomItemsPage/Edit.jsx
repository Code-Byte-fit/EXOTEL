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
    success
      ? axios.put(`${host}/roomItems`, data).then((res) => {
          props.setIsDone(true);
          props.setSuccess(success);
        })
      : props.setIsDone(true);
    props.setSuccess(success);
  };

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
                      name="RoomItemName"
                      type="text"
                      component={Input}
                      label="Room Item"
                      width="29vw"
                    />
                    <ErrorMessage
                      name="RoomItemName"
                      component="div"
                      className={style.error}
                    />
                  </span>
                </div>
                <div className={style.inputCont}>
                  <span className={style.input}>
                    <Field
                      name="Cost"
                      type="text"
                      component={Input}
                      label="Cost"
                      width="29vw"
                    />
                    <ErrorMessage
                      name="Cost"
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
