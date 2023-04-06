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
                      <div className={style.countryCont}>
                         <label for="Country">Country</label>
                        <Field name="Country" id="Country" component={Combobox}  defaultValue="Sri Lanka" data={countries} hideEmptyPopup
                          value={formikValues.values.Country}
                          onChange={(value) => {
                            formikValues.setFieldValue("Country", value);
                          }}
                        />
                      </div>
                      <div className={style.btnCont}>
                        <button type='button' className={style.editBtn} onClick={()=>{props.handleStep(props.values,"email")}}>E-mail</button>
                        <button type='button' className={style.editBtn}>Phone-No</button>
                      </div>
                     
                      <div className={style.confirmBtnCont}>
                        <button type='button' className={`${style.editBtn} ${style.cancelBtn}`}>Cancel</button>
                        <button type='button' className={`${style.editBtn} ${style.confirmBtn}`} onClick={()=>{props.handleEdit(formikValues.values)}}>Confirm</button>
                      </div>
                      </div> 
                  </Form>
                )}
      </Formik> 
    </>
  )
}
