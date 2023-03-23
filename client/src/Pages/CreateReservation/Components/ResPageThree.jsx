import React from 'react'
import {Formik,Form} from "formik"
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
                                        <span className={style.nights}>{differenceInDays(new Date(props.data.CheckOut), new Date(props.data.CheckIn)).toString().padStart(2, '0')}</span>
                                    </div>
                                    <div>
                                        <span className={style.detailsLabel}>Reservation Date</span>
                                        <span>{props.data.CheckIn}</span>
                                    </div>
                                    <div>
                                        <span className={style.detailsLabel}>Source</span>
                                        <span>{props.data.Source}</span>
                                    </div>
                                </div>

                                <div className={style.DetailsContainer}>
                                    <div className={style.otherDetailsContainer}>
                                        <span className={`${style.line} ${style.lineOne}`}></span>
                                        <div className={style.innerOtherDetailsContainer}>
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
                                                    <span>{props.data.ArrivalTime}</span>
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
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                        <span></span>
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
