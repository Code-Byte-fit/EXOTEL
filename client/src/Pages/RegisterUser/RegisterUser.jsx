import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Input from '../General/Inputs/Inputs';
import ConfirmRegistration from './Components/ConfirmRegistration';
import Combobox from "react-widgets/Combobox";
import options from "./Components/CountryList.json"
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
    proPic:'',
  }

  const userGroups=[
    {key:'none Selected',value:''},
    {key:'Administrator',value:'Administrator'},
    {key:'FO Manager',value:'FOManager'},
    {key:'HK Manager',value:'HKManager'},
    {key:'Receptionist',value:'Receptionist'},
    {key:'Cashier',value:'Cashier'},
    {key:'Room-Boy',value:'RoomBoy'},
  ]

  const [selectedFile,setSelectedFile]=useState(null)
  
  return (
    <>
      
      <div className={style.container}> 
      
      
        <Formik initialValues={initialValues} onSubmit={()=>{}}  validationSchema={validationSchema} >
            {(formikValues) => (
              <Form encType="multipart/form-data">
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
                  <span className={style.country}>
                        <label for="country">Country</label>
                        <Field name="country" id="country" component={Combobox}  defaultValue="Sri Lanka" data={options} hideEmptyPopup
                          value={formikValues.values.country}
                          onChange={(value) => {
                            formikValues.setFieldValue("country", value);
                          }}
                        />
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
                    <label for="proPic" className={style.proPicCont}>
                          <img src={uploadIcon}/>
                          <span>Profile-Picture</span>
                    </label>
                    {selectedFile!==null &&
                      <div className={style.selectFileCont}>
                        <span>Selected File:</span>
                        <span className={style.fileName}>{selectedFile.name}</span>
                      </div>
                    }
                      <input id="proPic" name="proPic" type="file" style={{display:'none'}}
                      onChange={(event) => {
                      formikValues.setFieldValue("proPic", event.currentTarget.files[0]);
                      setSelectedFile(event.target.files[0])
                      }}/>
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


