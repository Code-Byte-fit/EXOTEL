import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import style from "./RoomItemsStyle.module.css";
import Input from "../../../General/Inputs/Inputs";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AppContext } from "../../../../Helpers/AppContext";

// const roomTypeOptions = ["single", "double", "suite"];

const RoomItemsAddSection = ({ onRefresh }) => {
  const { host } = useContext(AppContext);
  const initialValues = {
    RoomItemName: "",
    Cost: "",
  };

  const [initValues, setInitValues] = useState(initialValues);

  useEffect(() => {}, [initValues]);

  const makeReq = async (formData) => {
    // console.log(formData);
    await axios.post(`${host}/roomItems`, formData);
    onRefresh();
    setInitValues(initialValues);
  };

  const onSubmit = (data) => {
    makeReq(data);
  };

  const validationSchema = Yup.object().shape({
    RoomItemName: Yup.string().required("Required"),
    Cost: Yup.number().required("Required"),
  });

  return (
    <div className={style.divAddItemsSection}>
      <div className={style.divTitleAddItems}>ADD ROOM ITEMS</div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values }) => (
          <Form>
            <div className={style.divFormRow1}>
              <div className={style.divInputField2}>
                <Field
                  name="RoomItemName"
                  type="text"
                  component={Input}
                  label="Room Item"
                  width="35vw"
                />
                <ErrorMessage
                  name="RoomItemName"
                  component="div"
                  className={style.error}
                />
              </div>
              <div className={style.divInputField3}>
                <Field
                  name="Cost"
                  type="text"
                  component={Input}
                  label="Cost"
                  width="35vw"
                />
                <ErrorMessage
                  name="Cost"
                  component="div"
                  className={style.error}
                />
              </div>
            </div>
            <div className={style.divFormRow3}>
              <input
                type="submit"
                className={style.btnAddToList}
                value="Add Item"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RoomItemsAddSection;
