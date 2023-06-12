import axios from "axios";
import React, { useState, useEffect } from "react";
import FormOne from "../components/FormOne";
import LTable from './LTable';


function DisplayData() {
    const [listOfLaundry, setListOfLaundry] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/laundry")
        .then((response) => {
          setListOfLaundry(response.data);
        });
      }, []);

      const onSubmit = async (fData) =>{
        await axios.post("http://localhost:3001/laundry",fData).then(()=>{
            axios.get("http://localhost:3001/laundry")
            .then((response) => {
            setListOfLaundry(response.data);
        });
        })
        console.log(fData)
    };
  
    const [laundry, setlaundry] = useState();
    const [addFormData, setAddFormData] = useState({
        ReservationId: '',
        receivedDate: '',
        returnDate: '',
        load: '',
        type:'',
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

        const newLaundry = {
            ReservationId: addFormData.ReservationId,
            receivedDate: addFormData.receivedDate,
            returnDate: addFormData.returnDate,
            load: addFormData.load,
            type: addFormData.type,
        };

        const newLaun = [...laundry, newLaundry];
        setlaundry(newLaun);
    };

    return (
        <React.Fragment>

            <FormOne handleAddFormChange={handleAddFormChange} addFormData={addFormData} onSubmit={onSubmit}/>
          
            <LTable listOfLaundry={listOfLaundry}  laundry={laundry} />
        </React.Fragment>

    )
}
export default DisplayData;
