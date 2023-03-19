import React, { useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Input from '../General/Inputs/Inputs';
import { FileInput } from '../General/Inputs/Inputs'
import ConfirmRegistration from './Components/ConfirmRegistration';
import uploadIcon from "../../Assets/Images/Upload.png"
import style from './Components/Style.module.css';

export default function RegisterUser() {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('required'),
    lastName: Yup.string().required('required'),
    country: Yup.string().required('required'),
    email: Yup.string().email('Invalid email').required('required'),
    phoneNumber: Yup.string().required('required'),
    userName: Yup.string().required('required'),
    password: Yup.string().required('required').min(8, 'min characters-8'),
    confirmPassword: Yup.string().required('required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const initialValues={
    firstName: '',
    lastName: '',
    userGroup:'',
    country: '',
    email: '',
    phoneNumber: '',
    userName: '',
    password: '',
    confirmPassword: '',
  }

  const userGroups=[
    {key:'none Selected',value:''},
    {key:'Administrator',value:'Administrator'},
    {key:'FO Manager',value:'FOManager'},
    {key:'HK Manager',value:'HKManager'},
    {key:'Receiptionist',value:'Receiptionist'},
    {key:'Cashier',value:'Cashier'},
    {key:'Room-Boy',value:'RoomBoy'},
  ]

  
  

  return (
    <>
      
      <div className={style.container}> 
      
      
        <Formik initialValues={initialValues} onSubmit={()=>{}}  validationSchema={validationSchema} >
            {(formikValues) => (
              <Form>
              <div className={style.mainCont}>
              <span className={style.mainHeading}>Register User</span>
                <div className={style.formContainer}>
                <div className={style.userDetails}>
                  <span className={style.subHeading}>User Details</span>
                  <div className={style.row}>
                  <span className={style.inputContainer}>
                    <Field name="firstName" component={Input} label="First Name" type="text"/>
                    <ErrorMessage name="firstName" component="small" className={style.errorMsg} />
                  </span>
                  <span className={style.inputContainer}>
                    <Field name="lastName" component={Input} label="Last Name" type="text" />
                    <ErrorMessage name="lastName" component="small" className={style.errorMsg} />
                  </span>
                  </div>
                  <div>
                  <span className={style.inputContainer}>
                    <Field name="userGroup" component={Input} label="User-Group" type="select" id="userGroup" options={userGroups}/>
                    <ErrorMessage name="userGroup" component="small" className={style.errorMsg} />
                  </span>
                  <span className={style.inputContainer}>
                    <Field name="country" component={Input} label="Country" type="text" />
                    <ErrorMessage name="country" component="small" className={style.errorMsg} />
                  </span>
                  </div>
                  <div>
                  <span className={style.inputContainer}>
                    <Field name="email" component={Input} label="Email" type="text" />
                    <ErrorMessage name="email" component="small" className={style.errorMsg} />
                  </span>
                  <span className={style.inputContainer}>
                    <Field name="phoneNumber" component={Input} label="Phone Number" type="text" />
                    <ErrorMessage name="phoneNumber" component="small" className={style.errorMsg} />
                    </span>
                  </div>
                </div>

                <span className={style.line}></span>

                <div className={style.accountDetails}>
                <span className={style.subHeading}>Account Details</span>
                <span className={style.inputContainer}>
                  <Field name="userName" component={Input} label="User-Name" type="text" />
                  <ErrorMessage name="userName" component="small" className={style.errorMsg} />
                  </span>
                  <div>
                  <span className={style.inputContainer}>
                    <Field name="password" component={Input} label="Password" type="password" />
                    <ErrorMessage name="password" component="small" className={style.errorMsg} />
                  </span>
                  <span className={style.inputContainer}>
                    <Field name="confirmPassword" component={Input} label="Confirm Password" type="password" />
                    <ErrorMessage name="confirmPassword" component="small" className={style.errorMsg} />
                  </span>
                  </div>
                  <div className={style.fileInputCont}>
                    <Field name="ProfilePic" component={FileInput} label="Upload Profile-Picture" id="propic" img={uploadIcon}/>
                  </div>
                  
                </div>
                </div>
                <ConfirmRegistration values={formikValues.values} isValid={formikValues.isValid && formikValues.dirty}/>
              </div>
             
             
              </Form>
            )}
          </Formik>
      
      </div>
    </>
  );
}


