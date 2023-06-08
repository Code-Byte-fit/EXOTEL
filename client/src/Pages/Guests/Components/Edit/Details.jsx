import React from 'react'
    import {Formik,Form,Field} from "formik"
import Combobox from "react-widgets/Combobox";
import countries from "../../../RegisterUser/Components/CountryList.json"
import Input from "../../../General/Inputs/Inputs"
import style from "../Style.module.css"

export default function Details(props) {
  return (
    <>
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
                      <div className={style.lowerCont}>
                          <span className={style.country}>
                            <label for="Country">Country</label>
                            <Field name="Country" id="Country" component={Combobox}  defaultValue="Sri Lanka" data={countries} hideEmptyPopup
                              value={formikValues.values.Country}
                              onChange={(value) => {
                                formikValues.setFieldValue("Country", value);
                              }}
                            />
                          </span>
                          <button type='button' className={`${style.editBtn} ${style.emailbtn}`} onClick={()=>{props.handleStep(props.values,"email")}}>E-mail / Phone number</button>
                      </div>
                     
                      <div className={style.confirmBtnCont}>
                        <button type='button' className={`${style.editBtn} ${style.cancelBtn}`} onClick={()=>{props.handleEdit(formikValues.values,false)}}>Cancel</button>
                        <button type='button' className={`${style.editBtn} ${style.confirmBtn}`} onClick={()=>{props.handleEdit(formikValues.values,true)}}>Confirm</button>
                      </div>
                      </div> 
                  </Form>
                )}
      </Formik> 
    </>
  )
}
