import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../Helpers/AppContext"
import FormOne from "./FormOne";
import MTable from './MTable';

function DisplayData({totalPrice}) {
  // State variables using useState
  const [listOfMinibarPackage, setListOfMinibarPackage] = useState([]); // an array to hold the list of minibar packages
  const [minibarPackage, setMinibarPackage] = useState([]); // an array to hold the selected minibar packages
  const [addFormData, setAddFormData] = useState({ // an object to hold the form data for adding a new minibar package
    PackageName: '',
    PackagePrice:totalPrice,
    PackageItems:[]
  });

  // Load the list of minibar packages from the server using useEffect
  useEffect(() => {
    axios.get("http://localhost:3001/Minibar/minibarpackage").then((response) => {
      setListOfMinibarPackage(response.data);
    });
  }, []);

  // Submit the form data to add a new minibar package to the server
  const onSubmit = async (formData) => {
    await axios.post("http://localhost:3001/Minibar/minibarpackage", formData).then(() => {
      axios.get("http://localhost:3001/Minibar/minibarpackage").then((response) => {
        setListOfMinibarPackage(response.data);
      });
    });
  }

  // Handle form changes when adding a new minibar package
  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  }

  // Handle form submission when adding a new minibar package
  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newMinibarPackage = {
      PackageName: addFormData.PackageName,
      PackageItems: addFormData.PackageItems,
      PackagePrice: totalPrice,
    };

    const newBar = [...minibarPackage, newMinibarPackage];
    setMinibarPackage(newBar);
  };

  // Render the form and the table that displays the list of minibar packages
  return (
    <>
      <FormOne
        handleAddFormChange={handleAddFormChange}
        addFormData={addFormData}
        onSubmit={onSubmit}
        handleAddFormSubmit={handleAddFormSubmit}
        totalPrice={totalPrice}
      />
      <MTable listOfMinibarPackage={listOfMinibarPackage} />
    </>
  );
}

export default DisplayData;
