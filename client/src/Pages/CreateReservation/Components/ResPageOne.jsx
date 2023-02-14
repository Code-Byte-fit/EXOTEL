import React, { useEffect, useState} from 'react'
import {Formik,Form,Field} from "formik"
import axios from 'axios'
import Input from "../../General/Inputs/Inputs"
import searchIcon from "../../../Assets/Images/Search.png"
import addIcon from "../../../Assets/Images/Add small.png"
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./Style.module.css"



export default function ResPageOne(props) {
 
 
  const handleSubmit=(values)=>{
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



const [AvailableRooms,setAvailableRooms]=useState([])
const [SelectedRooms,setSelectedRooms]=useState([])

const reqRoom=async () => {
  const response = await axios.get(`http://localhost:3001/rooms/availablity/${dates.CheckIn}/${dates.CheckOut}`);
  setAvailableRooms(response.data);
};




  return (
    <>
      <Formik initialValues={props.data} onSubmit={handleSubmit} >
              {()=>(
                <Form>
                      <div className={style.container}>
                          <div className={style.topContainer}>
                                <div className={style.topLeftContainer}>
                                    <Field name="RoomType" component={Input} label="Room Type" type="select" options={RoomTypes}/>
                                    <Field name="Package" component={Input} label="Package" type="select" options={Pacakge}/>
                                    <Field name="PromoCode" component={Input} label="Promo-Code" type="text" />
                                </div>
                                <div className={style.topRightContainer}>
                                     <Field name="CheckIn" component={Input} label="Check-In" type="date" onBlur={getDates}/>
                                     <Field name="CheckOut" component={Input} label="Check-Out" type="date" onBlur={getDates}/>
                                     <button  type="button" onClick={reqRoom}><img src={searchIcon}/></button>
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
                                  <th>Check-in</th>
                                  <th>Check-out</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody >
                                    {AvailableRooms.map((room) => (
                                      <tr key={room.RoomNo}>
                                        <td>{room.RoomNo}</td>
                                        <td>{room.Status}</td>
                                        <td>{room.checkIn}</td>
                                        <td>{room.checkOut}</td>
                                        <td><button type="button" className={style.add}><img src={addIcon}/></button></td>
                                      </tr>
                                    ))}
        </tbody>
      </table>
      ) : (
        <p className="mt-3">No rooms available for the selected dates.</p>
      )}
                          </div>
                          </div>
                          </div>
                        <button type="submit" className={style.proceedBtn}>Proceed</button>
                        </div>
              </Form>
              )}
      </Formik>    
    </>
  )
}
