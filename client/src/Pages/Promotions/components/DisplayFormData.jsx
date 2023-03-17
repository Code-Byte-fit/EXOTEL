import React, { useState , useEffect} from "react";
import Table from "./Table";
import FormOne from "./Form";
import axios from "axios";
import data from "./Mock-data.json"



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

    const [listOfPromotions, setlistOfPromotions] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:3001/promotions").then((response) => {
      setlistOfPromotions(response.data);
      console.log(listOfPromotions)
      
    });
  },[]);

    const makeReq = async (formData) => {
        await axios.post("http://localhost:3001/promotions", formData).then(()=>{
            axios.get("http://localhost:3001/promotions").then((response) => {
                setlistOfPromotions(response.data);
        });
        })
    }



 



    return (
        <React.Fragment>

            <FormOne makeReq={makeReq}
                addFormData={addFormData}
                />
          
            <Table promotions={promotions} listOfPromotions={listOfPromotions}/>
        </React.Fragment>


    )

}
export default DisplayFormData;
