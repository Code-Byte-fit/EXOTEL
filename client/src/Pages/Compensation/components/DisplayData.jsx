import React, { useState, useEffect,useContext } from "react";
import {AppContext} from "../../../Helpers/AppContext"
import axios from "axios";
import FormOne from "../components/FormOne";
import CTable from './CTable';

function DisplayData() {
    const {host}=useContext(AppContext)
    const [listOfComp, setListOfComp] = useState([]);
    useEffect(() => {
        axios.get(`${host}/compensation`)
        .then((response) => {
          setListOfComp(response.data);
        });
      }, []);

      const onSubmit = async (fData) =>{
        await axios.post(`${host}/compensation`,fData).then(()=>{
            axios.get(`${host}/compensation`)
            .then((response) => {
            setListOfComp(response.data);
        });
        })
    };
  
    const [comp, setcomp] = useState();
    const [addFormData, setAddFormData] = useState({
        resNumber: '',
        roomNumber: '',
        date: '',
        time: '',
        compType:'',
        compValue:'',
        amount:''
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

        const newComp = {
            resNumber: addFormData.resNumber,
            roomNumber: addFormData.roomNumber,
            date: addFormData.date,
            time: addFormData.time,
            compType:addFormData.compType,
            compValue:addFormData.compValue,
            amount: addFormData.amount
        };

        const newBar = [...comp, newComp];
        setcomp(newBar);
    };



    return (
        <React.Fragment>

            <FormOne handleAddFormChange={handleAddFormChange} addFormData={addFormData} onSubmit={onSubmit}/>
          
            <CTable listOfComp={listOfComp}  comp={comp} />
        </React.Fragment>


    )

}
export default DisplayData;
