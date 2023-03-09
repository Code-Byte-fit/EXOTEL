import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";
import CreateBtn from "./CreateBtn";
import data from "./Mock-data.json"
import { nanoid } from 'nanoid';


function DisplayFormData() {

  
    const [rooms, setRooms] = useState(data);
    const [addFormData, setAddFormData] = useState({
        promoCode: '',
        promoType: '',
        baseCharge: '',
        floor: '',
        sqFeet: ''
    })




    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    }

    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        const newRoom = {
            id: nanoid(),
            promoCode: addFormData.promoCode,
            promoType: addFormData.promoType,
            baseCharge: addFormData.baseCharge,
            floor: addFormData.floor,
            sqFeet: addFormData.sqFeet
        };

        const newRooms = [...rooms, newRoom];
        setRooms(newRooms);
    };



    return (
        <React.Fragment>

            <Form handleAddFormChange={handleAddFormChange}
                addFormData={addFormData} />
            <CreateBtn handleAddFormSubmit={handleAddFormSubmit} /> 
            <Table rooms={rooms} />
        </React.Fragment>


    )

}
export default DisplayFormData;
