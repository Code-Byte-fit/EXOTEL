import React,{useState} from 'react';
import { Formik, Form, Field } from "formik"
import Slider from './Slider';
import backBtn from "../../../Assets/Images/back.png"
import style from "../components/PageTwo.module.css"

function PageTwo(props) {
  useState(()=>{
   console.log(props.data) 
  },[])
 
  const onSubmit=(values)=>{
    props.next(values,true)
  }
  

  return (
    <>
    <div className={style.mainCont}>
      <div className={style.heading}>Rate our service</div>
          <Formik initialValues={props.data} onSubmit={onSubmit}>
            {(formik) => (
              <Form>
                <div className={style.box}>
                  <Field component={Slider} desc="Hospitality" defaultValue={props.data.stat.hospitality}
                  onChange={(event) => {formik.setFieldValue("stat", {...formik.values.stat,hospitality: event.target.value})}}/>
                  <Field component={Slider} desc="Hygiene" defaultValue={props.data.stat.hygiene}
                  onChange={(event) => {formik.setFieldValue("stat", {...formik.values.stat,hygiene: event.target.value})}}/>
                  <Field component={Slider} desc="Food" defaultValue={props.data.stat.food}
                  onChange={(event) => {formik.setFieldValue("stat", {...formik.values.stat,food: event.target.value})}}/>
                  <Field component={Slider} desc="Facilities" defaultValue={props.data.stat.facilities}
                  onChange={(event) => {formik.setFieldValue("stat", {...formik.values.stat,facilities: event.target.value})}}/>
                  <Field component={Slider} desc="Rooms" defaultValue={props.data.stat.rooms}
                  onChange={(event) => {formik.setFieldValue("stat", {...formik.values.stat,rooms: event.target.value})}}/>
                  <div className={style.buttonCont}>
                    <img src={backBtn} onClick={()=>props.prev(formik.values)} className={style.backBtn}/>
                    <button type="submit" className={style.submitButton}>Submit</button>
                  </div>
                </div>
              </Form>)}
          </Formik>
      </div>
    </>
  );
  };
  export default PageTwo;
  

