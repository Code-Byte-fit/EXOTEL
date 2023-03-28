import axios from "axios";
import React, { useState, useEffect } from "react";
import FormOne from "../components/FormOne";
import MTable from './MTable';

function DisplayData() {
    const [listOfMinibarItems, setlistOfMinibarItems] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/Minibar/minibaritems")
        .then((response) => {
          setlistOfMinibarItems(response.data);
        });
      }, []);

      const onSubmit = async (fData) =>{
        await axios.post("http://localhost:3001/Minibar/minibaritems",fData).then(()=>{
            axios.get("http://localhost:3001/Minibar/minibaritems")
            .then((response) => {
            setlistOfMinibarItems(response.data);
        });
        })
        console.log(fData)
    };
  
    const [minibaritems, setminibaritems] = useState();
    const [addFormData, setAddFormData] = useState({
        ItemName: '',
        addInfo: '',
        ItemPrice: '',
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

        const newMinibarItems = {
            ItemName: addFormData.ItemName,
            addInfo: addFormData.addInfo,
            ItemPrice: addFormData.ItemPrice,
        };

        const newBar = [...minibaritems, newMinibarItems];
        setminibaritems(newBar);
    };



    return (
        <React.Fragment>

            <FormOne handleAddFormChange={handleAddFormChange} addFormData={addFormData} onSubmit={onSubmit}/>
          
            <MTable listOfMinibarItems={listOfMinibarItems}  minibaritems={minibaritems} />
        </React.Fragment>


    )

}
export default DisplayData;
