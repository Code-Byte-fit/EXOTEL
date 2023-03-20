import axios from "axios";
import React, { useState, useEffect } from "react";
import FormOne from "./FormOne";
import MTable from './MTable';
// import { nanoid } from 'nanoid';
// import Filter from "./Popup";

function DisplayData() {
    const [listOfMinibarPackage, setListOfMinibarPackage] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/Minibar/minibarpackage")
        .then((response) => {
          setListOfMinibarPackage(response.data);
        });
      }, []);

      const onSubmit = async (fData) =>{
        await axios.post("http://localhost:3001/minibar/minibarpackage",fData).then(()=>{
            axios.get("http://localhost:3001/Minibar/minibarpackage")
            .then((response) => {
            setListOfMinibarPackage(response.data);
        });
        })
        console.log(fData)
    };
  
    const [minibarPackage, setminibarPackage] = useState();
    const [addFormData, setAddFormData] = useState({
        PackageName: '',
        PackagePrice:'',
        PackageItems:[]
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

        const newMinibarPackage = {
           PackageName: addFormData.PackageName,
           PackageItems: addFormData.PackageItems,
            PackagePrice: addFormData.PackagePrice,
            
        };

        const newBar = [...minibarPackage, newMinibarPackage];
        setminibarPackage(newBar);
    };



    return (
        <React.Fragment>

            <FormOne handleAddFormChange={handleAddFormChange} addFormData={addFormData} onSubmit={onSubmit}/>
          
            <MTable listOfMinibarPackage={listOfMinibarPackage}  minibarPackage={minibarPackage} />
        </React.Fragment>


    )

}
export default DisplayData;
