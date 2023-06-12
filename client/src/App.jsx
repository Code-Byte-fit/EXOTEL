import {React, useState, useEffect} from 'react'
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider,Outlet} from "react-router-dom";
import { AppContext } from './Helpers/AppContext';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Header from './Pages/General/Header/Header';
import ReservationTab from './Pages/ReservationTab/ReservationTab';
import CreateRes from './Pages/CreateReservation/CreateRes';
import ViewRooms from './Pages/NewRooms/ViewRooms/ViewRoomList'
import Rooms from './Pages/NewRooms/Rooms'
import Promotion from './Pages/Promotions/Promotion'
import ViewPromotions from './Pages/Promotions/ViewPromotions/ViewPromotions';
import ViewAddOns from './Pages/AddOns/ViewAddOns/ViewAddOns';
import AddOns from './Pages/AddOns/AddOn';
import RoomTypes from './Pages/RoomTypes/Types'
import RegisterUser from './Pages/RegisterUser/RegisterUser';
import Login from '../src/Pages/LoginPage/Login'
import ViewRoomTypes from './Pages/RoomTypes/ViewRoomTypes/ViewRoomTypes';
import Guests from './Pages/Guests/Guests';
import AdminDash from './Pages/Dashboard/Admin/Admin'
import FODash from "./Pages/Dashboard/FrontOffice/FOmanager"
import ReceptionDash from "./Pages/Dashboard/Receptionist/Receptionist"
import CashierDash from "./Pages/Dashboard/Cashier/Cashier"
import HKDash from "./Pages/Dashboard/HKManager/HKmanager"
import Compensation from './Pages/Compensation/Compensation';
import Payments from './Pages/Payments/Payments';
import MinibarItems from './Pages/MinibarItems/MinibarItems';
import Minibar from './Pages/Minibar/Minibar';
import MinibarPackage from './Pages/MinibarPackage/MinibarPackage';
import Bill from './Pages/Bill/Bill'
import MinibarRestocked from './Pages/MinibarRestocked/MinibarRestocked'
import ViewMRestock from './Pages/MinibarRestocked/ViewMRestock/ViewMRestock'
import Laundry from './Pages/Laundry/Laundry'


import Users from './Pages/Users/Users';
import Profile from './Pages/Profile/Profile';
import Calender from './Pages/Calender/Calender';
import Calender2 from './Pages/Calender/Calender2';


