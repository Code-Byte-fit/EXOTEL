import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../Helpers/AppContext"
import Table from "./components/Table";
import FormOne from "./components/Form";
import axios from "axios";
import style from '../../Pages/Promotions/components/Promotions.module.css'



function DisplayFormData() {

  const [listOfPromotions, setlistOfPromotions] = useState([]);
  const { host } = useContext(AppContext)

  useEffect(() => {

    axios.get(`${host}/promotions`).then((response) => {
      setlistOfPromotions(response.data);
      console.log(listOfPromotions)

    });
  }, []);

  const makeReq = async (formData) => {
    await axios.post(`${host}/promotions`, formData).then(() => {
      axios.get(`${host}/promotions`).then((response) => {
        setlistOfPromotions(response.data);
      });
    })
  }

  return (
    <React.Fragment>
      <div className={style.cover1}>
        <FormOne makeReq={makeReq} />
        <Table listOfPromotions={listOfPromotions} />
      </div>

    </React.Fragment>


  )

}
export default DisplayFormData;
