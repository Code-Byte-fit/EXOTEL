import React from "react";
import {useState,useEffect} from 'react';
import Input from "../../General/Inputs/Inputs";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import Select from 'react-select';
import style from '../components/Minibar.module.css'

export default function FormOne(props) {
  const [Reservations, setReservations] = useState([]);
  const [MiniBarItems, setMinibarItems] = useState([]);
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

    const itemNameOptions = [
      { label: "-- None Selected --", value: "" },
      { label: "Chips", value: "Chips" },
      { label: "Chocolate", value: "Chocolate" },
      { label: "Juice", value: "Juice" },
     
    ];

    const fetchResNum = async()=>{
      const response = await axios.get("http://localhost:3001/reservations");
      setReservations(response.data);}
      useEffect(()=>{
        fetchResNum();
      },[]);

      const fetchItemName = async()=>{
        const response = await axios.get("http://localhost:3001/Minibar/minibaritems");
        
        setMinibarItems(response.data);
        console.log(response.data)
      }
      useEffect(()=>{
        fetchItemName();
        
      },[]);
    
    

      return (

        <div className={style.formContainer}>
            <label className={style.labelOne}>Minibar Restocked </label>
            <Formik 
              initialValues={initialValues} 
              onSubmit={props.onSubmit} >
                {({values})=>(
                 <Form>
                 <div className={style.div1}>
                     {/* <ErrorMessage name="RoomNo" component="span"/> */}
                     <span className={style.select}>
                     <div className={style.lbl4}>
                      <label className={style.lbl3} for="resNumber">Reservation Number</label><br/></div>
                      
                     <Field name="ResNumber"
                        render={({ field, form }) => (
                          <Select
                            {...field}
                            options={[{key:"-- None Selected -- ",value:""},...Reservations.map(Reservations=>
                              ({key:Reservations.resId,value:Reservations.resId}))]}
                            onChange={(option) =>
                            form.setFieldValue(field.name, option.value)
                            }
                            onBlur={() => form.setFieldTouched(field.name, true)}
                          />
                          )}
                    />
                    </span>
                         
                     {/* <ErrorMessage name="Date" component="span"/> */}
                     <Field name="LastRestocked" 
                         component={Input} 
                         label="Date"
                         type="date"
                         width="20vw" />
                     {/* <ErrorMessage name="ItemNumber" component="span"/> */}
                     {/* <span className={style.select}>
                     <div className={style.lbl4}><label className={style.lbl3} for="itemName">Item name</label><br/></div> */}
                     <Field name="ItemName"
                component = {Input}
                type="select"
                label="Item Name"
                width='20vw'
                    options={[{key:"-- None Selected -- ",value:""}, ...MiniBarItems.map(MiniBarItems =>
                      ({key:MiniBarItems.ItemName,value:MiniBarItems.ItemName}))]}/>
                   
                     {/* <ErrorMessage name="Qty" component="span"/> */}
                     <Field name="Quantity"
                         component={Input}
                         label="Quantity"
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
                               