export default function App() {
    const host=`${window.location.protocol}//${window.location.hostname}:3001`
    const [authState,setAuthState]=useState({
        userAccountId:0,
        userName:"",
        FirstName:"",
        LastName:"",
        userRole:"",
        proPic:"",
        country:"",
        email:"",
        phone:"",
        status:false,
    });

    useEffect (()=>{
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            setAuthState({ ...authState, status: false });
            router.navigate("/login");
        } else {
                    const decodedToken = jwtDecode(accessToken)
                    axios.get(`http://localhost:3001/userAccounts/${decodedToken.userAccountId}`).then((response)=>{
                        setAuthState({
                            userAccountId:response.data.userAccountId,
                            userName:response.data.userName,
                            FirstName:response.data.User.FirstName,
                            LastName:response.data.User.LastName,
                            userRole:response.data.User.Role,
                            proPic:response.data.proPic,
                            country:response.data.User.Country,
                            email:response.data.User.Email,
                            phone:response.data.User.PhoneNumber,
                            status:true,
                        })
                    })
                }
            },[])
    

    const router=createBrowserRouter(
        createRoutesFromElements( 
            <>
                <Route path="/" element={<Root/>}>
                {authState.status && authState.userRole === 'Administrator' && (
                        <>
                            <Route path="/" element={<AdminDash/>}/>
                            <Route path="/rooms" element={<Rooms/>}/>
                            <Route path="/promotion" element={<Promotion/>}/>
                            <Route path="/addons" element={<AddOns/>}/>
                            <Route path="/roomtypes" element={<RoomTypes/>}/>
                            <Route path="/register" element={<RegisterUser/>}/>
                            <Route path="/userlist" element={<Users/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/calender" element={<Calender/>}/>
                            <Route path="/guests" element={<Guests/>}/>
                            <Route path="/reservationTab" element={<ReservationTab/>}/>


                        </>
                )}
                {authState.status && authState.userRole === 'FOManager' && (
                        <>
                            <Route path="/" element={<FODash/>}/>
                            <Route path="/viewRooms" element={<ViewRooms/>}/>
                            <Route path="/viewPromotions" element={<ViewPromotions/>}/>
                            <Route path="/viewaddons" element={<ViewAddOns/>}/>
                            <Route path="/viewroomtypes" element={<ViewRoomTypes/>}/>
                            <Route path="/reservationTab" element={<ReservationTab/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                        </>
                )}
                {authState.status && authState.userRole === 'Receptionist' && (
                        <>
                            <Route path="/" element={<ReceptionDash/>}/>
                            <Route path="/createReservation" element={<CreateRes/>}/>
                            <Route path="/guests" element={<Guests/>}/>
                            <Route path="/reservationTab" element={<ReservationTab/>}/>
                            <Route path="/viewRooms" element={<ViewRooms/>}/>
                            <Route path="/viewPromotions" element={<ViewPromotions/>}/>
                            <Route path="/viewaddons" element={<ViewAddOns/>}/>
                            <Route path="/viewroomtypes" element={<ViewRoomTypes/>}/> 
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/calender" element={<Calender/>}/>
                        </>
                )}
                {authState.status && authState.userRole === 'Cashier' && (
                        <>
                            <Route path="/" element={<CashierDash/>}/>
                            <Route path="/guests" element={<Guests/>}/>
                            <Route path="/reservationTab" element={<ReservationTab/>}/>
                            <Route path="/viewRooms" element={<ViewRooms/>}/>
                            <Route path="/viewPromotions" element={<ViewPromotions/>}/>
                            <Route path="/viewaddons" element={<ViewAddOns/>}/>
                            <Route path="/viewroomtypes" element={<ViewRoomTypes/>}/>
                            <Route path="/bill" element={<Bill/>}/> 
                            <Route path="/payments" element={<Payments/>}/>
                            <Route path="/compensation" element={<Compensation/>}/>
                            <Route path="/ViewMRestock" element={<ViewMRestock/>}/>
                            {/* <Route path="/Minibar" element={<Minibar/>}/> */}

                            <Route path="/profile" element={<Profile/>}/>
                        </>
                )}
                {authState.status && authState.userRole === 'HKManager' && (
                        <>
                            <Route path="/" element={<HKDash/>}/>
                            <Route path="/guests" element={<Guests/>}/>
                            <Route path="/reservationTab" element={<ReservationTab/>}/>
                            <Route path="/viewRooms" element={<ViewRooms/>}/>
                            <Route path="/viewPromotions" element={<ViewPromotions/>}/>
                            <Route path="/viewaddons" element={<ViewAddOns/>}/>
                            <Route path="/viewroomtypes" element={<ViewRoomTypes/>}/> 
                            <Route path="/minibarItems" element={<MinibarItems/>}/>
                            <Route path="/minibarPackage" element={<MinibarPackage/>}/>
                             
                        </>
                )}
                {authState.status && authState.userRole === 'RoomBoy' && (
                        <>
                             <Route path="/minibarRestocked" element={<MinibarRestocked/>}/>
                             <Route path="/laundry" element={<Laundry/>}/>
                             
                            <Route path="/profile" element={<Profile/>}/>
                        </>
                )}
                </Route>
                {!authState.status && <Route path="/login" element={<Login/>}/>}
                <Route path="*" element={<>Page Not Found</>}/>
            
            </>
            
        )
    )

    
    return(
        <AppContext.Provider value={{host,authState,setAuthState}}>
            <RouterProvider router={router}/>
        </AppContext.Provider>
    )
}

const Root=()=>{
    return(
        <>
        <Header/>
        <div><Outlet/></div>
        </>
    )
}
