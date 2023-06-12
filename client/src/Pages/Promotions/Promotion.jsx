import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../Helpers/AppContext"
import Table from "./components/Table";
import FormOne from "./components/Form";
import axios from "axios";
import style from '../../Pages/Promotions/components/Promotions.module.css'
import Spinner from '../General/Spinner/Spinner';


function DisplayFormData() {
  const [loading, setLoading] = useState(false); 
  const [listOfPromotions, setlistOfPromotions] = useState([]);
  const { host } = useContext(AppContext)

  useEffect(() => {
    setLoading(true)
    axios.get(`${host}/promotions`).then((response) => {
      setlistOfPromotions(response.data);
      console.log(listOfPromotions)
      setLoading(false)
    });
  }, []);

  const makeReq = async (formData) => {
    setLoading(true)
    await axios.post(`${host}/promotions`, formData).then(() => {
      axios.get(`${host}/promotions`).then((response) => {
        setlistOfPromotions(response.data);
        setLoading(false)
      });
    })
  }

  return (
    <React.Fragment>
        {loading && <Spinner loading={loading}/>}
      <div className={style.cover1}>
        <FormOne makeReq={makeReq} />
        <Table listOfPromotions={listOfPromotions} />
      </div>

    </React.Fragment>


  )

}
export default DisplayFormData;
