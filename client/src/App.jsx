import {React} from 'react'
import {createBrowserRouter,createRoutesFromElements,Route,Link,RouterProvider,Outlet} from "react-router-dom";
import ResPageTwo from './Pages/CreateReservation/Page2';
import axios from 'axios'


export default function App() {
    const router=createBrowserRouter(
        createRoutesFromElements( 
            <Route path="/">
                <Route path="/createReservation/Details" element={<ResPageTwo/>}/>
                <Route path="*" element={<>Page Not Found</>}/>
            </Route>
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
