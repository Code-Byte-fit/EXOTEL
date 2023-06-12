import React, { useState,useEffect,useContext} from 'react'
import {AppContext} from "../../../Helpers/AppContext"
import {Formik,Form,Field, ErrorMessage} from "formik"
import axios from 'axios'
import * as Yup from 'yup';
import Table from "../../General/Table/Table"
import Input from "../../General/Inputs/Inputs"
import searchIcon from "../../../Assets/Images/Search.png"
import addIcon from "../../../Assets/Images/Add small.png"
import minusIcon from "../../../Assets/Images/minus.png"
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./Style.module.css"
import moment from 'moment';



export default function ResPageOne(props) {
  const {host}=useContext(AppContext)
  const [RoomTypes, setRoomTypes] = useState([]);
  const [filters,setFilters]=useState('');
  const [AvailableRooms,setAvailableRooms]=useState(props.data.AvailableRooms)
  const [SelectedRooms,setSelectedRooms]=useState(props.data.SelectedRooms)
  const [PromoList,setPromoList] =useState([]);
  const [Promo, setPromo] = useState({ PromoCode: props.data.PromoCode, DiscountPercentage: 0 });


  const currentHour = new Date().getHours().toString().padStart(2, '0');
  const currentMinute = new Date().getMinutes().toString().padStart(2, '0');
  const currentTime = `${currentHour}:${currentMinute}`;
  const [dates,setDates]=useState(
    {CheckIn:new Date().toISOString().slice(0, 10), 
    CheckOut:null,
    CheckInTime: currentTime, 
    CheckOutTime: null});


const validationSchema = Yup.object().shape({
  CheckIn: Yup.date().required('required').min(moment(new Date()).startOf('day'), "invalid"),
  CheckOut: Yup.date().required('required').min(Yup.ref('CheckIn'),({ min }) => 'invalid' ),
  CheckInTime: Yup.string().required('required'),
  CheckOutTime: Yup.string().required('required'),
});

  //available rooms after filtering
  const filteredData = AvailableRooms.filter((item) => {
    let matchesFilter = true;
    if (filters) {
      matchesFilter = matchesFilter && item.RoomTypeView.split('-')[0].includes(filters);
    }
    return matchesFilter;
  });
  
  const Pacakge = [
    { key: 'None Selected', value: '' },
    { key: 'Full-Board', value: 'Full-Board' },
    { key: 'Half-Board', value: 'Half-Board' },
  ]

  const availableColumns=[
    {
      name: 'NO',
      selector: row => row.RoomNo,
    },
    {
      name: 'TYPE',
      selector: row => row.RoomTypeView.split('-')[0],
      sortable: true,
    },
    {
      name: 'VIEW',
      selector: row => row.RoomTypeView.split('-')[1].split(' ')[0],
      sortable: true,
    },
    {
      name: 'FLOOR',
      selector: row => row.floor.split(' ')[0],
      sortable: true,
    },
    {
      name: 'CHARGE($)',
      selector: row => row.TotalCharge,
    },
    {
      name: 'SELECT',
      selector: row => row,
      cell: (row) => <button type="button" onClick={() => selectRoom(row)} className={style.add}><img src={addIcon}/></button>
    },
  ]

  const selectedColumns=[
    {
      name: 'NO',
      selector: row => row.RoomNo,
      sortable: true,
    },
    {
      name: 'TYPE',
      selector: row => row.RoomTypeView.split('-')[0],
      sortable: true,
    },
    {
      name: 'REMOVE',
      selector: row => row,
      cell: (row) => <img src={minusIcon} className={style.deleteIcon} onClick={()=>removeRoom(row)}/>
    },
  ]
  
  const handleSubmit=(values)=>{
    values.AvailableRooms=AvailableRooms;
    values.SelectedRooms=SelectedRooms;
    values.SelectedRooms=SelectedRooms;
    values.PromoCode=Promo.PromoCode;
    props.next(values)
  }
 

const getDates=(event)=>{
  setAvailableRooms([])
  setSelectedRooms([])
  props.setAmounts(prevValue=>{
    return({
      subTotal:0,
      discounts:0,
      GrandTotal:0
    })
  })
  const {value,name}=event.target;
    
  //capture checkin and checkout details
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

//fetch room types needed for the select field
const fetchRoomTypes = async () => {
  const response = await axios.get(`${host}/roomtypes`);
  setRoomTypes(response.data);
}
useEffect(() => {
  fetchRoomTypes();
  axios.get(`${host}/promotions/active`).then((res)=>{
    setPromoList(res.data)
    console.log(res.data)
  })
}, []);





//retrieve available rooms
const reqRoom=async (event) => {
    event.preventDefault()
    const response = await axios.get(`${host}/rooms/availability/${dates.CheckIn}/${dates.CheckOut}/${dates.CheckInTime}/${dates.CheckOutTime}`);
    setAvailableRooms(response.data.filter(room => !SelectedRooms.some(selectedRoom => selectedRoom.RoomNo === room.RoomNo)));
};

const checkInDate = moment(dates.CheckIn);
  const checkOutDate = moment(dates.CheckOut);
  const days = checkOutDate.diff(checkInDate, 'days');

const selectRoom=(Room)=>{
  setSelectedRooms([...SelectedRooms,Room]
  .sort((a, b) => a.RoomNo - b.RoomNo))
  setAvailableRooms(AvailableRooms.filter(room => room.RoomNo !== Room.RoomNo));
  props.setAmounts(prevValue=>{
    return({
      subTotal:prevValue.subTotal + Room.TotalCharge*days,
      discounts:prevValue.discounts + Room.TotalCharge*days * (Promo.DiscountPercentage/100),
      GrandTotal:prevValue.GrandTotal + Room.TotalCharge*days - (Room.TotalCharge*days * (Promo.DiscountPercentage/100)),
    })
  })
}

const removeRoom = (Room) => {
  setAvailableRooms([...AvailableRooms, Room]
    .sort((a, b) => a.RoomNo - b.RoomNo)); 
  setSelectedRooms(SelectedRooms.filter(room => room.RoomNo !== Room.RoomNo))
  props.setAmounts(prevValue=>{
    return({
      subTotal:prevValue.subTotal - Room.TotalCharge*days,
      discounts:prevValue.discounts - Room.TotalCharge*days * (Promo.DiscountPercentage/100),
      GrandTotal:prevValue.GrandTotal - Room.TotalCharge*days + (Room.TotalCharge*days * (Promo.DiscountPercentage/100))
    })
  })
}

const handleRoomTypeChange = (event) => {
  const selectedRoomType = event.target.value;
  setFilters(selectedRoomType);
};


const valid=AvailableRooms.length>0 || SelectedRooms.length>0

  return (
    <>
      <Formik initialValues={props.data} onSubmit={handleSubmit} validationSchema={validationSchema}>
              {(formik)=>(
                <Form>
                      <div className={style.container}>
                          <div className={style.topContainer}>
                                <div className={style.topLeftContainer}>
                                    <Field name="RoomType" component={Input} label="Room Type" type="select" id="RoomType" disabled={!valid}
                                    options={[{ key: "None Selected", value: "" }, ...RoomTypes.map(RoomType => ({ key: RoomType.TypeName, value: RoomType.TypeName }))]} 
                                    onChange={handleRoomTypeChange}
                                    value={filters}
                                    />
                                    {/* <Field name="Package" component={Input} label="Package" type="select" options={Pacakge} id="Package" disabled={!valid}/> */}
                                    <Field name="PromoCode" component={Input} label="Promo-Code" type="select" id="promoCode"
                                   options={[{ key: "None Selected", value: "" }, ...PromoList.map((promo) => ({ key: promo.PromoCode, value: promo.PromoCode }))]}
                                   onBlur={(event) => {
                                                const selectedPromo = PromoList.find((promo) => promo.PromoCode === event.target.value);
                                                setPromo({ PromoCode: event.target.value, DiscountPercentage: selectedPromo.Value });
                                              }} />
                                </div>
                                <div className={style.topRightContainer}>
                                  <span className={style.datesCont}>
                                     <Field name="CheckIn" component={Input} label="Check-In" type="date" onBlur={getDates} id="CheckIn"/>
                                     <ErrorMessage name="CheckIn" component="small" className={style.dateErr}/>
                                  </span>
                                  <span className={style.datesCont}>
                                     <Field name="CheckInTime" component={Input} label="Check-In Time" type="time" onBlur={getDates} id="CheckInTime"/>
                                     <ErrorMessage name="CheckInTime" component="small" className={style.dateErr}/>
                                  </span>
                                  <span className={style.datesCont}>
                                     <Field name="CheckOut" component={Input} label="Check-Out" type="date" onBlur={getDates} id="CheckOut"/>
                                     <ErrorMessage name="CheckOut" component="small" className={style.dateErr}/>
                                  </span>
                                  <span className={style.datesCont}>
                                     <Field name="CheckOutTime" component={Input} label="Check-Out Time" type="time" onBlur={getDates} id="CheckOutTime"/>
                                     <ErrorMessage name="CheckOutTime" component="small" className={style.dateErr}/>
                                  </span>
                                  <Field name="totalAmount"  style={{display:"none"}}
                                  value={props.amounts.GrandTotal} onChange={formik.values.totalAmount=props.amounts.GrandTotal}/>
                                  <button type="submit" onClick={formik.dirty && formik.isValid && reqRoom} ><img src={searchIcon} className={style.searchIcon}/></button>
                                </div>
                          </div>
                          {valid &&
                        <div className={style.middleContainer}>
                          <div>
                              <div className={style.Available}>Available</div>
                              <Table columns={availableColumns} data={filteredData} height="30vh"/>
                          </div>
                          <div>
                              <div className={style.Selected}>Selected</div>
                              {<Table columns={selectedColumns} data={SelectedRooms} height="30vh"/>}
                          </div>
                        </div>}
                        {SelectedRooms.length>0 ? <button type="submit" className={style.Btn}>Proceed</button>:<button type="submit" className={style.hidden}>Proceed</button>}
                      </div>
              </Form>
              )}
      </Formik>    
    </>
  )
}