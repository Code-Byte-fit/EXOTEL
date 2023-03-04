import React, { useState } from "react";
import Table from "./Table";
import FormOne from "./Form";
import data from "./Mock-data.json"
import { nanoid } from 'nanoid';
import Filter from "./Popup";

function DisplayFormData() {

  
    const [addOns, setAddOns] = useState(data);
    const [addFormData, setAddFormData] = useState({
        AddOnNo: '',
        AddOn: '',
        Amt: '',
        Qty: '',
        Tax: '',
        AddInfo: '',
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

        const newAddOn = {
            id: nanoid(),
            AddOnNo: addFormData.AddOnNo,
            AddOn: addFormData.AddOn,
            Amt: addFormData.Amt,
            Qty: addFormData.Qty,
            Tax: addFormData.Tax,
            AddInfo: addFormData.AddInfo
        };


        const newAddOns = [...addOns, newAddOn];
        setAddOns(newAddOns);
    };



    return (
        <React.Fragment>

            <FormOne handleAddFormChange={handleAddFormChange}
                addFormData={addFormData} />
          
            <Table rooms={addOns} />
        </React.Fragment>


    )

}
export default DisplayFormData;
