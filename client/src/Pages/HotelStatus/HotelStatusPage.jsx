import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import style from "./HKstyle.module.css";
import Input from "../General/Inputs/Inputs";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AppContext } from "../../Helpers/AppContext";
import Table from "../General/Table/Table";
import Spinner from "../General/Spinner/Spinner";

const HotelStatusPage = () => {
  const { host } = useContext(AppContext);
  const curr = new Date();
  const date = curr.toISOString().substring(0, 10);
  const time = curr.toTimeString().substring(0, 5);

  const [reservations, setReservations] = useState([]);
  const [check, setCheck] = useState(false);
  const [changeDate, setChangeDate] = useState(null);

  //chnage new

  const initialValues = {
    startDate: date,
    endDate: date,
    startTime: time,
    endTime: time,
  };

  //   useEffect(() => {
  //     setLoading(true);
  //     axios.get(`${host}/hotelStatus`).then((res) => {
  //       //   console.log(res.data);
  //       setReservations(res.data);
  //       setLoading(false);
  //     });
  //   }, []);

  const [initValues, setInitValues] = useState(initialValues);

  useEffect(() => {}, [initValues]);

  const reqReservations = async (event) => {
    // event.preventDefault();
    if (event.startDate) {
      setChangeDate({ startDate: event.startDate, endDate: event.endDate });
      const response = await axios.get(
        `${host}/hotelStatus/conflictReservations/${event.startDate}/${event.endDate}`
      );
      setReservations(response.data);
    }
  };

  const handleSubmit = (values) => {
    setReservations([]);
    setCheck(true);
    reqReservations(values);
  };

  const changeStatus = async () => {
    console.log("hotel statusssssssss", changeDate);
    await axios.post(`${host}/hotelStatus`, changeDate);
  };

  //Form validations using Yup
  const validationSchema = Yup.object().shape({});

  const columns = [
    {
      name: "RESERVATION-ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "CHECK-IN-DATE",
      selector: (row) => row.CheckIn,
      sortable: true,
    },
    {
      name: "CHECK-IN-TIME",
      selector: (row) => row.CheckInTime,
      sortable: true,
    },
    {
      name: "CHECK-OUT-DATE",
      selector: (row) => row.CheckOut,
      sortable: true,
    },
    {
      name: "CHECK-OUT-TIME",
      selector: (row) => row.CheckOutTime,
      sortable: true,
    },
    {
      name: "GUEST",
      selector: (row) => row.Guest.FirstName,
      sortable: true,
    },
    // {
    //   name: "ROOM-NO",
    //   selector: (row) => row.Rooms.RoomNo,
    //   sortable: true,
    // },
  ];

  return (
    <div className={style.content}>
      <div className={style.divAddTaskSection}>
        <div className={style.divTitleAddTask}>HOTEL STATUS</div>
        <Formik
          initialValues={initValues}
          enableReinitialize={true}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ values }) => (
            <Form>
              {/* {loading && <Spinner loading={loading} />} */}

              <div className={style.divInputRow1}>
                <div className={style.labelRow1s}>
                  <Field
                    name="startDate"
                    component={Input}
                    label="Start Date"
                    type="date"
                    width="21.625vw"
                  />
                  <ErrorMessage
                    name="startDate"
                    component="div"
                    className={style.error}
                  />
                </div>
                <div
                  className={style.labelRow1s}
                  style={{ marginLeft: "0.5vw" }}
                >
                  {/* <Field
                    name="startTime"
                    component={Input}
                    label="Start Time"
                    type="time"
                    width="21.625vw"
                  />
                  <ErrorMessage
                    name="startTime"
                    component="div"
                    className={style.error}
                  /> */}
                </div>
                <div
                  className={style.labelRow1s}
                  style={{ marginLeft: "0.5vw" }}
                >
                  <Field
                    name="endDate"
                    component={Input}
                    label="End Date"
                    type="date"
                    width="21.625vw"
                  />
                  <ErrorMessage
                    name="endDate"
                    component="div"
                    className={style.error}
                  />
                </div>
                <div
                  className={style.labelRow1s}
                  style={{ marginLeft: "0.5vw" }}
                >
                  {/* <Field
                    name="endTime"
                    component={Input}
                    label="End Time"
                    type="time"
                    width="21.625vw"
                  />
                  <ErrorMessage
                    name="endTime"
                    component="div"
                    className={style.error}
                  /> */}
                </div>
              </div>

              <div className={style.divBtnAddToList}>
                <input
                  type="submit"
                  className={style.btnAddToList}
                  value="Check for Conflicts"
                  onClick={reqReservations}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className={style.divEditDeleteTableSection}>
        <div className={style.divTitleEditDelete}>OVERLAPPING RESERVATIONS</div>

        <div
          class="class=table-responsive-lg"
          className={style.divTblEditDelete}
        >
          <Table
            columns={columns}
            // data={getTaskList()}
            data={reservations}
            height="35vh"
            pagination
          />
        </div>

        {reservations && reservations.length === 0 && check && (
          <div className={style.divBtnAddToList}>
            <input
              type="button"
              className={style.btnAddToList}
              value="Change Status"
              onClick={changeStatus}
            />
          </div>
        )}

        {/* {!reservations || reservations === [] ? (
          <></>
        ) : (
          <div className={style.divBtnAddToList}>
            <input
              type="button"
              className={style.btnAddToList}
              value="Change Status"
              onClick={changeStatus}
            />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default HotelStatusPage;
