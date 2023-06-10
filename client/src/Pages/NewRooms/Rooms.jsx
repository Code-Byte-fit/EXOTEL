import React, { useState, useEffect, useContext } from "react";
import Table from "./components/Table";
import FormOne from "./components/Form";
import { AppContext } from "../../Helpers/AppContext"
import axios from "axios";
import style from '../NewRooms/components/Rooms.module.css'

function DisplayFormData() {
  const [listOfRooms, setlistOfRooms] = useState([]);
 
  const { host } = useContext(AppContext)
  useEffect(() => {
    axios.get(`${host}/rooms`).then((response) => {
      setlistOfRooms(response.data);
      console.log(listOfRooms)
    });
  }, []);

  const makeReq = async (formData) => {
    await axios.post(`${host}/rooms`, formData).then(() => {
      axios.get(`${host}/rooms`).then((response) => {
        setlistOfRooms(response.data);
      });
    })
  }

  return (
    <React.Fragment>
      <div className={style.cover}>
        <FormOne makeReq={makeReq} />
        <Table listOfRooms={listOfRooms} setlistOfRooms={setlistOfRooms} />
      </div>
    </React.Fragment>

  )

}
export default DisplayFormData;
