import React, { useState, useEffect } from "react";
import Table from "./Table";
import FormOne from "./Form";
import data from "./Mock-data.json"

import axios from "axios";

function DisplayFormData() {


    const [RoomTypes, setRoomTypes] = useState(data);
    const [listOfRoomTypes, setlistOfRoomTypes] = useState([]);
    const [addFormData, setAddFormData] = useState({
        TypeName: '',
        NoOfBeds: '',
        sqFeet: '',
        BaseCharge: ''
    })


    useEffect(() => {
        axios.get("http://localhost:3001/roomtypes").then((response) => {
            setlistOfRoomTypes(response.data);
            console.log(listOfRoomTypes)

        });
    }, []);

    const makeReq = async (formData) => {
        await axios.post("http://localhost:3001/roomtypes", formData).then(() => {
            axios.get("http://localhost:3001/roomtypes").then((response) => {
                setlistOfRoomTypes(response.data);
            });
        })
    }







    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    }






    return (
        <React.Fragment>

            <FormOne
                addFormData={addFormData} makeReq={makeReq} />

            <Table RoomTypes={RoomTypes} listOfRoomTypes={listOfRoomTypes} />

        </React.Fragment>


    )

}
export default DisplayFormData;
