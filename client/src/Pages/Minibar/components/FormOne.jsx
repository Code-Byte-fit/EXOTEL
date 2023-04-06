import React from "react";
import {useState,useEffect} from 'react';
import Input from "../../General/Inputs/Inputs";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import Select from 'react-select';
import style from '../components/Minibar.module.css'

export default function FormOne(props) {
  const [Reservations, serReservations] = useState([]);
  const today = new Date();
    const initialValues = {
        ResNumber: '',
        LastRestocked: today.toISOString().slice(0, 10),
        ItemName: '',
        Quantity: ''
    };

    const validationSchema = Yup.object().shape({
      RoomNumber: Yup.string().required("Required"),
      Date: Yup.date().required("Required") ,
      ItemNumber: Yup.number().min(4).max(8).required("Required") ,
      Quantity:Yup.number().required("Required") 
    });
    

    // const ResNumber = [
    //     {key:"--None Selected--", value:""},
    //     {key: "1", value:"1"},  
    //     {key: "2", value:"2"},
    //     {key: "3", value:"3"},
    //     {key: "4", value:"4"}
    //   ]

    const minibarOptions = [
      { label: "-- None Selected --", value: "" },
      { label: "Hard Liquor", value: "Hard Liquor" },
      { label: "", value: "Bear" },
      { label: "Both", value: "Both" },
     
    ];

    const fetchResNum = async()=>{
      const response = await axios.get("http://locathost:3001/resId");
      serReservations(response.data);}
      useEffect(()=>{
        fetchResNum();
      },[]);
    
    

      return (

        <div className={style.formContainer}>
            <label className={style.labelOne}>Minibar</label>
            <Formik 
              initialValues={initialValues} 
              onSubmit={props.onSubmit} >
                {({values})=>(
                 <Form>
                 <div className={style.div1}>
                     <Field name="minibarId" 
                         component={Input} 
                         label="Minibar Id"
                         type="text"
                         width="20vw" />
                
                     <Field name="package"
                         component={Input}
                         label="Package"
                         type="select"
                         options={minibarOptions}
                         width="20vw" />

                    <Field name="Amount"
                         component={Input}
                         label="Amount"
                         type="text"
                         width="20vw" />

                 </div>

                 <div className={style.div2}>
                     <Field name="addInfo"
                         component={Input}
                         label="Additional Information"
                         type="textarea"
                         rows="4"
                         cols="155" />
                 </div>
                 <span className={style.createBtn}> 
                 <button type="submit" className={style.buttonOne}>Create</button>
                 </span>

             </Form>
                )}
      </Formik>

        
        </div>
        
    ) 
  }
                               
