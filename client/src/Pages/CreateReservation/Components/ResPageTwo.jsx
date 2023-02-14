import React from 'react'
import {Formik,Form,Field} from "formik"


export default function ResPageTwo(props) {
  const handleSubmit=(values)=>{
    props.next(values,true)
  }
  return (
    <>
        <Formik initialValues={props.data} onSubmit={handleSubmit}>
                {({values})=>(
                  <Form>
                    <Field name="Country"/>
                    <Field name="Email"/>
                    <button type="button" onClick={()=>props.prev(values)}>Back</button>
                    <button type="submit">Proceed</button>
                  </Form>
                )}
      </Formik>
    </>
  )
}
