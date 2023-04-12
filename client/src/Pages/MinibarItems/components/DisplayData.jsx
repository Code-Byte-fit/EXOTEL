import axios from "axios";
import React, { useState, useEffect } from "react";
import FormOne from "../components/FormOne";
import MTable from './MTable';

function DisplayData() {

    // Declare a state variable called 'listOfMinibarItems' and initialize it as an empty array.
    const [listOfMinibarItems, setlistOfMinibarItems] = useState([]);
    

    // Fetch data from the API endpoint when the component is mounted for the first time.
    useEffect(() => {
        axios.get("http://localhost:3001/Minibar/minibaritems")
        .then((response) => {
          setlistOfMinibarItems(response.data);
        });
    }, []);

    // Define a function called 'onSubmit' that will handle the form submission.
    const onSubmit = async (fData) =>{
        // Send a POST request to the API endpoint with the form data and update the state after the request is completed.
        await axios.post("http://localhost:3001/Minibar/minibaritems", fData)
        .then(()=>{
            axios.get("http://localhost:3001/Minibar/minibaritems")
            .then((response) => {
                setlistOfMinibarItems(response.data);
            });
        })
        console.log(fData)
    };
  
    // Declare two state variables called 'minibaritems' and 'addFormData'.
    const [minibaritems, setminibaritems] = useState();
    const [addFormData, setAddFormData] = useState({
        ItemName: '',
        addInfo: '',
        ItemPrice: '',
    })

    // Define a function called 'handleAddFormChange' that will handle the form field changes.
    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        // Update the form data state object.
        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    }

    // Define a function called 'handleAddFormSubmit' that will handle the form submission.
    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        // Create a new minibar item object from the form data.
        const newMinibarItems = {
            ItemName: addFormData.ItemName,
            addInfo: addFormData.addInfo,
            ItemPrice: addFormData.ItemPrice,
        };

        // Add the new minibar item object to the minibar items array state.
        const newBar = [...minibaritems, newMinibarItems];
        setminibaritems(newBar);
    };

    return (
        <React.Fragment>
            {/* Render the form component with props */}
            <FormOne handleAddFormChange={handleAddFormChange} addFormData={addFormData} onSubmit={onSubmit}/>
          
            {/* Render the MTable component with props */}
            <MTable listOfMinibarItems={listOfMinibarItems} minibaritems={minibaritems} />
        </React.Fragment>
    )

}
export default DisplayData;
