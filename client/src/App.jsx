import {React} from 'react'
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider,Outlet} from "react-router-dom";
import Header from './Pages/General/Header/Header';
import ReservationTab from './Pages/ReservationTab/ReservationTab';
import Reservations from "./Pages/Reservations/Reservations"
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
import AdminDash from './Pages/Dashboard/Admin/Admin'
import Receptionist from './Pages/Dashboard/Receptionist/Receptionist';
import HKmanager from './Pages/Dashboard/HKManager/HKmanager';
import FOmanager from './Pages/Dashboard/FrontOffice/FOmanager';
import Cashier from './Pages/Dashboard/Cashier/Cashier';


export default function App() {
    const router=createBrowserRouter(
        createRoutesFromElements( 
            <>
            <Route path="/" element={<Root/>}>
                <Route path="/createReservation" element={<CreateRes/>}/>
                <Route path="/reservationTab" element={<ReservationTab/>}/>
                <Route path="/viewRooms" element={<ViewRooms/>}/>
                <Route path="/viewPromotions" element={<ViewPromotions/>}/>
                <Route path="/rooms" element={<Rooms/>}/>
                <Route path="/admin" element={<AdminDash/>}/>
                <Route path="/receptionist" element={<Receptionist/>}/>
                <Route path="/HKmanager" element={<HKmanager/>}/>
                <Route path="/FOmanager" element={<FOmanager/>}/>
                <Route path="/cashier" element={<Cashier/>}/>
                <Route path="/promotion" element={<Promotion/>}/>
                <Route path="/addons" element={<AddOns/>}/>
                <Route path="/roomtypes" element={<RoomTypes/>}/>
                <Route path="/viewRooms" element={<ViewRooms/>}/>
                <Route path="/viewPromotions" element={<ViewPromotions/>}/>
                <Route path="/viewaddons" element={<ViewAddOns/>}/>
                <Route path="/viewroomtypes" element={<ViewRoomTypes/>}/>
                <Route path="/reservations" element={<Reservations/>}/>
                <Route path="/register" element={<RegisterUser/>}/>
            </Route>
            <Route path="/login" element={<Login/>}/>
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

const Root=()=>{
    return(
        <>
        <Header/>
        <div><Outlet/></div>
        </>
    )
}
