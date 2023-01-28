import { React,useEffect,useState } from 'react'
import axios from 'axios'


export default function App() {
    const [listOfUsers,setListOfUsers]=useState([])
    useEffect(()=>{
        axios.get("http://localhost:3001/users").then((res)=>{
            setListOfUsers(res.data);
        })
    },[])
        
    return (
        <>
            {listOfUsers.map((value,key)=>{return <div>{value.userName}</div>})}
        </>
    )
}
