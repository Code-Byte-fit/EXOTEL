import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../Helpers/AppContext"
import FormOne from "./FormOne";
import MTable from './MTable';

function DisplayData({totalPrice}) {
  const [listOfMinibarPackage, setListOfMinibarPackage] = useState([]);
  const { host } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [minibarPackage, setminibarPackage] = useState([]);
  const [addFormData, setAddFormData] = useState({
    PackageName: '',
    PackagePrice:totalPrice,
    PackageItems:[]
  })

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${host}/Minibar/minibarpackage`)
      .then(async (response) => {
        const packages = response.data;
        for (const pkg of packages) {
          const { data } = await axios.get(`${host}/Minibar/minibarpackage/${pkg.PackageName}`);
          pkg.PackagePrice = data.PackagePrice;
        }
        setListOfMinibarPackage(packages);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const onSubmit = async (fData) => {
    await axios.post(`${host}/Minibar/minibarpackage`, fData)
      .then(() => {
        setminibarPackage((prev) => {
          return[...prev, fData];
        })})
      .catch((error) => {
        console.log(error);
      });

    // Update package price in MinibarPackage table
    const PackageName = fData.name; // replace with the actual ID of the package to update
    await axios.put(`${host}/Minibar/minibarpackage/${PackageName}`, { PackagePrice: totalPrice })
      .then(() => {
        console.log('Package price updated successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      PackagePrice: totalPrice, // add totalPrice to newMinibarPackage object
    };

    const newBar = [...minibarPackage, newMinibarPackage];
    setminibarPackage(newBar);

  };

  return (
    <React.Fragment>
      <FormOne
        handleAddFormChange={handleAddFormChange}
        addFormData={addFormData}
        onSubmit={onSubmit}
        handleAddFormSubmit={handleAddFormSubmit}
        totalPrice={totalPrice}
      />
      <MTable listOfMinibarPackage={listOfMinibarPackage} />
    </React.Fragment>
  );
}

export default DisplayData;
