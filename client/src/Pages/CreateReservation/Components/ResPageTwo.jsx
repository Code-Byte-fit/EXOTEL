import React from 'react'
import {Formik,Form,Field} from "formik"
import Input from "../../General/Inputs/Inputs"
import { FileInput } from '../../General/Inputs/Inputs'
import uploadIcon from "../../../Assets/Images/Upload.png"
import style from "./Style.module.css"


export default function ResPageTwo(props) {
  const handleSubmit=(values)=>{
    props.next(values)
  }

  const Sources = [
    { key: 'None Selected', value: '' },
    { key: 'Phone', value: 'Phone' },
    { key: 'Walk-In', value: 'Walk-In' },
]
  return (
    <>
        <Formik initialValues={props.data} onSubmit={handleSubmit}>
                {({values})=>(
                  <Form>
                  <div className={style.formContainer}>
                  <div>
                    <div>RESERVSTION DETAILS</div>
                    <Field name="Source" component={Input} label="Source" type="select" options={Sources}/>
                    <Field name="ArrivalTime" component={Input} label="Arrival Time" type="time" />
                  </div>
                  <div>
                    <div>MAIN GUEST</div>
                    <Field name="FirstName" component={Input} label="First-Name" type="text"/>
                    <Field name="LastName" component={Input} label="Last-Name" type="text"/>
                    <Field name="DOB" component={Input} label="Date-of-Birth" type="date"/>
                    <Field name="Country" component={Input} label="Country" type="text"/>
                  </div>
                  <div>
                    <Field name="Email" component={Input} label="Email" type="text"/>
                    <Field name="PhoneNumber" component={Input} label="Phone Number" type="text"/>
                  </div>

                  <div>
                    <div>IDENTIFICATION</div>
                    <Field name="Identification" component={FileInput} label="Upload Identification" id="Identification" img={uploadIcon}/>
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
