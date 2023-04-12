import axios from "axios";
import React, { useState, useEffect } from "react";
import FormOne from "../components/FormOne";
import MTable from './PTable';
import Button from "./Button";
// import { nanoid } from 'nanoid';
// import Filter from "./Popup";

function DisplayData() {
    const [listOfMinibar, setListOfMinibar] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/payments")
        .then((response) => {
          setListOfMinibar(response.data);
        });
      }, []);

      const onSubmit = async (fData) =>{
        await axios.post("http://localhost:3001/payments",fData).then(()=>{
            axios.get("http://localhost:3001/payments")
            .then((response) => {
            setListOfMinibar(response.data);
        });
        })
        console.log(fData)
    };
  
    const [minibar, setminibar] = useState();
    const [addFormData, setAddFormData] = useState({
        RoomNumber: '',
        LastRestocked: '',
        ItemName: '',
        Quantity: ''
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

        const newMinibar = {
            RoomNumber: addFormData.RoomNumber,
            LastRestocked: addFormData.LastRestocked,
            ItemName: addFormData.ItemName,
            Quantity: addFormData.Quantity,
        };

        const newBar = [...minibar, newMinibar];
        setminibar(newBar);
    };



    return (
        <React.Fragment>
            <Button/>
            <FormOne handleAddFormChange={handleAddFormChange} addFormData={addFormData} onSubmit={onSubmit}/>
            <MTable listOfMinibar={listOfMinibar}  minibar={minibar} />
        </React.Fragment>


    )

}
export default DisplayData;
