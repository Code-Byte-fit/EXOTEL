import React, { useState } from "react";
import Table from "./Table";
import FormOne from "./Form";

import data from "./Mock-data.json"
import { nanoid } from 'nanoid';


function DisplayFormData() {

  
    const [promotions, setPromotions] = useState(data);
    const [addFormData, setAddFormData] = useState({
        PromoCode: '',
        PromoType: '',
        Value: '',
        MaxUses: '',
        Status: '',
        Startdate:'',
        Enddate:'',
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

        const newPromotion = {
            id: nanoid(),
            PromoCode: addFormData.PromoCode,
            PromoType: addFormData.PromoType,
            Value: addFormData.Value,
            MaxUses: addFormData.MaxUses,
            Status:addFormData.Status,
            Startdate:addFormData.Startdate,
            Enddate:addFormData.Enddate,
        };

        const newPromotions = [...promotions, newPromotion];
        setPromotions(newPromotions);
    };



    return (
        <React.Fragment>

            <FormOne handleAddFormChange={handleAddFormChange}
                addFormData={addFormData} />
          
            <Table promotions={promotions} />
        </React.Fragment>


    )

}
export default DisplayFormData;
