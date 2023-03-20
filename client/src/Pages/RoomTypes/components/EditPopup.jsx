import React from "react";
import style from "./Types.module.css";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Input from "../../General/Inputs/Inputs";
import * as Yup from 'yup';

function Popup({ handleClose }, { handleAddFormChange }) {
  const initialValues = {
    RoomTypeID:'',
    TypeName: '',
    View:'',
    NoOfBeds: '',
    sqFeet: '',
    BaseCharge: ''
  };

  const validationSchema = Yup.object().shape({
    TypeName: Yup.string().required("*Room Type is Required"),
    NoOfBeds: Yup.number().required("*Base Charge is Required"),
    sqFeet: Yup.string().required("*Floor is Required"),
    BaseCharge: Yup.number().required("*Square Feet is Required"),
  });

  const makeReq = async (formData) => {
    await axios.post("http://localhost:3001/roomtypes", formData);
  }

  const onSubmit = (data) => {
    makeReq(data)

  };


  return (
    <div className={style.popup}>
      <div className={style.popupContent}>
        <h2>Edit Room Details</h2>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
          <Form>
            <div className={style.div1}>
              <div className={style.fieldGroup}>
              
                <span>
                  <Field name="TypeName"
                    component={Input}
                    label="Room Type"
                    type="text"
                    onBlur={handleAddFormChange}
                    width="13vw" />
                  <ErrorMessage name="TypeName" component="div" className={style.error} />              </span>
              </div>

              <div className={style.fieldGroup}>
                <span>
                  <Field name="NoOfBeds"
                    component={Input}
                    label="No Of Beds"
                    type="text"
                    onBlur={handleAddFormChange}
                    width="13vw" />
                  <ErrorMessage name="NoOfBeds" component="div" className={style.error} />
                </span>

                <span>

                  <Field name="sqFeet"
                    component={Input}
                    label="sq Feet"
                    type="text"
                    onBlur={handleAddFormChange}
                    width="13vw" />
                  <ErrorMessage name="sqFeet" component="div" className={style.error} />
                </span>
              </div>

              <div className={style.fieldGroup}>
                <span>
                  <Field name="BaseCharge"
                    component={Input}
                    label="Base Charge"
                    type="text"
                    onBlur={handleAddFormChange}
                    width="13vw" />
                  <ErrorMessage name="BaseCharge" component="div" className={style.error} />
                </span>
              </div>
            </div>

            <div className={style.div2}>
              <div className={style.fieldGroup1}>
                <span>
                  <Field name="addInfo"
                    component={Input}
                    label="Additional Information"
                    type="textarea"
                    rows="4"
                    cols="80"
                    className={style.inputField1}

                  />
                </span>
              </div>
            </div>

            <span className={style.createBtn1}>
              <button className={style.buttonOne} onClick={handleClose} type="submit">Save</button>

            </span>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Popup;