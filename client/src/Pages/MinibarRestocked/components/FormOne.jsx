import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../Helpers/AppContext"
import Input from "../../General/Inputs/Inputs";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import Select from 'react-select';
import style from '../components/Minibar.module.css'

export default function FormOne(props) {
  const [Reservations, setReservations] = useState([]);
  const [MiniBarItems, setMinibarItems] = useState([]);
  const { host } = useContext(AppContext);
  const today = new Date();
    const initialValues = {
        ReservationId: '',
        LastRestocked: today.toISOString().slice(0, 10),
        ItemName: '',
        Quantity: ''
    }; 

    const validationSchema = Yup.object().shape({
      ReservationId: Yup.string().required("Required"),
      ItemName: Yup.string().required("Required") ,
      Quantity:Yup.number().positive("Quantity must be greater than 1").required("Required") 
    });

    const fetchResNum = async()=>{
      const response = await axios.get("http://localhost:3001/reservations");
      setReservations(response.data.map(Reservations => ({ value: Reservations.id, label: Reservations.id })));
    }
      
    useEffect(()=>{
        fetchResNum();
      },[]);

      const fetchItemName = async()=>{
        const response = await axios.get("http://localhost:3001/Minibar/minibaritems");
        setMinibarItems(response.data.map(MiniBarItems => ({ value: MiniBarItems.ItemName, label: MiniBarItems.ItemName })));
    }
      
    useEffect(()=>{
      fetchItemName();
      },[]);
     
    

      return (

        <div className={style.formContainer}>
            <label className={style.labelOne}>Minibar Restocked </label>
            <Formik 
              initialValues={initialValues} 
              onSubmit={props.onSubmit}
              validationSchema={validationSchema} >
                {({values})=>(
                 <Form>
                 <div className={style.div1}>
                     <span className={style.select}>
                     <div className={style.lbl4}>
                      <label className={style.lbl3} for="ReservationId">Reservation Number</label><br/></div>
                      <span className={style.cont}>
                     <Field name="ReservationId"
                        render={({ field, form }) => (
                          <Select
                            options={[{ value: '', label: '-- None Selected -- ' }, ...Reservations]}
                            value={Reservations.find(option => option.value === field.value)}
                            onChange={option => 
                            form.setFieldValue(field.name, option.value)}
                            onBlur={() => form.setFieldTouched(field.name, true)}
                            isSearchable
                          />

                        )}
                    />                  
                       <ErrorMessage name="ReservationId"
                            component="span" 
                            className={style.error} 
                    /> 
                    </span>
                    </span>
                    
                         
                     <Field name="LastRestocked" 
                         component={Input} 
                         label="Date"
                         type="date"
                         width="20vw" />

                      <span className={style.select}>
                     <div className={style.lbl4}>
                      <label className={style.lbl3} for="ItemName">Item Name</label><br/></div>

                      <span className={style.cont}>

                  <Field name="ItemName"
                        render={({ field, form }) => (
                          <Select
                          {...field}
                          options={[{ value: '', label: '-- None Selected -- ' }, ...MiniBarItems]}
                          value={MiniBarItems.find(option => option.value === field.value)}
                          onChange={(option) =>
                          form.setFieldValue(field.name, option.value)
                          }
                          onBlur={() => form.setFieldTouched(field.name, true)}
                          isSearchable
                        />
                        )}
                    />    
                       <ErrorMessage name="ItemName"
                            component="span" 
                            className={style.error} 
                    />
                    </span>
                    </span>
                    <span className={style.cont}>
                     <Field name="Quantity"
                         component={Input}
                         label="Quantity"
                         type="number"
                         width="20vw"
                         className={style.qty}
                          />
                          
                          <ErrorMessage name="Quantity"
                            component="span" 
                            className={style.error} 
                    />
                    </span>
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
                               
