import React, { useState } from "react";
import Table from "./Table";
import FormOne from "./Form";
import data from "./Mock-data.json"
import Popup from "./EditPopup";
import { nanoid } from 'nanoid';


function DisplayFormData() {

  
    const [RoomTypes, setRoomTypes] = useState(data);
    const [addFormData, setAddFormData] = useState({
        TypeName: '',
        NoOfBeds: '',
        sqFeet: '',
        BaseCharge: ''
    })




    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    }

    // const handleAddFormSubmit = (event) => {
    //     event.preventDefault();

    //     const newRoom = {
    //         id: nanoid(),
    //         roomNumber: addFormData.roomNumber,
    //         roomType: addFormData.roomType,
    //         BaseCharge: addFormData.BaseCharge,
    //         floor: addFormData.floor,
    //         sqFeet: addFormData.sqFeet
    //     };

    //     const newRooms = [...rooms, newRoom];
    //     setRooms(newRooms);
    // };




    return (
        <React.Fragment>

            <FormOne handleAddFormChange={handleAddFormChange}
                addFormData={addFormData} />
          
            <Table RoomTypes={RoomTypes} />
           
        </React.Fragment>


    )

}
export default DisplayFormData;
