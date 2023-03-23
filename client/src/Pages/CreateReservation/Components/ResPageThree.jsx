import React from 'react'
import {Formik,Form, Field} from "formik"
import { differenceInDays } from 'date-fns';
import ConfirmReservation from './ConfirmReservation';
import style from "./Style.module.css"

export default function ResPageThree(props) {
    const handleSubmit=(values)=>{
        props.next(values,true)
      }

      const handleConfirm = () => {
        handleSubmit(props.data);
      };

      console.log(props.data.SelectedRooms)

      const nights=differenceInDays(new Date(props.data.CheckOut), new Date(props.data.CheckIn))
  return (
    <>
     <Formik initialValues={props.data} onSubmit={handleSubmit}>
                {({values})=>(
                  <Form>
                        <div className={style.mainDetailsContainer}>
                                <span>RESERVATIONS SUMMARY</span>
                                <div className={style.topDetailsContainer}>
                                    <div>
                                        <span className={style.detailsLabel}>Check-In</span>
                                        <span>{props.data.CheckIn}</span>
                                    </div>
                                    <div>
                                        <span className={style.detailsLabel}>Check-Out</span>
                                        <span>{props.data.CheckOut}</span>
                                    </div>
                                    <div>
                                        <span className={style.detailsLabel}>Nights</span>
                                        <span className={style.nights}>{nights>0?nights.toString().padStart(2, '0'):"-"}</span>
                                    </div>
                                    <div>
                                        <span className={style.detailsLabel}>Reservation Date</span>
                                        <span>{new Date().toISOString().slice(0, 10)}</span>
                                    </div>
                                    <div>
                                        <span className={style.detailsLabel}>Booking Method</span>
                                        <span>{props.data.Source}</span>
                                    </div>
                                </div>

                                <div className={style.DetailsContainer}>
                                    <div className={style.otherDetailsContainer}>
                                        <span className={`${style.line} ${style.lineOne}`}></span>
                                        <div className={style.innerDetailsContainer}>
                                            <div className={style.innerContainer}>  
                                                <div className={style.detailsLabelContainer}>
                                                    <span className={style.label}>Guest:</span>
                                                    <span>{props.data.FirstName}</span>
                                                </div>
                                                <div className={style.detailsLabelContainer}>
                                                    <span className={style.label}>Email:</span>
                                                    <span>{props.data.Email}</span>
                                                </div>
                                                <div className={style.detailsLabelContainer}>
                                                    <span className={style.label}>Phone:</span>
                                                    <span>{props.data.PhoneNumber}</span>
                                                </div>
                                                <div className={style.detailsLabelContainer}>
                                                    <span className={style.label}>Country:</span>
                                                    <span>{props.data.Country}</span>
                                                </div>
                                                <div className={style.detailsLabelContainer}>
                                                    <span className={style.label}>Arrival Time:</span>
                                                    <span>{props.data.CheckInTime}</span>
                                                </div>
                                            </div>
                                            <div className={style.roomsContainer}>
                                                <div className={style.detailsLabelContainer}>
                                                    <span className={style.label}>Rooms:</span>
                                                    {props.data.SelectedRooms.map((room) => (
                                                    <span key={room.RoomNo} className={style.room}>
                                                    {room.RoomNo}
                                                    </span>
                                                ))}
                                                </div>
                                            </div>
                                        
                                    </div>
                                    </div>
                                    <div className={style.financialDetailsContainer}>
                                        <span className={`${style.line} ${style.lineTwo}`}></span>
                                        <div className={style.innerDetailsContainer}>
                                            <div className={style.innerContainer}>  
                                                        <div className={style.Financedetails}>
                                                            <span className={style.label}>Sub-Total : </span>
                                                            <span>${props.amounts.subTotal}</span>
                                                        </div>
                                                        <div className={style.Financedetails}>
                                                            <span className={style.label}>Discounts: </span>
                                                            <span>(${props.amounts.discounts})</span>
                                                        </div>
                                                        <span className={style.hr}></span>
                                                        <div className={style.Financedetails}>
                                                            <span className={style.label}>Grand-Total : </span>
                                                            <span>${props.amounts.GrandTotal}</span>
                                                        </div>
                                            </div>
                                    </div>
                                    </div>
                                    </div>
                                    <div className={style.btnContainer}>
                                        <button type="button" onClick={()=>props.prev(values)} className={style.Btn}>Back</button>
                                            <ConfirmReservation onConfirm={handleConfirm}/>    
                                    </div>
                        </div>
                        
                            
                            
                    </Form>
                  
                )}
      </Formik>
    </>
  )
}

