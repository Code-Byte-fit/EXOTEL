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
  const [listOfPayments, setListOfPayments] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:3001/payment/confirm").then((response) => {
      setListOfPayments(response.data);
    });

    axios.get("http://localhost:3001/payment/duePayment").then((response) => {
      setListOfPayments(response.data);
    });

    axios.get("http://localhost:3001/reservations").then((response) => {
      const checkedInReservations = response.data.filter(
        (reservation) => reservation.ReservationStatus === "Checked-In"
      );
      setListOfReservations(checkedInReservations);
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
    
    // Calculate the total value by adding baseValue, minibarTotal, and laundryTotal
    const total = baseValue + minibarTotal + laundryTotal;
    
    const checkOutDate = reservation ? reservation.CheckOut : '';
    const checkInDate = reservation ? reservation.CheckIn : '';
    const serviceCharge = total * 0.02;
  
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
  console.log(listOfReservations)

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
        selector: (row) => row.totalAmount,
        sortable: true,
      },
    
      {
  name: "Minibar",
  selector: (row) => {
    const payment = listOfPayments.find(
      (payment) => payment.ReservationId === row.id
    );
    return payment ? payment.TotalMinibar : 0;
  },
  sortable: true,
},
{
  name: "Laundry",
  selector: (row) => {
    const payment = listOfPayments.find(
      (payment) => payment.ReservationId === row.id
    );
    return payment ? payment.TotalLaundry : 0;
  },
  sortable: true,
},

      {
        name: "Total",
        selector: (row) => {
          const payment = listOfPayments.find((payment) => payment.ReservationId === row.id);
          return payment ? payment.PaymentAmount : 0;
        },
        sortable: true,
      },
    
      {
        name: "Action",
        selector: (row) => row.id,
        cell: (row) => (
          <Link to="/Bill">
            {row.totalAmount !== 0 && ( // Conditionally render the button
              <button
                className={style.buttonProcess}
                onClick={() => handleProcessClick(row.id)}
              >
                Process
              </button>
            )}
          </Link>
        ),
      },
    ];

  const columnsR = [
    
    {
      name: "Res Number",
      selector: "ReservationId",
      sortable: true,
    },
    
    {
      name: "Amount",
      selector: "grossAmount",
      sortable: true,
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
            columns={isLeftActive ? columnsL : columnsR}
            data={isLeftActive ? listOfReservations : listOfPayments}
            height="55vh"
            />

          </span>
        </div>
      </div>
    </>
  );
}
