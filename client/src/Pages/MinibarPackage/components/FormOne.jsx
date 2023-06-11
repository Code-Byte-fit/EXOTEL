import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../Helpers/AppContext"
import Input from "../../General/Inputs/Inputs";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import Select from 'react-select';
import style from './MPackage.module.css'
import './Itmes.css'


export default function FormOne(props) {
  const [minibarPackage, setminibarPackage] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { host } = useContext(AppContext);
  const initialValues = {
    PackageName: "",
    PackagePrice: 0, // use totalPrice prop here
    PackageItems: []
  };
  

  // const validationSchema = Yup.object().shape({
  //   RoomNumber: Yup.string().required("Required"),
  //   Date: Yup.date().required("Required") ,
  //   ItemNumber: Yup.number().min(4).max(8).required("Required") ,
  //   Quantity:Yup.number().required("Required") 
  // });

  const fetchItemName = async()=>{
    const response = await axios.get(`${host}/Minibar/minibaritems`);
    
    setminibarPackage(response.data);
    console.log(response.data)
  }

  useEffect(()=>{
    fetchItemName();
  
  //calculate initial total price
  const selectedItemsTotalPrice = minibarPackage.reduce(
    (acc, item) => acc + item.ItemPrice,
    0
  );
  setTotalPrice(selectedItemsTotalPrice);
}, []);

  const handleSelectChange = (Formik, selectedOption) => {
    const selectedItems = selectedOption.map((option) =>
    minibarPackage.find((item) => item.ItemName === option.value)
    );
    const selectedItemsTotalPrice = selectedItems.reduce(
      (acc, item) => acc + item.ItemPrice,
      0
    );
    setTotalPrice(selectedItemsTotalPrice);
    Formik.setFieldValue("PackageItems", selectedOption);
    Formik.setFieldValue("PackagePrice", selectedItemsTotalPrice); // update PackagePrice field
  };
  

  return (
    <div className={style.formContainer}>
      <label className={style.labelOne}>Minibar Package</label>
      <Formik initialValues={initialValues} onSubmit={props.onSubmit}>
        {(Formik) => (
          <Form>
            <div className={style.div1}>
              <Field
                name="PackageName"
                component={Input}
                label="Package Name"
                type="text"
                width="20vw"/>
              

              <div className={style.div4}>
                <label className={style.label}>Package Items</label>
                <br />
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

              </div>
            </div>
            <div className={style.div5}>
                  <label className={style}>Package Price: $ </label> {totalPrice}
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
            <span className={style.createBtn}>
              <button type="submit" className={style.buttonOne}>Create</button>
                 </span>

             </Form>
                )}
      </Formik>

        
        </div>
        
    ) 
  }