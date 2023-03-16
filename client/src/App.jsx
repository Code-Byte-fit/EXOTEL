import {React} from 'react'
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider,Outlet} from "react-router-dom";
import Header from './Pages/General/Header/Header';
import ReservationTab from './Pages/ReservationTab/ReservationTab';
import Reservations from "./Pages/Reservations/Reservations"
import CreateRes from './Pages/CreateReservation/CreateRes';
import ViewRooms from './Pages/ManageRooms/ViewRoomList'
import Rooms from './Pages/NewRooms/Rooms'
import Promotion from './Pages/Promotions/Promotion'
import ViewPromotions from './Pages/ViewPromotions/ViewPromotions';
import AddOns from './Pages/AddOns/AddOn';
import RoomTypes from './Pages/RoomTypes/Types'
import RegisterUser from './Pages/RegisterUser/RegisterUser';




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
                <Route path="/promotion" element={<Promotion/>}/>
                <Route path="/addons" element={<AddOns/>}/>
                <Route path="/roomtypes" element={<RoomTypes/>}/>
                <Route path="/reservations" element={<Reservations/>}/>
                <Route path="/register" element={<RegisterUser/>}/>
            </Route>
            
            
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
