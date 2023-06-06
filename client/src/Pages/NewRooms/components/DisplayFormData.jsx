import React, { useState, useEffect } from "react";
import Table from "./Table";
import FormOne from "./Form";

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




  return (
    <React.Fragment>
      <FormOne
        makeReq={makeReq}
      />
      <Table listOfRooms={listOfRooms} setlistOfRooms={setlistOfRooms}/>

    </React.Fragment>

  )

}
export default DisplayFormData;
