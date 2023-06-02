import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from "formik"
import axios from 'axios'
import logo from "../../Assets/Logos/logo.png"
import Header from './components/Header'
import PageOne from './components/PageOne'
import PageTwo from './components/PageTwo'
import "react-widgets/styles.css";
import { Combobox } from 'react-widgets'
import style from "./components/Complains.module.css"


export default function FeedBack() {
    const [guests,setGuests]=useState([]);
    useEffect(()=>{
      axios.get("http://localhost:3001/guests/feedback").then((res)=>{
        const updatedGuests = [{ FirstName: "Anonymous", id: null }, ...res.data];
        setGuests(updatedGuests);
        console.log(res.data)
     })
    },[])

   const [guestId,setGuestId]=useState(null);
   
    const makeReq = async (formData) => {
      const newData={...formData,guest:guestId}
      axios.post("http://localhost:3001/feedback",newData).then((res)=>{
        console.log(res.data)
      })
    };
    const [feedbackData, setFeedBackData] = useState({
      guest: null,
      emoji: "",
      stat: {
        hospitality: 50,
        hygiene: 50,
        food: 50,
        facilities: 50,
        rooms: 50,
      },
    });

    const handleGuestSelect = (value) => {
      setGuestId(value.id);
    };

    const [currentStep, setCurrentStep] = useState(0);
    const handleNextStep = (newData, final = false) => {
      if (final) {
        makeReq(newData);
        return;
      }
      setFeedBackData((prev) => ({ ...prev, ...newData }));
      setCurrentStep((prev) => prev + 1);
    };
    
    const handlePrevStep = (newData) => {
      setFeedBackData((prev) => ({ ...prev, ...newData }));
      setCurrentStep((prev) => prev - 1);
    };
    const steps = [
      <PageOne next={handleNextStep} data={feedbackData}/>,
      <PageTwo prev={handlePrevStep} next={handleNextStep} data={feedbackData} />,
    ];
    return (
      <>
        <div className={style.mainCont}>
          <div className={style.innerCont}>
            <div className={style.topCont}>
              <img src={logo} className={style.logo} />
              <Header
                one={currentStep >= 0 && true}
                onClickone={() => setCurrentStep(0)} 
                two={currentStep >= 1 && true}
                onClicktwo={() => setCurrentStep(1)} 
              />
             <Combobox  defaultValue="Anonymous" data={guests}  textField="FirstName" valueField="id" onChange={handleGuestSelect} className={style.guest}/>
            </div>
          </div>
          <div className={style.middleCont}>{steps[currentStep]}</div>
        </div>
      </>
    );
  }