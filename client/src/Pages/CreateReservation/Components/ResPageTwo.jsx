import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Input from "../../General/Inputs/Inputs";
import { FileInput } from "../../General/Inputs/Inputs";
import uploadIcon from "../../../Assets/Images/Upload.png";
import style from "./Style.module.css";

export default function ResPageTwo(props) {
  const schema = yup.object().shape({
    Source: yup.string().required("required"),
    FirstName: yup.string().required("required"),
    LastName: yup.string().required("required"),
    Country: yup.string().required("required"),
    Email: yup.string().email("Invalid email").required("required"),
    PhoneNumber: yup
      .string()
      .required("required")
      .matches(/^[+]?\d{10,14}$/, "Invalid phone number"),
  });

  const handleSubmit = (values) => {
    props.next(values);
  };

  useEffect(() => {
    console.log(props.data);
  }, []);

  const Sources = [
    { key: "None Selected", value: "" },
    { key: "Phone", value: "Phone" },
    { key: "Walk-In", value: "Walk-In" },
  ];
  return (
    <>
      <Formik
        initialValues={props.data}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({ values }) => (
          <Form>
            <div className={style.formContainer}>
              <div>
                <div className={style.heading}>RESERVATION DETAILS</div>
                <div className={style.inputContainer}>
                  <span className={style.innerinputContainer}>
                    <Field
                      name="Source"
                      component={Input}
                      label="Source"
                      type="select"
                      options={Sources}
                    />
                    <ErrorMessage
                      name="Source"
                      component="small"
                      className={style.errorMsg}
                    />
                  </span>
                </div>
              </div>
              <div>
                <div className={style.heading}>MAIN GUEST</div>
                <div className={style.inputContainer}>
                  <span className={style.innerinputContainer}>
                    <Field
                      name="FirstName"
                      component={Input}
                      label="First-Name"
                      type="text"
                    />
                    <ErrorMessage
                      name="FirstName"
                      component="small"
                      className={style.errorMsg}
                    />
                  </span>
                  <span className={style.innerinputContainer}>
                    <Field
                      name="LastName"
                      component={Input}
                      label="Last-Name"
                      type="text"
                    />
                    <ErrorMessage
                      name="LastName"
                      component="small"
                      className={style.errorMsg}
                    />
                  </span>
                  <span className={style.innerinputContainer}>
                    <Field
                      name="Country"
                      component={Input}
                      label="Country"
                      type="text"
                    />
                    <ErrorMessage
                      name="Country"
                      component="small"
                      className={style.errorMsg}
                    />
                  </span>
                </div>
              </div>
              <div className={style.inputContainer}>
                <span className={style.innerinputContainer}>
                  <Field
                    name="Email"
                    component={Input}
                    label="Email"
                    type="text"
                    id="Email"
                  />
                  <ErrorMessage
                    name="Email"
                    component="small"
                    className={style.errorMsg}
                  />
                </span>
                <span className={style.innerinputContainer}>
                  <Field
                    name="PhoneNumber"
                    component={Input}
                    label="Phone Number"
                    type="text"
                  />
                  <ErrorMessage
                    name="PhoneNumber"
                    component="small"
                    className={style.errorMsg}
                  />
                </span>
              </div>

              <div>
                <div className={style.heading}>IDENTIFICATION</div>
                <Field
                  name="Identification"
                  component={FileInput}
                  label="Upload Identification"
                  id="Identification"
                  img={uploadIcon}
                />
              </div>
              <div className={style.btnContainer}>
                <button
                  type="button"
                  onClick={() => props.prev(values)}
                  className={style.Btn}
                >
                  Back
                </button>
                <button type="submit" className={style.Btn}>
                  Proceed
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
