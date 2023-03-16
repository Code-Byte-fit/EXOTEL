import React, { useState} from 'react'
import {Formik,Form,Field} from "formik"
import axios from 'axios'
import Input from "../../General/Inputs/Inputs"
import searchIcon from "../../../Assets/Images/Search.png"
import addIcon from "../../../Assets/Images/Add small.png"
import deleteIcon from "../../../Assets/Images/remove (2).png"
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

const [dates,setDates]=useState({CheckIn:null,CheckOut:null,CheckInTime: null, CheckOutTime: null});

// const [dates,setDates]=useState({CheckIn:null,CheckOut:null})
// const getDates=(event)=>{
//   const {value,name}=event.target;
//     setDates(prevValue=>{
//       if(name==="CheckIn"){
//         return{
//           CheckIn:value,
//           CheckOut:prevValue.CheckOut
//         };
//       } else if(name==="CheckOut"){
//         return{
//           CheckIn:prevValue.CheckIn,
//           CheckOut:value
//         };
//       } 
//     })
// }

const getDates=(event)=>{
  const {value,name}=event.target;
    setDates(prevValue=>{
      if(name==="CheckIn"){
        return{
          CheckIn:value,
          CheckOut:prevValue.CheckOut,
          CheckInTime: prevValue.CheckInTime,
          CheckOutTime: prevValue.CheckOutTime
        };
      } else if(name==="CheckOut"){
        return{
          CheckIn:prevValue.CheckIn,
          CheckOut:value,
          CheckInTime: prevValue.CheckInTime,
          CheckOutTime: prevValue.CheckOutTime
        };
      } else if(name==="CheckInTime"){
        return{
          CheckIn:prevValue.CheckIn,
          CheckOut:prevValue.CheckOut,
          CheckInTime: value,
          CheckOutTime: prevValue.CheckOutTime
        };
      } else if(name==="CheckOutTime"){
        return{
          CheckIn:prevValue.CheckIn,
          CheckOut:prevValue.CheckOut,
          CheckInTime: prevValue.CheckInTime,
          CheckOutTime: value
        };
      }
    })
}


const [AvailableRooms,setAvailableRooms]=useState(props.data.AvailableRooms)
const [SelectedRooms,setSelectedRooms]=useState(props.data.SelectedRooms)

// const reqRoom=async () => {
//   if(dates.CheckIn && dates.CheckOut){
//   const response = await axios.get(`http://localhost:3001/rooms/availablity/${dates.CheckIn}/${dates.CheckOut}`);
//   setAvailableRooms(response.data);
//   setSelectedRooms([])
//   }};

const reqRoom=async () => {
  if(dates.CheckIn && dates.CheckOut && dates.CheckInTime && dates.CheckOutTime){
    const response = await axios.get(`http://localhost:3001/rooms/availability/${dates.CheckIn}/${dates.CheckOut}/${dates.CheckInTime}/${dates.CheckOutTime}`);
    setAvailableRooms(response.data);
    console.log(response.data)
    setSelectedRooms([])
  }
};

const selectRoom=(Room)=>{
  setSelectedRooms([...SelectedRooms,{RoomNo:Room.RoomNo, Status: "available",TypeName:'',addInfo:'',floor:''}]
  .sort((a, b) => a.RoomNo - b.RoomNo))
  setAvailableRooms(AvailableRooms.filter(room => room.RoomNo !== Room.RoomNo));
}

const removeRoom = (Room) => {
  setAvailableRooms([...AvailableRooms, {RoomNo:Room.RoomNo, Status: "available",TypeName:'',addInfo:'',floor:''}]
    .sort((a, b) => a.RoomNo - b.RoomNo)); 

  setSelectedRooms(SelectedRooms.filter(room => room.RoomNo !== Room.RoomNo))
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
                                     <Field name="CheckInTime" component={Input} label="Check-In Time" type="time" onBlur={getDates} id="CheckInTime"/>
                                     <Field name="CheckOut" component={Input} label="Check-Out" type="date" onBlur={getDates} id="CheckOut"/>
                                     <Field name="CheckOutTime" component={Input} label="Check-Out Time" type="time" onBlur={getDates} id="CheckOutTime"/>
                                     <button  type="button" onClick={reqRoom} ><img src={searchIcon} className={style.searchIcon}/></button>
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
                                              <td><button type="button" onClick={() => selectRoom(room)} className={style.add}><img src={addIcon}/></button></td>
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
                                            <tr className={style.selected} key={room.RoomNo}>
                                              <td >
                                              {room.RoomNo}
                                              <img src={deleteIcon} className={style.deleteIcon} onClick={()=>removeRoom(room)}/>
                                              </td>
                                              
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
