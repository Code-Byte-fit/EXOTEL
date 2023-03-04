import React, { useEffect, useState} from 'react'
import {Formik,Form,Field} from "formik"
import axios from 'axios'
import * as yup from 'yup';
import Input from "../../General/Inputs/Inputs"
import searchIcon from "../../../Assets/Images/Search.png"
import addIcon from "../../../Assets/Images/Add small.png"
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./Style.module.css"



export default function ResPageOne(props) {
  
 
 
  const handleSubmit=(values)=>{
    values.AvailableRooms=AvailableRooms;
    values.SelectedRooms=SelectedRooms;
    props.next(values)
  }


  const RoomTypes = [
    { key: 'None Selected', value: '' },
    { key: 'Kings', value: 'Kings' },
    { key: 'Queens', value: 'Queens' },
]

const Pacakge = [
  { key: 'None Selected', value: '' },
  { key: 'Full-Board', value: 'Full-Board' },
  { key: 'Half-Board', value: 'Half-Board' },
]

const [dates,setDates]=useState({CheckIn:null,CheckOut:null})

const getDates=(event)=>{
  const {value,name}=event.target;
    setDates(prevValue=>{
      if(name==="CheckIn"){
        return{
          CheckIn:value,
          CheckOut:prevValue.CheckOut
        };
      } else if(name==="CheckOut"){
        return{
          CheckIn:prevValue.CheckIn,
          CheckOut:value
        };
      } 
    })
}



const [AvailableRooms,setAvailableRooms]=useState(props.data.AvailableRooms)
const [SelectedRooms,setSelectedRooms]=useState(props.data.SelectedRooms)

const reqRoom=async () => {
  if(dates.CheckIn && dates.CheckOut){
  const response = await axios.get(`http://localhost:3001/rooms/availablity/${dates.CheckIn}/${dates.CheckOut}`);
  setAvailableRooms(response.data);
  setSelectedRooms([])
  }};

const selectRoom=(RoomNo)=>{
  setSelectedRooms([...SelectedRooms,RoomNo])
  setAvailableRooms(AvailableRooms.filter(room => room.RoomNo !== RoomNo));
  console.log(AvailableRooms)
}




  return (
    <>
      <Formik initialValues={props.data} onSubmit={handleSubmit} >
              {(formik)=>(
                <Form>
                      <div className={style.container}>
                          <div className={style.topContainer}>
                                <div className={style.topLeftContainer}>
                                    <Field name="RoomType" component={Input} label="Room Type" type="select" options={RoomTypes} id="RoomType"/>
                                    <Field name="Package" component={Input} label="Package" type="select" options={Pacakge} id="Package"/>
                                    <Field name="PromoCode" component={Input} label="Promo-Code" type="text" id="promoCode"/>
                                </div>
                                <div className={style.topRightContainer}>
                                     <Field name="CheckIn" component={Input} label="Check-In" type="date" onBlur={getDates} id="CheckIn"/>
                                     <Field name="CheckOut" component={Input} label="Check-Out" type="date" onBlur={getDates} id="CheckOut"/>
                                     <button  type="button" onClick={reqRoom} ><img src={searchIcon}/></button>
                                </div>
                          </div>
                        <div className={style.middleContainer}>
                          <div>
                              <div className={style.Available}>Available</div>
                              <div class={`table-responsive ${style.tableContainer}`}>
                                  {AvailableRooms.length > 0 ? (
                                  <table className="table mt-3">
                                    <thead>
                                      <tr>
                                        <th>Room No</th>
                                        <th>Status</th>
                                        <th></th>
                                      </tr>
                                    </thead>
                                    <tbody >
                                          {AvailableRooms.map((room) => (
                                            <tr key={room.RoomNo}>
                                              <td>{room.RoomNo}</td>
                                              <td>{room.Status}</td>
                                              <td><button type="button" onClick={() => selectRoom(room.RoomNo)} className={style.add}><img src={addIcon}/></button></td>
                                            </tr>
                                          ))}
                                    </tbody>
                                  </table>
                                 ) : (
                                    <p className="mt-3">No rooms available for the selected dates.</p>
                                  )}
                            </div>
                          </div>
                          <div>
                              <div className={style.Selected}>Selected</div>
                              <div class={`table-responsive ${style.selectedContainer}`}>
                                  <table className="table mt-3">
                                  <thead>
                                    <tr>
                                    <th>Room No</th> 
                                    </tr>
                                  </thead>
                                    <tbody >
                                    {SelectedRooms.map((room) => (
                                            <tr key={room}>
                                              <td>{room}</td>
                                            </tr>
                                          ))}
                                    </tbody>
                                  </table>
                            </div>
                          </div>
                        </div>
                        {SelectedRooms.length>0 ? <button type="submit" className={style.Btn}>Proceed</button>:<button type="submit" className={style.hidden}>Proceed</button>}
                      </div>
              </Form>
              )}
      </Formik>    
    </>
  )
}
