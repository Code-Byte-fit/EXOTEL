import {React} from 'react'
import {createBrowserRouter,createRoutesFromElements,Route,Link,RouterProvider,Outlet} from "react-router-dom";
import Header from './Pages/General/Header/Header';
import ReservationTab from './Pages/ReservationTab/ReservationTab';
import Reservations from "./Pages/Reservations/Reservations"
import CreateRes from './Pages/CreateReservation/CreateRes';
import RegisterUser from './Pages/RegisterUser/RegisterUser';
import Login from '../src/Pages/LoginPage/Login'



export default function App() {
    const router=createBrowserRouter(
        createRoutesFromElements( 
            <>
            <Route path="/" element={<Root/>}>
                <Route path="/createReservation" element={<CreateRes/>}/>
                <Route path="/reservationTab" element={<ReservationTab/>}/>
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

    
    // const [listOfUsers,setListOfUsers]=useState([])
    // useEffect(()=>{
    //     axios.get("http://localhost:3001/users").then((res)=>{
    //         setListOfUsers(res.data);
    //     })
    // },[])
        
    // return (
    //     <>
    //         {listOfUsers.map((value,key)=>{return <div>{value.userName}</div>})}
    //     </>
    // )
}

const Root=()=>{
    return(
        <>
        <Header/>
          
        <div><Outlet/></div>
        </>
    )
}
