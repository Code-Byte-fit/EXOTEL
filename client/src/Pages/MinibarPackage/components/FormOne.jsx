import React from "react";
import { useState, useEffect } from 'react';
import Input from "../../General/Inputs/Inputs";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import Select from 'react-select';
import style from './MPackage.module.css'
import './Itmes.css'


export default function FormOne(props) {
  const [MiniBarItems, setMinibarItems] = useState([]);

  const initialValues = {
    PackageName: '',
    PackagePrice: '',
    PackageItems: []
  };

  // const validationSchema = Yup.object().shape({
  //   RoomNumber: Yup.string().required("Required"),
  //   Date: Yup.date().required("Required") ,
  //   ItemNumber: Yup.number().min(4).max(8).required("Required") ,
  //   Quantity:Yup.number().required("Required") 
  // });

  const fetchItemName = async()=>{
    const response = await axios.get("http://localhost:3001/Minibar/minibaritems");
    
    setMinibarItems(response.data);
    console.log(response.data)
  }

    useEffect(()=>{
      fetchItemName();
      
    },[]);

   

    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
    ]

  return (

    <div className={style.formContainer}>
      <label className={style.labelOne}>Minibar Package</label>
      <Formik
        initialValues={initialValues}
        onSubmit={props.onSubmit}>
        {(Formik) => (
          <Form>
            <div className={style.div1}>
              <Field name="PackageName"
                component={Input}
                label="Package Name"
                type="text"
                width="20vw" />

                <div className={style.div4}>

              <label className={style}>Package Items</label><br/>
              <Field name="PackageItems"
                component = {Select}
                className="react-select-container"
                classNamePrefix="react-select"
                isMulti
                options={[{label:"-- None Selected -- ",value:""}, ...MiniBarItems.map(item => ({label: item.ItemName, value: item.ItemName})),]}
                onChange={(selectedOption) => Formik.setFieldValue('PackageItems',selectedOption)}
                      />
                      
             </div>


            </div>
              
                 <span className={style.div2}>
                     <Field name="addInfo"
                         component={Input}
                         label="Additional Information"
                         type="textarea"
                         rows="4"
                         cols="35" />
                 </span>
                 <span className={style.createBtn}> 
                 <button type="submit" className={style.buttonOne}>Create</button>
                 </span>

             </Form>
                )}
      </Formik>

        
        </div>
        
    ) 
  }
                               
