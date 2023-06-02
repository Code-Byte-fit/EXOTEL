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
import FeedBackthree from './Pages/FeedbackOne/FeedBack';
import ViewFeedbacks from './Pages/ViewFeedbacks/ViewFeedbacks';


export default function App() {
    const host=`${window.location.protocol}//${window.location.hostname}:3001`
    const [authState,setAuthState]=useState({
        userAccountId:0,
        userName:"",
        FirstName:"",
        LastName:"",
        userRole:"",
        proPic:"",
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
                            <Route path="/dashBoard" element={<AdminDash/>}/>
                            <Route path="/rooms" element={<Rooms/>}/>
                            <Route path="/promotion" element={<Promotion/>}/>
                            <Route path="/addons" element={<AddOns/>}/>
                            <Route path="/roomtypes" element={<RoomTypes/>}/>
                            <Route path="/register" element={<RegisterUser/>}/>
                        </>
                )}
                {authState.status && authState.userRole === 'FOManager' && (
                        <>
                            <Route path="/dashBoard" element={<FODash/>}/>
                            <Route path="/viewRooms" element={<ViewRooms/>}/>
                            <Route path="/viewPromotions" element={<ViewPromotions/>}/>
                            <Route path="/viewaddons" element={<ViewAddOns/>}/>
                            <Route path="/viewroomtypes" element={<ViewRoomTypes/>}/>
                            <Route path="/reservationTab" element={<ReservationTab/>}/>
                        </>
                )}
                {authState.status && authState.userRole === 'Receptionist' && (
                        <>
                            <Route path="/dashBoard" element={<ReceptionDash/>}/>
                            <Route path="/createReservation" element={<CreateRes/>}/>
                            <Route path="/guests" element={<Guests/>}/>
                            <Route path="/reservationTab" element={<ReservationTab/>}/>
                            <Route path="/viewRooms" element={<ViewRooms/>}/>
                            <Route path="/viewPromotions" element={<ViewPromotions/>}/>
                            <Route path="/viewaddons" element={<ViewAddOns/>}/>
                            <Route path="/viewroomtypes" element={<ViewRoomTypes/>}/> 
                        </>
                )}
                {authState.status && authState.userRole === 'Cashier' && (
                        <>
                            <Route path="/dashBoard" element={<CashierDash/>}/>
                            <Route path="/guests" element={<Guests/>}/>
                            <Route path="/reservationTab" element={<ReservationTab/>}/>
                            <Route path="/viewRooms" element={<ViewRooms/>}/>
                            <Route path="/viewPromotions" element={<ViewPromotions/>}/>
                            <Route path="/viewaddons" element={<ViewAddOns/>}/>
                            <Route path="/viewroomtypes" element={<ViewRoomTypes/>}/> 
                        </>
                )}
                {authState.status && authState.userRole === 'HKManager' && (
                        <>
                            <Route path="/dashBoard" element={<HKDash/>}/>
                            <Route path="/guests" element={<Guests/>}/>
                            <Route path="/reservationTab" element={<ReservationTab/>}/>
                            <Route path="/viewRooms" element={<ViewRooms/>}/>
                            <Route path="/viewPromotions" element={<ViewPromotions/>}/>
                            <Route path="/viewaddons" element={<ViewAddOns/>}/>
                            <Route path="/viewroomtypes" element={<ViewRoomTypes/>}/> 
                        </>
                )}
                </Route>
                {!authState.status && <Route path="/login" element={<Login/>}/>}
                <Route path="/viewfeedbacks" element={<ViewFeedbacks/>}/>
                <Route path="/feedbackthree" element={<FeedBackthree/>}/>
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
