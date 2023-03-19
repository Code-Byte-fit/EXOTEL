import React from "react";
import style from "./AddOns.module.css";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Input from "../../General/Inputs/Inputs";
import * as Yup from 'yup';

function Popup({ handleClose }, {handleAddFormChange}) {
  const initialValues = {
    AddOnNo: '',
    AddOn: '',
    Amt: '',
    AddInfo: ''
};

const validationSchema = Yup.object().shape({
  AddOnNo: Yup.string().required("*Room Number is Required")
        .matches(/^[A-Za-z0-9]+$/, 'Must only contain letters and numbers')
        .max(10, 'Room Number must be at most 10 characters long'),
        AddOn: Yup.string().required("*Room Type is Required"),
        Amt: Yup.number().required("*Base Charge is Required"),
});

const makeReq=async(formData)=>{
  await axios.post("http://localhost:3001/addons",formData);
}

const onSubmit=(data) => {
  makeReq(data)

 };

 
  return (
    <div className={style.popup}>
    <div className={style.popupContent}>
      <h2>Edit Add On</h2>
      <Formik initialValues={initialValues} onSubmit={onSubmit}  validationSchema={validationSchema} >
        <Form>
          <div className={style.div1}>
            <div className={style.fieldGroup}>
              <span>  
              <Field name="AddOnNo"
                            component={Input}
                            label="AddOn Number"
                            type="text"
                            onBlur={handleAddFormChange}
                            width="13vw" />
                      <ErrorMessage name="AddOnNo" component="div"  className={style.error}/>
              </span>

              <span>  
              <Field name="AddOn"
                            component={Input}
                            label="AddOn"
                            type="text"
                            onBlur={handleAddFormChange}
                            width="13vw" />
                              <ErrorMessage name="AddOn" component="div"  className={style.error}/>
              </span>
            </div>

            <div className={style.fieldGroup}>
              <span>  
              <Field name="Amt"
                            component={Input}
                            label="Amount"
                            type="text"
                           
                        onBlur={handleAddFormChange}
                            width="13vw" />
                              <ErrorMessage name="Amt" component="div"  className={style.error}/>
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
                            cols="150" />
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