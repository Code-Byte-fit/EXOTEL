import React, { useState, useEffect,useContext } from "react";
import {AppContext} from "../../../Helpers/AppContext"
import axios from "axios";
import FormOne from "../components/FormOne";
import LTable from './LTable';


function DisplayData() {
    const[host]=useContext(AppContext) 
    const [listOfLaundry, setListOfLaundry] = useState([]);
    useEffect(() => {
        axios.get(`${host}/laundry`)
        .then((response) => {
          setListOfLaundry(response.data);
        });
      }, []);

      const onSubmit = async (fData) =>{
        await axios.post(`${host}/laundry`,fData).then(()=>{
            axios.get(`${host}/laundry`)
            .then((response) => {
            setListOfLaundry(response.data);
        });
        })
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
