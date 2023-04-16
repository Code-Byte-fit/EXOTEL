import React, { useState } from 'react'
import axios from 'axios'
import logo from "../../Assets/Logos/logo.png"
import Header from './components/Header'
import PageOne from './components/PageOne'
import PageTwo from './components/PageTwo'
import style from "./components/Complains.module.css"

// FeedBack component
export default function FeedBack() {
    const makeReq = async (formData) => {
      console.log(formData);
    };
    const [feedbackData, setFeedBackData] = useState({
      guest: "",
      feedback: "",
      complaints: "",
      emoji: "",
      stat: [],
    });
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
      <PageOne handleNextStep={handleNextStep} />,
      <PageTwo handlePrevStep={handlePrevStep} />,
    ];
    return (
      <>
        <div className={style.mainCont}>
          <div className={style.innerCont}>
            <div className={style.topCont}>
              <img src={logo} className={style.logo} />
              <Header
                one={currentStep >= 0 && true}
                two={currentStep >= 1 && true}
              />
            </div>
          </div>
          <div className={style.middleCont}>{steps[currentStep]}</div>
        </div>
      </>
    );
  }
  