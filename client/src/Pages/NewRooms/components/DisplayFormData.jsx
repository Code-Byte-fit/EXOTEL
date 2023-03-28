import React, { useState, useEffect } from "react";
import Table from "./Table";
import FormOne from "./Form";
import data from "./Mock-data.json"

import axios from "axios";

function DisplayFormData() {
  const [listOfRooms, setlistOfRooms] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:3001/rooms").then((response) => {
      setlistOfRooms(response.data);
      console.log(listOfRooms)

    });
  }, []);

  const makeReq = async (formData) => {
    await axios.post("http://localhost:3001/rooms", formData).then(() => {
      axios.get("http://localhost:3001/rooms").then((response) => {
        setlistOfRooms(response.data);
      });
    })
  }


  const [rooms, setRooms] = useState(data);
  // const [addFormData, setAddFormData] = useState({
  //     RoomNo: '',
  //     TypeName: '',
  //     BaseCharge: '',
  //     floor: '',
  //     sqFeet: '',
  //     Status: 'available'
  // })




  return (
    <React.Fragment>
      <FormOne
        makeReq={makeReq}
      />

      <Table rooms={rooms} listOfRooms={listOfRooms} />

    </React.Fragment>


  )

}
export default DisplayFormData;
