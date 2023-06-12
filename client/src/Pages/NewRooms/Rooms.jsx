import React, { useState, useEffect, useContext } from "react";
import Table from "./components/Table";
import FormOne from "./components/Form";
import { AppContext } from "../../Helpers/AppContext"
import axios from "axios";
import style from '../NewRooms/components/Rooms.module.css'
import Spinner from '../General/Spinner/Spinner';
function DisplayFormData() {
  const [listOfRooms, setlistOfRooms] = useState([]);
  const [loading, setLoading] = useState(false); 
  const { host } = useContext(AppContext)
  useEffect(() => {
    setLoading(true)
    axios.get(`${host}/rooms`).then((response) => {
      setlistOfRooms(response.data);
      console.log(listOfRooms)
      setLoading(false)
    });
  }, []);

  const makeReq = async (formData) => {
    setLoading(true)
    await axios.post(`${host}/rooms`, formData).then(() => {
      axios.get(`${host}/rooms`).then((response) => {
        setlistOfRooms(response.data);
        setLoading(false)
      });
    })
  }

  return (
    <React.Fragment>
      {loading && <Spinner loading={loading}/>}
      <div className={style.cover}>
        <FormOne makeReq={makeReq} />
        <Table listOfRooms={listOfRooms} setlistOfRooms={setlistOfRooms} />
      </div>
    </React.Fragment>

  )

}
export default DisplayFormData;
