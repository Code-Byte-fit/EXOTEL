import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../Helpers/AppContext"
import FormOne from "../components/FormOne";
import MTable from './PTable';
// import { nanoid } from 'nanoid';
// import Filter from "./Popup";

function DisplayData() {
    const [listOfMinibar, setListOfMinibar] = useState([]);
    const { host } = useContext(AppContext);
    useEffect(() => {
        axios.get(`${host}/payments`)
        .then((response) => {
          setListOfMinibar(response.data);
        });
      }, []);

      const onSubmit = async (fData) =>{
        await axios.post(`${host}/payments`,fData).then(()=>{
            axios.get(`${host}/payments`)
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

            <FormOne handleAddFormChange={handleAddFormChange} addFormData={addFormData} onSubmit={onSubmit}/>
          
            <MTable listOfMinibar={listOfMinibar}  minibar={minibar} />
        </React.Fragment>


    )

}
export default DisplayData;
