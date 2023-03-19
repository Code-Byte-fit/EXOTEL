import React from "react";
import style from "./Rooms.module.css";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Input from "../../General/Inputs/Inputs";
import * as Yup from 'yup';

function Popup({ handleClose }, {handleAddFormChange}) {
  const initialValues = {
    RoomNo: '',
    roomType: '',
    baseCharge: '',
    floor: '',
    sqFeet: ''
};

const validationSchema = Yup.object().shape({
  RoomNo: Yup.string().required("*Room Number is Required")
  .matches(/^[A-Za-z0-9]+$/, 'Must only contain letters and numbers')
  .max(10, 'Room Number must be at most 10 characters long'),
  roomType: Yup.string().required("*Room Type is Required"),
  baseCharge: Yup.number().required("*Base Charge is Required"),
  floor: Yup.string().required("*Floor is Required"),
  sqFeet: Yup.number().required("*Square Feet is Required"),
});

const makeReq=async(formData)=>{
  await axios.post("http://localhost:3001/rooms",formData);
}

const onSubmit=(data) => {
  makeReq(data)

 };

 const baseCharge = [
  { key: "--None Selected --", value: "" },
  { key: "500", value: "500" },
  { key: "1000", value: "1000" },
  { key: "2000", value: "2000" }]

const Floor = [
  { key: "--None Selected --", value: "" },
  { key: "Ground Floor", value: "Ground Floor" },
  { key: "1st Floor", value: "1st Floor" },
  { key: "2nd Floor", value: "3rd Floor" }]
  
const sqFeet = [{ key: "--None Selected --", value: "" },
{ key: "250 cm2", value: "250" },
{ key: "500 cm2", value: "500" },
{ key: "550 cm2", value: "550" }]
  return (
    <div className={style.popup}>
    <div className={style.popupContent}>
      <h2>Edit Room Details</h2>
      <Formik initialValues={initialValues} onSubmit={onSubmit}  validationSchema={validationSchema} >
        <Form>
          <div className={style.div1}>
            <div className={style.fieldGroup}>
              <span>  
                <Field name="RoomNo"
                  component={Input}
                  label="Room Number"
                  type="text"
                  onBlur={handleAddFormChange}
                  className={style.inputField}
                />
                <ErrorMessage name="RoomNo" component="div" className={style.error}/>
              </span>

              <span>  
                <Field name="roomType"
                  component={Input}
                  label="Room Type"
                  type="text"
                  onBlur={handleAddFormChange}
                  className={style.inputField}
                />
                <ErrorMessage name="roomType" component="div" className={style.error}/>
              </span>
            </div>

            <div className={style.fieldGroup}>
              <span>  
                <Field name="baseCharge"
                  component={Input}
                  label="Base Charge"
                  type="select"
                  options={baseCharge}
                  onBlur={handleAddFormChange}
                  className={style.inputField}
                />
                <ErrorMessage name="baseCharge" component="div" className={style.error}/>
              </span>

              <span>  
                <Field name="floor"
                  component={Input}
                  label="Floor"
                  type="select"
                  options={Floor}
                  onBlur={handleAddFormChange}
                  className={style.inputField}
                />
                <ErrorMessage name="floor" component="div" className={style.error}/>
              </span>
            </div>

            <div className={style.fieldGroup}>
              <span>
                <Field name="sqFeet"
                  component={Input}
                  label="Square Feet"
                  type="select"
                  options={sqFeet}
                  className={style.inputField}
                  onBlur={handleAddFormChange}
                />
                <ErrorMessage name="sqFeet" component="div" className={style.error}/>
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