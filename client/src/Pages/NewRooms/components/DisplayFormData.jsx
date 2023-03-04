import React, { useState } from "react";
import Table from "./Table";
import FormOne from "./Form";
import data from "./Mock-data.json"
import Popup from "./EditPopup";
import { nanoid } from 'nanoid';
import Filter from "./EditPopup";

function DisplayFormData() {

  
    const [rooms, setRooms] = useState(data);
    const [addFormData, setAddFormData] = useState({
        roomNumber: '',
        roomType: '',
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
            roomNumber: addFormData.roomNumber,
            roomType: addFormData.roomType,
            baseCharge: addFormData.baseCharge,
            floor: addFormData.floor,
            sqFeet: addFormData.sqFeet
        };

        const newRooms = [...rooms, newRoom];
        setRooms(newRooms);
    };




    return (
        <React.Fragment>

            <FormOne handleAddFormChange={handleAddFormChange}
                addFormData={addFormData} />
          
            <Table rooms={rooms} />
           
        </React.Fragment>


    )

}
export default DisplayFormData;
