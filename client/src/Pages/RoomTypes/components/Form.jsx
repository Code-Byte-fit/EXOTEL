import React, { useState } from 'react';
import { useEffect } from 'react';
import Input from "../../General/Inputs/Inputs";
import style from "./Types.module.css";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';


function FormOne(props) {
   
    const [RoomTypes, setRoomTypes] = useState([]);

    const initialValues = {
        RoomTypeID: '',
        TypeName: '',
        View: '',
        NoOfBeds: '',
        sqFeet: '',
        StandardCharge: '',
        MiniBarPack:'',
        AddInfo: ''
    };
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
        //  MiniBarPack:Yup.string().required('Required'),
        AddInfo: Yup.string(),
    });

    const view = [{ key: "--None Selected --", value: "" },
     { key: "Beach View", value: "Beach View" }, 
     { key: "Pool View", value: "Pool View" }, 
     { key: "Graden View", value: "Graden View" },
      { key: "Patio View", value: "Patio View" }, 
      { key: "City View", value: "City View" }]

    const handleSubmit = (values, { resetForm }) => {
        props.makeReq(values);
        resetForm({ values: initialValues });
    };

    const fetchRoomTypes = async () => {
        const response = await axios.get("http://localhost:3001/roomtypes");
        setRoomTypes(response.data);
    }

    useEffect(() => {
        fetchRoomTypes();
    }, []);


    return (
        <span className={style.formContainer}>
            <label className={style.labelOne}>Create Room Type</label>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
              
                    <Form>

                        <div className={style.div1}>

                            <span className={style.box}>
                                <Field name="TypeName"
                                    component={Input}
                                    label="Room Type"
                                    type="text"

                                    width="13vw" />
                                <ErrorMessage name="TypeName" component="span" className={style.error} />
                            </span>

                            <span className={style.box}>
                                <Field name="View"
                                    component={Input}
                                    label="View"
                                    type="select"
                                    options={view}

                                    className={style.inputOne}
                                    width="13vw" />
                                <ErrorMessage name="View" component="span" className={style.error} />
                            </span>

                            <span className={style.box}>
                                <Field name="NoOfBeds"
                                    component={Input}
                                    label="No of Beds"
                                    type="text"

                                    width="13vw" />
                                <ErrorMessage name="NoOfBeds" component="span" className={style.error} />
                            </span>
                            <span className={style.box}>
                                <Field name="sqFeet"
                                    component={Input}
                                    label="Square Feet(Sqft)"
                                    type="text"

                                    width="13vw" />
                                <ErrorMessage name="sqFeet" component="span" className={style.error} />
                            </span>

                            <span className={style.box}>
                                <Field name="StandardCharge"
                                    component={Input}
                                    label="Standard Charge($)"
                                    type="text"

                                    width="13vw" />
                                <ErrorMessage name="StandardCharge" component="span" className={style.error} />
                            </span>
                               
                            {/* <span className={style.box}>
                            <Field
                                name="RoomTypeView"
                                component={Input}
                                label="Room Type"
                                type="select"
                                options={[
                                    { key: "--None Selected --", value: "" },
                                    ...RoomTypes.map(roomType => ({
                                        key: `${roomType.TypeName}-${roomType.View}`,
                                        value: `${roomType.TypeName}-${roomType.View}`
                                    }))
                                ]}
                                width="13vw"
                            />

                            <ErrorMessage name="RoomTypeView" component="span" className={style.error} />
                        </span> */}

                        </div>

                        <div className={style.div2}>

                            <Field name="AddInfo"
                                component={Input}
                                label="Additional Information"
                                type="textarea"
                                rows="4"
                                cols="150" />
                            <div className={style.cardContainer}>
                                <div className={style.card}>

                                </div>
                                <div className={style.card}>

                                </div>
                                <div className={style.card}>

                                </div>
                            </div>

                        </div>


                        <span className={style.createBtn}>
                            <button className={style.buttonOne} type="submit">Create Room Type</button>

                        </span>



                    </Form>
               
            </Formik>


        </span>
    )
}

export default FormOne;