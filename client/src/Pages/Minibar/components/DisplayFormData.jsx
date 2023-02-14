import React, { useState } from "react";
import {nanoid, customAlphabet} from 'nanoid';
import AddForm from '../components/AddForm'
import AddTable from '../components/AddTable'
import CreateButton from '../components/CreateButton'
import data from '../components/mock-data.json'

export default function DisplayFormData() {
    
    const [contacts, setContacts] = useState(data);
    const [addFormData, setAddFormData]=useState({
        roomNum:'',
        date:'',
        item:'',
        qty:'',
    })
    const handleAddFormChange =(event)=>{
        event.preventDefault();
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newFormData = {...addFormData};
        newFormData[fieldName]=fieldValue;
        setAddFormData(newFormData);
    }; 
    const handleAddFormSubmit = (event)=>{
        event.preventDefault();
        const newContact={
            id: nanoid(),
            roomNum:addFormData.roomNum,
            date:addFormData.date,
            item:addFormData.item,
            qty:addFormData.qty,
        };   
        const newContacts = [...contacts,newContact];
        setContacts(newContacts);
    };

    // const [formInputData, setformInputData] = useState(
    //     {
    //         roomNum:'',
    //         date:'',
    //         itemNum:'',
    //         qty:'', 
    //    }
    // );
    
    // const handleChange=(evnt)=>{  
    //     const newInput = (data)=>({...data, [evnt.target.name]:evnt.target.value})
    //    setformInputData(newInput)
    // }
     
    // const handleSubmit= (evnt) =>{
    //     evnt.preventDefault();
    //     const checkEmptyInput = !Object.values(formInputData).every(res=>res==="")
    //     if(checkEmptyInput)
    //     {
    //      const newData = (data)=>([...data, formInputData])
    //      setTableData(newData);
    //      const emptyInput= {roomNum:'',date:'',itemNum:'',qty:''}
    //      setformInputData(emptyInput)
    //     }
    // }  
    return(
        
            <div>
                <div>
                    <div>
                    <React.Fragment>
                    <AddForm handleAddFormChange={handleAddFormChange} />
            <CreateButton handleAddFormSubmit={handleAddFormSubmit}/>
            <AddTable contacts={contacts}/>
        </React.Fragment>
                    </div>
                </div>
            </div>
            
    )
  
}
