import React, { useState, useContext } from 'react';
import Input from "../../General/Inputs/Inputs";
import style from "./AddOns.module.css";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { AppContext } from "../../../Helpers/AppContext"
import { ReactComponent as Exclamation } from "../../../Assets/Images/exclamation.svg";
function EditAddon(props) {

    const { host } = useContext(AppContext);

 
    const handleEdit = (data,success) => {
        success?
        axios.put(`${host}/addon`, data).then((res) => {
          props.setIsDone(true);
          props.setSuccess(success);
        }):
          props.setIsDone(true);
          props.setSuccess(success);
      };

    const [initialValues, setInitialValues] = useState({ ...props.values, NewAddOn: props.values.AddOn })
    const validationSchema = Yup.object().shape({
        AddOn: Yup.string().required("Required"),
        Charge: Yup.number().required("Required"),
        Unit: Yup.string().required("Required"),
        AddInfo: Yup.string(),
    });

    const temp = false;

    return (

        <>
            {temp ?
            <>
            <div className={style.editCont}>
            <div className={style.editHeading}>Edit Add-On</div>
            <Formik initialValues={initialValues} onSubmit={handleEdit} validationSchema={validationSchema}>
                {(formik) => (
                    <Form>

                        <div className={style.Editdiv1}>

                            <span className={style.box1}>
                                <Field name="NewAddOn"
                                    component={Input}
                                    label="Add-On"
                                    type="text"
                                    width="13vw" />
                                <ErrorMessage name="AddOn" component="span" className={style.error} />
                            </span>

                            <span className={style.box1}>
                                <Field name="Unit"
                                    component={Input}
                                    label="Unit"
                                    type="text"
                                    width="13vw" />
                                <ErrorMessage name="Unit" component="span" className={style.error} />
                            </span>
                            <span className={style.box1}>
                                <Field name="Charge"
                                    component={Input}
                                    label="Charge"
                                    type="text"
                                    width="13vw" />
                                <ErrorMessage name="Charge" component="span" className={style.error} />
                            </span>

                        </div>

                        <div className={style.Editdiv2}>
                            <Field name="AddInfo"
                                component={Input}
                                label="Additional Information"
                                type="textarea"
                                rows="4"
                                cols="150" />
                        </div>
                        <div className={style.confirmBtnCont}>
                            <button type='button' className={`${style.editBtn} ${style.cancelBtn}`} onClick={()=>{handleEdit(formik.values,false)}} >Cancel</button>
                            <button type='button' className={`${style.editBtn} ${style.confirmBtn}`} onClick={()=>{handleEdit(formik.values,true)}} >Confirm</button>
                        </div>

                    </Form>
                )}

            </Formik>


        </div>
            </>:
            <span>
            <>
                        <div className={style.confirmModal}>
                            <Exclamation className={style.exclamation} />
                            <span className={`${style.confirmHeading} ${style.success}`}>Error!</span>
                            <span className={style.confirmBody}> This AddOn cannot be edited since it is associated with one or more reservations</span>
                            <button className={`${style.Btn} ${style.doneBtn}`}>Ok</button>
                        </div>
                    </>
            </span>
            
            }
        </>

       
    )
}

export default EditAddon;