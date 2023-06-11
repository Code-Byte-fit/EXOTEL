import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../Helpers/AppContext"
import Table from "./Components/Table";
import FormOne from "./Components/Form";
import axios from "axios";
import style from '../AddOns/Components/AddOns.module.css'

function DisplayFormData() {
    const { host } = useContext(AppContext)
    const [listOfAddons, setlistOAddons] = useState([]);

    useEffect(() => {
        axios.get(`${host}/addon`).then((response) => {
            setlistOAddons(response.data);
            console.log(listOfAddons)

        });
    }, []);

    const makeReq = async (formData) => {
        await axios.post(`${host}/addon`, formData).then(() => {
            axios.get(`${host}/addon`).then((response) => {
                setlistOAddons(response.data);
            });
        })
    }

    return (
        <React.Fragment>
            <div className={style.cover}>
                <FormOne makeReq={makeReq} />
                <Table listOfAddons={listOfAddons} />
            </div>
        </React.Fragment>
    )
}
export default DisplayFormData;
