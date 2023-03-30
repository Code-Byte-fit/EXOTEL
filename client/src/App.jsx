import {React, useState, useEffect} from 'react'
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider,Outlet} from "react-router-dom";
import jwt_decode from "jwt-decode";
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


export default function App() {
    const [userRole, setUserRole] = useState(null);
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            const decodedToken = jwt_decode(accessToken);
            setUserRole(decodedToken.userRole);
        }
    }, []);

    const router=createBrowserRouter(
        createRoutesFromElements( 
            <>
            <Route path="/" element={<Root userRole={userRole}/>}>
                <Route path="/createReservation" element={<CreateRes/>}/>
                <Route path="/reservationTab" element={<ReservationTab/>}/>
                <Route path="/viewRooms" element={<ViewRooms/>}/>
                <Route path="/viewPromotions" element={<ViewPromotions/>}/>
                <Route path="/rooms" element={<Rooms/>}/>
                <Route path="/admin" element={<AdminDash/>}/>
                <Route path="/promotion" element={<Promotion/>}/>
                <Route path="/addons" element={<AddOns/>}/>
                <Route path="/roomtypes" element={<RoomTypes/>}/>
                <Route path="/viewRooms" element={<ViewRooms/>}/>
                <Route path="/viewPromotions" element={<ViewPromotions/>}/>
                <Route path="/viewaddons" element={<ViewAddOns/>}/>
                <Route path="/viewroomtypes" element={<ViewRoomTypes/>}/>
                <Route path="/register" element={<RegisterUser/>}/>
                <Route path="/guests" element={<Guests/>}/>
            </Route>
            {!localStorage.getItem('accessToken') && <Route path="/login" element={<Login/>}/>}
            <Route path="*" element={<>Page Not Found</>}/>
            </>
            
        )
    )

    
    return(
            <div>
                <RouterProvider router={router}/>
            </div>
    )
}

const Root=(props)=>{
    return(
        <>
        <Header role={props.userRole}/>
        <div><Outlet/></div>
        </>
    )
}
