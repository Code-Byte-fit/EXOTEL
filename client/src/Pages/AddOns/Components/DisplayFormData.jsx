import React, { useState, useEffect } from "react";
import Table from "./Table";
import FormOne from "./Form";
import axios from "axios";
import data from "./Mock-data.json"



function DisplayFormData() {


    const [addOns, setAddOns] = useState(data);
    const [addFormData, setAddFormData] = useState({
        AddOn: '',
        Unit: '',
        Charge: '',
        AddInfo: '',
    })


    const [listOfAddons, setlistOAddons] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:3001/addon").then((response) => {
            setlistOAddons(response.data);
            console.log(listOfAddons)

        });
    }, []);

    const makeReq = async (formData) => {
        await axios.post("http://localhost:3001/addon", formData).then(() => {
            axios.get("http://localhost:3001/addon").then((response) => {
                setlistOAddons(response.data);
            });
        })
    }



    return (
        <React.Fragment>

            <FormOne makeReq={makeReq}
                addFormData={addFormData} />

            <Table rooms={addOns} listOfAddons={listOfAddons} />
        </React.Fragment>


    )

}
export default DisplayFormData;
