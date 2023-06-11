import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../Helpers/AppContext"
import Input from "../../General/Inputs/Inputs";
import style from "./Types.module.css";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { ReactComponent as Exclamation } from "../../../Assets/Images/exclamation.svg";
import * as Yup from 'yup';


function EditType(props) {

    const { host } = useContext(AppContext);
    const [isRoomTypeValid, setRoomTypeValid] = useState(false);
    const [isFormVisible, setFormVisible] = useState(false);
  
    useEffect(() => {
      checkConflict();
    }, []);

    const checkConflict = (RoomTypeID) => {
        axios.get(`${host}/roomtypes/${RoomTypeID}/allocate`)
          .then((response) => {
            const data = response.data;
            if (data.length === 0) {
              setFormVisible(true);
            } else {
              setFormVisible(false);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
  
    const handleEdit = (data, success) => {
        success ?
            axios.put(`${host}/roomtypes`, data).then((res) => {
                props.setIsDone(true);
                props.setSuccess(success);
            }) :
            props.setIsDone(true);
        props.setSuccess(success);
    };


// const checkConflict = async (roomTypeNo) => {
//     try {
//       const response = await axios.get(`${host}/roomtypes/${roomTypeNo}/allocate`);
//       const roomTypeID = response.data.roomTypeID;
//       setRoomTypeValid(!!roomTypeID);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     checkConflict(initialValues.NewTypeName);
//   }, []);


    const [initialValues, setInitialValues] = useState({ ...props.values, NewTypeName: props.values.TypeName })

    const validationSchema = Yup.object().shape({
        TypeName: Yup.string().required('Required'),
        NoOfBeds: Yup.number()
            .required('Required')
            .typeError('Must contain only numbers'),
        sqFeet: Yup.string()
            .required('Required')
            .matches(/^[0-9]+$/, 'Must contain only numbers'),
        View: Yup.string().required('Required'),
        StandardCharge: Yup.string()
            .required('Required')
            .typeError('Must contain only numbers'),
        AddInfo: Yup.string(),
    });

    const view = [{ key: "--None Selected --", value: "" },
    { key: "Beach View", value: "Beach View" },
    { key: "Pool View", value: "Pool View" },
    { key: "Graden View", value: "Graden View" },
    { key: "Patio View", value: "Patio View" },
    { key: "City View", value: "City View" }]

    // const temp = true;

    return (

        <>
            {!isFormVisible ?
                <>
                    <div className={style.editCont}>


                        <div className={style.editHeading}>Edit Room Type</div>

                        <Formik initialValues={initialValues} onSubmit={handleEdit} validationSchema={validationSchema} >
                            {(formik) => (
                                <Form>

                                    <div className={style.Editdiv1}>

                                        <span className={style.box1}>
                                            <Field name="NewTypeName"
                                                component={Input}
                                                label="Room Type"
                                                type="text"

                                                width="13vw" />
                                            <ErrorMessage name="TypeName" component="span" className={style.error} />
                                        </span>

                                        <span className={style.box1}>
                                            <Field name="View"
                                                component={Input}
                                                label="View"
                                                type="select"
                                                options={view}

                                                className={style.inputOne}
                                                width="13vw" />
                                            <ErrorMessage name="View" component="span" className={style.error} />
                                        </span>

                                        <span className={style.box1}>
                                            <Field name="NoOfBeds"
                                                component={Input}
                                                label="No of Beds"
                                                type="text"

                                                width="13vw" />
                                            <ErrorMessage name="NoOfBeds" component="span" className={style.error} />
                                        </span>
                                        <span className={style.box1}>
                                            <Field name="sqFeet"
                                                component={Input}
                                                label="Square Feet(Sqft)"
                                                type="text"

                                                width="13vw" />
                                            <ErrorMessage name="sqFeet" component="span" className={style.error} />
                                        </span>

                                        <span className={style.box1}>
                                            <Field name="StandardCharge"
                                                component={Input}
                                                label="Standard Charge($)"
                                                type="text"

                                                width="13vw" />
                                            <ErrorMessage name="StandardCharge" component="span" className={style.error} />
                                        </span>

                                    </div>

                                    <div className={style.Editdiv2}>

                                        <Field name="AddInfo"
                                            component={Input}
                                            label="Additional Information"
                                            type="textarea"
                                            rows="3"
                                            cols="70" />

                                    </div>


                                    <div className={style.confirmBtnCont}>
                                        <button type='button' className={`${style.editBtn} ${style.cancelBtn}`} onClick={() => { handleEdit(formik.values, false) }}>Cancel</button>
                                        <button type='button' className={`${style.editBtn} ${style.confirmBtn}`} onClick={() => { handleEdit(formik.values, true) }}>Confirm</button>
                                    </div>



                                </Form>
                            )}

                        </Formik>


                    </div>
                </> :
                <span>
                    <>
                        <div className={style.confirmModal}>
                            <Exclamation className={style.exclamation} />
                            <span className={`${style.confirmHeading} ${style.success}`}>Error!</span>
                            <span className={style.confirmBody}> This Room Type cannot be edited since it is associated with one or more reservations</span>
                            <button className={`${style.Btn} ${style.doneBtn}`}>Ok</button>
                        </div>
                    </>
                </span>


            }
        </>


    )
}

export default EditType;