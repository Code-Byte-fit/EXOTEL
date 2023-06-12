import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../Helpers/AppContext"
import Table from "./Components/Table";
import FormOne from "./Components/Form";
import axios from "axios";
import style from '../AddOns/Components/AddOns.module.css'
import Spinner from '../General/Spinner/Spinner';
function DisplayFormData() {
    const { host } = useContext(AppContext)
    const [listOfAddons, setlistOAddons] = useState([]);
    const [loading, setLoading] = useState(false); 
    useEffect(() => {
        setLoading(true)
        axios.get(`${host}/addon`).then((response) => {
            setlistOAddons(response.data);
            console.log(listOfAddons)
            setLoading(false)

        });
    }, []);

    const makeReq = async (formData) => {
        setLoading(true)
        await axios.post(`${host}/addon`, formData).then(() => {
            axios.get(`${host}/addon`).then((response) => {
                setlistOAddons(response.data);
                setLoading(false)
            });
        })
    }

    return (
        <React.Fragment>
          {loading && <Spinner loading={loading}/>}
            <div className={style.cover}>
                <FormOne makeReq={makeReq} />
                <Table listOfAddons={listOfAddons} />
            </div>
        </React.Fragment>
    )
}
export default DisplayFormData;
