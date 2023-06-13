import React, { useState,useContext } from 'react'
import {AppContext} from "../../../Helpers/AppContext"
import {Formik,Form,Field,ErrorMessage} from "formik"
import * as yup from 'yup';
import axios from 'axios';
import Input from "../../General/Inputs/Inputs"
import Combobox from "react-widgets/Combobox";
import options from "./CountryList.json"
import "react-widgets/styles.css";
import uploadIcon from "../../../Assets/Images/Upload.png"
import style from "./Style.module.css"


export default function ResPageTwo(props) {
  const {host}=useContext(AppContext);
  const [selectedFile,setSelectedFile]=useState(null);
  const [isOldGuest,setIsOldGuest]=useState(false);
  const [guests,setGuests]=useState([]);
  const schema = yup.object().shape({
    Source: yup.string().required('required'),
    FirstName: yup.string()
      .matches(/^[a-zA-Z\s]+$/, 'Invalid')
      .required('required'),
    LastName: yup.string()
      .matches(/^[a-zA-Z\s]+$/, 'Invalid')
      .required('required'),
    Country: yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'Invalid')
    .required('required'),
    Email: yup.string().email('Invalid email').required('required'),
    PhoneNumber: yup.string()
      .required("required")
      .matches(/^[+]?\d{10,14}$/, "Invalid phone number"),
  });
  

  const handleSubmit=(values)=>{
    props.next(values)
  }

  const handleCheckboxChange = (event) => {
    setIsOldGuest(event.target.checked);
  };

  useState(()=>{
    axios.get(`${host}/guests`).then((res)=>{
      console.log(res.data)
    })
  },[])

  

  const Sources = [
    { key: 'None Selected', value: '' },
    { key: 'Phone', value: 'Phone' },
    { key: 'Walk-In', value: 'Walk-In' },
]
  return (
    <>
        <Formik initialValues={props.data} onSubmit={handleSubmit} validationSchema={schema}>
                {({values,setFieldValue})=>(
                  <Form encType="multipart/form-data">
                  <div className={style.formContainer}>
                  <div>
                    <div className={style.heading}>RESERVATION DETAILS</div>
                    <div className={style.inputContainer}>
                    <span className={style.innerinputContainer}>
                      <Field name="Source" component={Input} label="Booking Method" type="select" options={Sources}/>
                      <ErrorMessage name="Source" component="small" className={style.errorMsg} />
                    </span>
                    </div>
                  </div>
                  <div>
                    <div className={style.heading}>
                    <span>MAIN GUEST</span>
                    {/* {guests.length===0 &&
                    <span className={style.newGuest}>
                       <input type="checkbox" onChange={handleCheckboxChange}/>
                      <small>existing guest</small>
                    </span>} */}
                    </div>
                    <div className={style.inputContainer}>
                    <span className={style.innerinputContainer}>
                        <Field name="FirstName" component={Input} label="First Name" type="text"/>
                        <ErrorMessage name="FirstName" component="small" className={style.errorMsg} />
                    </span>
                    <span className={style.innerinputContainer}>
                        <Field name="LastName" component={Input} label="Last Name" type="text"/>
                        <ErrorMessage name="LastName" component="small" className={style.errorMsg} />
                    </span>
                    <span className={`${style.innerinputContainer} ${style.country}`}>
                        <label for="Country">Country</label>
                        <Field name="Country" id="Country" component={Combobox}  defaultValue="Sri Lanka" data={options} hideEmptyPopup
                          value={values.Country}
                          onChange={(value) => {
                            setFieldValue("Country", value);
                          }}
                        />
                        <ErrorMessage name="Country" component="small" className={style.errorMsg} />
                    </span>        
                    </div>
                  </div>
                  <div className={style.inputContainer}>
                  <span className={style.innerinputContainer}>
                     <Field name="Email" component={Input} label="Email" type="text" id="Email"/>
                    <ErrorMessage name="Email" component="small" className={style.errorMsg} />
                  </span>
                  <span className={style.innerinputContainer}>
                    <Field name="PhoneNumber" component={Input} label="Phone Number" type="text"/>
                    <ErrorMessage name="PhoneNumber" component="small" className={style.errorMsg} />
                  </span>
                  </div>

                  <div>
                    <div className={style.heading}>IDENTIFICATION</div>
                    <div className={style.fileInputCont}>
                      <label for="Identification" className={style.identifyCont}>
                            <img src={uploadIcon}/>
                            <span>Identification</span>
                      </label>
                      {selectedFile!==null &&
                        <div className={style.selectFileCont}>
                          <span>Selected File:</span>
                          <span className={style.fileName}>{selectedFile.name}</span>
                        </div>
                      }
                        <input id="Identification" name="Identification" type="file" style={{display:'none'}}
                        onChange={(event) => {
                        setFieldValue("Identification", event.target.files[0]);
                        setSelectedFile(event.target.files[0])
                        }}/>
                    </div>
                  </div>
                  <div className={style.btnContainer}>
                    <button type="button" onClick={()=>props.prev(values)} className={style.Btn}>Back</button>
                    <button type="submit" className={style.Btn}>Proceed</button>
                  </div>
                  </div>
                  </Form>
                )}
      </Formik>
    </>
  )
}
