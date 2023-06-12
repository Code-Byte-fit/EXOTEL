import React, { useState, useEffect } from "react";
import Table from "../../General/Table/Table";
import EditDelete from "../../General/Table/EditDelete";
import axios from "axios";
import { Link } from "react-router-dom";
import style from "../components/Payments.module.css";

export default function Button(props) {
  const [isLeftActive, setIsLeftActive] = useState(true);
  const [columns, setColumns] = useState([]);
  const [listOfReservations, setListOfReservations] = useState([]);
  const [selectedReservationNumber, setSelectedReservationNumber] = useState(null);
  const [listOfPayments, setListOfPayments] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:3001/reservations").then((response) => {
      setListOfReservations(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/payment/duePayment").then((response) => {
      setListOfPayments(response.data);
    });
  }, []);
  

  const handleLeftClick = () => {
    setIsLeftActive(true);
    setColumns(columnsL);
  };

  const handleRightClick = () => {
    setIsLeftActive(false);
    setColumns(columnsR);
  };

  const handleProcessClick = (reservationNumber) => {
    const reservation = listOfReservations.find(
      (reservation) => reservation.id === reservationNumber
    );
    const payment = listOfPayments.find(
      (payment) => payment.ReservationId === reservationNumber
    );
    
    const baseValue = reservation ? reservation.totalAmount : 0;
    const minibarTotal = payment ? payment.TotalMinibar : 0;
    const laundryTotal = payment ? payment.TotalLaundry : 0;
    const total = payment ? payment.PaymentAmount : 0;
    const checkOutDate = reservation ? reservation.CheckOut : '';
    const checkInDate = reservation ? reservation.CheckIn : '';
  
    const serviceCharge = (total) * 0.02;
  
    const data = {
        reservationNumber,
        baseValue,
        minibarTotal,
        laundryTotal,
        total,
        serviceCharge,
        checkOutDate,
        checkInDate,
      };
    
      const params = new URLSearchParams(data).toString();
      window.location.href = `/Bill?${params}`;
    };
  
  useEffect(() => {
    handleLeftClick(); 
  }, [listOfReservations]);

  const columnsL = [
    {
      name: "Res number",
      selector: "id",
      sortable: true,
    },
    {
      name: "First name",
      selector: (row) => {
        const reservation = listOfReservations.find(
          (reservation) => reservation.id === row.id
        );
        if (reservation && reservation.Guest && reservation.Guest.FirstName) {
          return reservation.Guest.FirstName;
        }
        return "";
      },
      sortable: true,
    },
    {
        name: "Check in",
        selector: "CheckIn",
        sortable: true,
      },
    {
      name: "Check out",
      selector: "CheckOut",
      sortable: true,
    },
    
    {
        name: "Base value",
        selector: (row) => {
          const reservation = listOfReservations.find(
            (reservation) => reservation.id === row.id
          );
          return reservation ? reservation.totalAmount : "";
        },
        sortable: true,
      },
    
      {
        name: "Minibar",
        selector: (row) => {
          const payment = listOfPayments.find((payment) => payment.ReservationId === row.id);
          return payment ? payment.TotalMinibar : "";
        },
        sortable: true,
      },
      {
        name: "Laundry",
        selector: (row) => {
          const payment = listOfPayments.find((payment) => payment.ReservationId === row.id);
          return payment ? payment.TotalLaundry : "";
        },
        sortable: true,
      },
      {
        name: "Total",
        selector: (row) => {
          const payment = listOfPayments.find((payment) => payment.ReservationId === row.id);
          return payment ? payment.PaymentAmount : "";
        },
        sortable: true,
      },
    
    {
      name: "Action",
      selector: (row) => row.id,
      cell: (row) => (
        <Link to="/Bill">
          <button
            className={style.buttonProcess}
            onClick={() => handleProcessClick(row.id)}
          >
            Process
          </button>
        </Link>
      ),
    },
  ];

  const columnsR = [
    {
      name: "Res Number",
      selector: "restId",
      sortable: true,
    },
    {
      name: "Amount",
      selector: "grossAmount",
      sortable: true,
    },
    {
      selector: (row) => row,
      cell: (row) => <EditDelete />,
    },
  ];

  return (
    <>
      <div className={style.comb}>
        <div className={style["button-container"]}>
          <button
            className={`${style["left-button"]} ${
              isLeftActive ? style.active : ""
            }`}
            onClick={handleLeftClick}
            disabled={isLeftActive}
          >
            Due
          </button>
          <button
            className={`${style["right-button"]} ${
              !isLeftActive ? style.active : ""
            }`}
            onClick={handleRightClick}
            disabled={!isLeftActive}
          >
            Payments
          </button>
        </div>

        <div className={style.tbl}>
          <span className={style.div3}>
          <Table
            columns={columns}
            data={isLeftActive ? listOfReservations : listOfPayments}
            height="35vh"
            />

          </span>
        </div>
      </div>
    </>
  );
}
