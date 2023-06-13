import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../../Helpers/AppContext';
import { Formik, Form, Field,ErrorMessage } from 'formik';
import Combobox from 'react-widgets/Combobox';
import countries from '../../RegisterUser/Components/CountryList.json';
import * as Yup from 'yup';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Input from '../../General/Inputs/Inputs';
import axios from 'axios';
import {ReactComponent as Exclamation} from "../../../Assets/Images/exclamation.svg"
import style from './Style.module.css';

export default function Edit(props) {
  const { host } = useContext(AppContext);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleEdit = (data,success) => {
    success?
    axios.put(`${host}/users`, data).then((res) => {
      props.setIsDone(true);
      props.setSuccess(success);
    }):
      props.setIsDone(true);
      props.setSuccess(success);
  };

  const validationSchema = Yup.object().shape({
    FirstName: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Invalid')
    .required('required'),
    LastName: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Invalid')
    .required('required'),
    Country: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, 'Invalid')
      .required('required'),
      Email: Yup.string().email('Invalid email').required('required'),
      PhoneNumber: Yup.string()
      .required("required")
      .matches(/^[+]?\d{10,14}$/, "Invalid"),
  });


  const userGroups = [
    { key: 'none Selected', value: '' },
    { key: 'Administrator', value: 'Administrator' },
    { key: 'FO Manager', value: 'FOManager' },
    { key: 'HK Manager', value: 'HKManager' },
    { key: 'Receptionist', value: 'Receptionist' },
    { key: 'Cashier', value: 'Cashier' },
    { key: 'Room-Boy', value: 'RoomBoy' },
  ];

  return (
    <>
      <div className={style.editCont}>
        <div className={style.editHeading}>Edit User</div>
        <Formik initialValues={props.values} onSubmit={handleEdit} validationSchema={validationSchema}>
          {(formikValues) => (
            <Form>
              <div className={style.formCont}>
                <div className={style.inputCont}>
                  <span className={style.input}>
                    <Field name="FirstName" component={Input} label="First Name" type="text" />
                    <ErrorMessage name="FirstName" component="small" className={style.dateErr}/>
                  </span>
                  <span className={style.input}>
                    <Field name="LastName" component={Input} label="Last Name" type="text" />
                    <ErrorMessage name="LastName" component="small" className={style.dateErr}/>
                  </span>
                </div>
                <div className={style.inputCont}>
                  <span className={style.input}>
                    <Field name="Email" component={Input} label="Email" type="text" />
                    <ErrorMessage name="Email" component="small" className={style.dateErr}/>
                  </span>
                  <span className={style.input}>
                    <Field name="PhoneNumber" component={Input} label="Phone No" type="text" />
                    <ErrorMessage name="PhoneNumber" component="small" className={style.dateErr}/>
                  </span>
                </div>
                <div className={style.inputCont}>
                  <span className={style.country}>
                    <label htmlFor="Country">Country</label>
                    <Field
                      name="Country"
                      id="Country"
                      component={Combobox}
                      defaultValue="Sri Lanka"
                      data={countries}
                      hideEmptyPopup
                      value={formikValues.values.Country}
                      onChange={(value) => {
                        formikValues.setFieldValue('Country', value);
                      }}
                    />
                    <ErrorMessage name="Country" component="small" className={style.countryErr}/>
                  </span>
                </div>

                <div className={style.inputCont}>
                  <span className={style.input}>
                    <Field name="UserAccount.userName" component={Input} label="User Name" type="text" />
                  </span>
                  <span className={style.input}>
                    <Field name="Role" component={Input} label="User Group" type="select" options={userGroups} />
                  </span>
                </div>

                <div className={style.confirmBtnCont}>
                  <button type="button" className={`${style.editBtn} ${style.cancelBtn}`} 
                  onClick={()=>{handleEdit(formikValues.values,false)}}>Cancel</button>
                  <button
                    type='button'
                    className={`${style.editBtn} ${style.confirmBtn}`}
                    onClick={() => {
                      props.values.Role !== formikValues.values.Role ?
                      setShowConfirmation(true):
                      handleEdit(formikValues.values,true);
                      }}>
                    Confirm
                  </button>
                </div>
              </div>
              {showConfirmation && (
                <Popup open={true} closeOnDocumentClick={false}>
                <div className={style.popup}>
                  <Exclamation className={style.exclamation}/>
                  <span>You are trying to change the Role of a user,are you sure you want to proceed?</span>
                  <div className={style.confirmBtnCont}>
                    <button type="button" className={`${style.editBtn} ${style.cancelBtn}`} onClick={()=>{handleEdit(formikValues.values,false)}} >Cancel</button>
                    <button  type="button" className={`${style.editBtn} ${style.confirmBtn}`}
                    onClick={()=>{formikValues.dirty && formikValues.isValid && handleEdit(formikValues.values,true)}}
                    >Confirm</button>
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
