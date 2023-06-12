import React, { useState,useContext, useEffect} from 'react'
import {AppContext} from "../../../../Helpers/AppContext"
import axios from "axios"
import {Formik,Form,Field} from "formik"
import Combobox from "react-widgets/Combobox";
import countries from "../../../RegisterUser/Components/CountryList.json"
import Input from "../../../General/Inputs/Inputs"
import style from "../Style.module.css"

export default function Edit(props) {
  const {host}=useContext(AppContext)
  
  const handleEdit = (data,success) => {
    success?
    axios.put(`${host}/guests`, data).then((res) => {
      props.setIsDone(true);
      props.setSuccess(success);
    }):
      props.setIsDone(true);
      props.setSuccess(success);
  };
 
  return (
    <>
      <div className={style.editCont}>
          <div className={style.editHeading}>Edit Guest</div>
          <Formik initialValues={props.values} onSubmit={null} validationSchema={null}>
                {(formikValues)=>(
                  <Form>
                  <div className={style.formCont}>
                      <div className={style.inputCont}>
                        <span className={style.input}>
                          <Field name="FirstName" component={Input} label="First Name" type="text"/>
                        </span>
                        <span className={style.input}>
                          <Field name="LastName" component={Input} label="Last Name" type="text"/>
                        </span>
                      </div>
                      <div className={style.inputCont}>
                        <span className={style.input}>
                          <Field name="Email" component={Input} label="Email" type="text"/>
                        </span>
                        <span className={style.input}>
                          <Field name="PhoneNumber" component={Input} label="Phone Number" type="text"/>
                        </span>
                      </div>
                      <div className={style.lowerCont}>
                          <span className={style.country}>
                            <label for="Country">Country</label>
                            <Field name="Country" id="Country" component={Combobox}  defaultValue="Sri Lanka" 
                            data={countries} hideEmptyPopup
                              value={formikValues.values.Country}
                              onChange={(value) => {
                                formikValues.setFieldValue("Country", value);
                              }}
                            />
                          </span>
                      </div>
                      <div className={style.confirmBtnCont}>
                        <button type='button' className={`${style.editBtn} ${style.cancelBtn}`} 
                        onClick={()=>{handleEdit(formikValues.values,false)}}>Cancel</button>
                        <button type='button' className={`${style.editBtn} ${style.confirmBtn}`} 
                        onClick={()=>{handleEdit(formikValues.values,true)}}>Confirm</button>
                      </div>
                      </div> 
                  </Form>
                )}
      </Formik> 
      </div>
    </>
  )
}
