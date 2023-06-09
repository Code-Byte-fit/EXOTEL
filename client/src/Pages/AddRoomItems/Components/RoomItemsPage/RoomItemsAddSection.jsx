import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./RoomItemsStyle.module.css";
import Input from "../../../General/Inputs/Inputs";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// const roomTypeOptions = ["single", "double", "suite"];

const RoomItemsAddSection = ({ taskToEdit, onRefresh }) => {
  const initialValues = {};

  const validationSchema = Yup.object().shape({
    // roomTypes: Yup.array().min(1, "Please select at least one room type"),
  });

  const makeReq = async (formData) => {
    await axios.post("http://localhost:3001/roomItems/", formData);
    onRefresh();
  };

  const onSubmit = (data) => {
    makeReq(data);
  };

  useEffect(() => {}, []);

  return (
    <div className={style.divAddItemsSection}>
      <div className={style.divTitleAddItems}>ADD ROOM ITEMS</div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
          <Form>
            <div className={style.divFormRow1}>
              <div className={style.divInputField1}>
                <Field
                  name="RoomItemNo"
                  type="text"
                  component={Input}
                  label="Room Item ID"
                  width="17vw"
                />
                <ErrorMessage
                  name="RoomItemNo"
                  component="div"
                  className={style.error}
                />
              </div>
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
            {/* <div className={style.divFormRow2}>
              <fieldset>
                <legend className={style.formLegend}>Room Types</legend>
                {roomType.map((type) => (
                  <label key={type} style={{ margin: "0 0.5rem" }}>
                    <Field
                      type="checkbox"
                      name="roomTypes"
                      value={type}
                      style={{ margin: "0 0.5rem" }}
                    />
                    {type.charAt(0).toUpperCase() + type.slice(1)} Room
                  </label>
                ))}
                <ErrorMessage
                  name="roomTypes"
                  component="div"
                  className={style.error}
                />
              </fieldset>
            </div> */}
            <div className={style.divFormRow3}>
              <input
                type="submit"
                className={style.btnAddToList}
                value="Add Item"
                // disabled={isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RoomItemsAddSection;
