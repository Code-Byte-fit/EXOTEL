import React, { useState } from "react";
import { useEffect } from 'react';
import Input from "../../General/Inputs/Inputs";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import Select from 'react-select';
import style from './MPackage.module.css'
import './Itmes.css'

export default function FormOne(props) {
  // Define state variables
  const [minibarPackage, setMinibarPackage] = useState([]); // state variable to store minibar items
  const [totalPrice, setTotalPrice] = useState(0); // state variable to store total price of selected items

  const handleEdit = (data,success) => {
    success?
    axios.put("http://localhost:3001/Minibar/package", data).then((res) => {
      props.setIsDone(true);
      props.setSuccess(success);
    }):
      props.setIsDone(true);
      props.setSuccess(success);
  };

  const [initialValues, setInitialValues] = useState({
     ...props.values, newPackageName: props.values.PackageName })

     
  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    PackageName: Yup.string().required("Required"),
    PackageItems: Yup.array().min(1, "Required")

   
  });  

  // Function to fetch minibar items from server
  const fetchItemName = async () => {
    const response = await axios.get("http://localhost:3001/Minibar/minibaritems");
    
    setMinibarPackage(response.data);
    console.log(response.data)
  }

  // Call fetchItemName function on component mount
  useEffect(() => {
    fetchItemName();

    // Calculate initial total price
    const selectedItemsTotalPrice = minibarPackage.reduce(
      (acc, item) => acc + item.ItemPrice,
      0
    );
    setTotalPrice(selectedItemsTotalPrice);
  }, []);

  // Function to handle changes to selected items
  const handleSelectChange = (Formik, selectedOption) => {
    // Map selectedOption values to corresponding minibar items
    const selectedItems = selectedOption.map((option) =>
      minibarPackage.find((item) => item.ItemName === option.value)
    );

    // Calculate total price of selected items
    const selectedItemsTotalPrice = selectedItems.reduce(
      (acc, item) => acc + item.ItemPrice,
      0
    );

    // Update state variables and form field values
    setTotalPrice(selectedItemsTotalPrice);
    Formik.setFieldValue("PackageItems", selectedOption);
    Formik.setFieldValue("PackagePrice", selectedItemsTotalPrice);
  };

  return (
    <div className={style.formContainer}>
      <label className={style.labelOne}>Minibar Package</label>
      <Formik initialValues={initialValues} onSubmit={handleEdit} validationSchema={validationSchema}>
        {(Formik) => (
          <Form>
            <div className={style.div1}>
            <span className={style.cont}>
              <Field
                name="newPackageName"
                component={Input}
                label="Package Name"
                type="text"
                width="20vw"/>
                <ErrorMessage name="PackageName"
                         component="span" 
                         className={style.error} 
                      />
              </span>

              <div className={style.div4}>
                <label className={style.label}>Package Items</label>
                <br />
                <span className={style.cont}>
                <Select
                    name="PackageItems"
                    className="react-select-container"
                    classNamePrefix="react-select"
                    isMulti
                    options={[
                    { label: "-- None Selected -- ", value: "" },
                        ...minibarPackage.map((item) => ({
                        label: item.ItemName,
                        value: item.ItemName,
                    })),
                    ]}
                      onChange={(selectedOption) => handleSelectChange(Formik, selectedOption)}/>
                        <ErrorMessage name="PackageItems"
                         component="span" 
                         className={style.error} 
                      />
                      </span>

              </div>
            </div>
            <span className={style.div2}>

              <Field
                name="addInfo"
                component={Input}
                label="Additional Information"
                type="textarea"
                rows="4"
                cols="35"
              />
            </span>
            <div className={style.confirmBtnCont}>
                            <button type='button' className={`${style.editBtn} ${style.cancelBtn}`} onClick={()=>{handleEdit(Formik.values,false)}} >Cancel</button>
                            <button type='button' className={`${style.editBtn} ${style.confirmBtn}`} onClick={()=>{handleEdit(Formik.values,true)}} >Confirm</button>
                        </div>

             </Form>
                )}
      </Formik>

        
        </div>
        
    ) 
  }