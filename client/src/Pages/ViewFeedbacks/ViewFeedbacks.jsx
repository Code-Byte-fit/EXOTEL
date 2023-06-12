import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../ViewFeedbacks/Components/Card'; 
import Style from '../ViewFeedbacks/Components/ViewFeedbacks.module.css'

function ViewFeedbacks() {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/feedback').then((res) => {
      setFeedbackList(res.data);
    });
  }, []);

  console.log (feedbackList)
  return (
    <>
      <h1 className={Style.heading}>Recent Customer Feedbacks</h1>
      <div className={Style.container}>
     
     {feedbackList.map((feedback) => (
       
       <Card
         guest={feedback.Guest?feedback.Guest.FirstName:"Anonymous"}
         key={feedback.FeedbackId}
         emoji={feedback.emoji}
         hospitality={feedback.hospitality}
         hygiene={feedback.hygiene}
         food={feedback.food}
         facilities={feedback.facilities}
         rooms={feedback.rooms}
       />
      
     ))}
   </div>
    </>

    
  );
}

export default ViewFeedbacks;
