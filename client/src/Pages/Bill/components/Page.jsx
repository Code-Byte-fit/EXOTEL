import React, { useState, useEffect } from 'react';
import logo from '../../../Assets/Logos/logo(2).png';
import style from "../components/Page.module.css";
import axios from 'axios';

export default function Page() {
  const [tableData, setTableData] = useState([]);
  const searchParams = new URLSearchParams(window.location.search);
  const reservationNumber = searchParams.get("reservationNumber");
  const checkOutDate = searchParams.get("checkOutDate");
  const checkInDate = searchParams.get("checkInDate");
  const baseValue = parseFloat(searchParams.get("baseValue")) || 0;
  const minibarTotal = parseFloat(searchParams.get("minibarTotal")) || 0;
  const laundryTotal = parseFloat(searchParams.get("laundryTotal")) || 0;
  const total = parseFloat(searchParams.get("total")) || 0;
  const handleButton = (id)=>{
    
    axios.post(`http://localhost:3001/payment/confirm/${id}`)
  }

  useEffect(() => {
    const serviceCharge = total * 0.02;
    const tax = total * 0.1;
    const grossAmount = total + serviceCharge + tax;

  
    const transformedData = [
      { description: 'Base Value', price: baseValue },
      { description: 'Minibar Restock Charge', price: minibarTotal },
      { description: 'Laundry Charge', price: laundryTotal },
      { description: 'Sub Total', price: total },
      { description: 'Service Charge', price: serviceCharge },
      { description: 'Tax', price: tax }, 
      { description: 'Gross Amount', price: grossAmount },
    ];
  
    setTableData(transformedData);
  }, [baseValue, minibarTotal, laundryTotal, total]);

  const today = new Date();
  const formattedDate = today.toLocaleDateString();

  return (
    <>
      <div className={style.area}>
        <div className={style.cont}>
          <img src={logo} height={70} width={100} className={style.logo} />
          <h1 className={style.h1size}>Invoice</h1>
          <h6 className={style.h6size}>Date: {formattedDate}</h6>
          <h6 className={style.h6size}>Reservation Number: {reservationNumber}</h6>
          <h6 className={style.h6size}>Check In Date: {checkInDate}</h6>
          <h6 className={style.h6size}>Check Out Date: {checkOutDate}</h6>
        </div>

        <div className={style.tble}>
          <table className={style.tablecont}>
            <thead>
              <tr>
                <th className={style.heading1}>Description</th>
                <th className={style.heading2}>Sub Total</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td className={style.heading1}>{row.description}</td>
                  <td className={style.heading2}>{row.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className={style.buttonProcess}
        onClick={()=>{handleButton(reservationNumber)}}
        >Confirm</button>
      </div>
    </>
  );
}
