import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./RepairRequeststyle.module.css";
import Input from "../../General/Inputs/Inputs";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RepairRequestAddSection = ({ requestToEdit, onRefresh }) => {
  const initialValues = {
    RoomNo: "",
    RoomItemNo: "",
    DoneStatus: "",
    Notes: "",
  };

  const [roomNumbers, setRoomNumbers] = useState([]);
  const [items, setItems] = useState([]);
  const [initValues, setInitValues] = useState(initialValues);

  useEffect(() => {}, [initValues]);

  useEffect(() => {
    if (requestToEdit) {
      console.log(requestToEdit);
      const updatedValues = {
        RepairRequestNo: requestToEdit.RepairRequestNo,
        RoomNo: requestToEdit.RoomNo,
        RoomItemNo: requestToEdit.RoomItemNo,
        DoneStatus: requestToEdit.DoneStatus,
        Notes: requestToEdit.Notes,
      };
      setInitValues(updatedValues);
    }
    console.log(initValues);
  }, [requestToEdit]);

  //create request
  const makeReq = async (formData) => {
    // console.log(formData);
    await axios.post("http://localhost:3001/repairs/", formData);
    onRefresh();
  };

  //update request
  const updateReq = async (formData) => {
    await axios.put("http://localhost:3001/repairs/", formData);
    setInitValues(initialValues);
    onRefresh();
  };

  const onSubmit = (data) => {
    if (requestToEdit) {
      updateReq(data);
    } else {
      makeReq(data);
    }
  };

  async function viewRepairs() {
    try {
      const response = await axios.get(
        "http://localhost:3001/repairs/repairItemDetails"
      );

      const room = response.data.roomDetails.map((value) => {
        return {
          key: value.RoomNo,
          value: value.RoomNo,
        };
      });

      const item = response.data.itemDetails.map((value) => {
        return {
          key: `${value.roomItemNo} - ${value.RoomItemName}`,
          value: value.roomItemNo,
        };
      });

      setItems(item);
      setRoomNumbers(room);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    viewRepairs();
  }, []);

  const extraOption = { key: "None Selected", value: "" };
  const roomNumberOptions = [extraOption, ...roomNumbers];
  const itemOptions = [extraOption, ...items];
  const statusOptions = [
    extraOption,
    { key: "Waiting", value: "Waiting" },
    { key: "Done", value: "Done" },
  ];

  const validationSchema = Yup.object().shape({
    RoomNo: Yup.string().required("Required"),
    RoomItemNo: Yup.string().required("Required"),
    Notes: Yup.string(),
  });

  return (
    <div className={style.divAddTaskSection}>
      <div className={style.divTitleAddTask}>ADD REPAIR REQUESTS</div>
      <Formik
        initialValues={initValues}
        enableReinitialize={true}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ values }) => (
          <Form>
            <div>
              <div className={style.divInputRow1}>
                <div className={style.labelRow1s}>
                  <Field
                    name="RoomNo"
                    component={Input}
                    label="Room Number"
                    type="select"
                    options={roomNumberOptions}
                    style={{ width: "17.2vw" }}
                  />
                  <ErrorMessage
                    name="RoomNo"
                    component="div"
                    className={style.error}
                  />
                </div>
                <div
                  className={style.labelRow1s}
                  style={{ marginLeft: "0.5vw" }}
                >
                  <Field
                    name="RoomItemNo"
                    component={Input}
                    label="Room Item"
                    type="select"
                    options={itemOptions}
                    style={{ width: "17.2vw" }}
                  />
                  <ErrorMessage
                    name="RoomItemNo"
                    component="div"
                    className={style.error}
                  />
                </div>
                <div
                  className={style.labelRow1s}
                  style={{ marginLeft: "0.5vw" }}
                >
                  <Field
                    name="DoneStatus"
                    component={Input}
                    label="Status"
                    type="select"
                    options={statusOptions}
                    style={{ width: "17.2vw" }}
                  />
                  <ErrorMessage
                    name="DoneStatus"
                    component="div"
                    className={style.error}
                  />
                </div>
              </div>
              <div className={style.divInputRow2}>
                <Field
                  name="Notes"
                  component={Input}
                  label="Special Notes"
                  type="textarea"
                  style={{ width: "88vw", height: "10vh", resize: "none" }}
                />
              </div>
              <div className={style.divBtnAddToList}>
                <input
                  type="submit"
                  className={style.btnAddToList}
                  value="Add to List"
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RepairRequestAddSection;
