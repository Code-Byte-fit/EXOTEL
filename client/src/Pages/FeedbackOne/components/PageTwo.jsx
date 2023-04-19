import React, { useState } from 'react';
import style from "../components/PageTwo.module.css"
import axios from 'axios';

function PageTwo() {
  const MIN_VALUE = 0;
  const MAX_VALUE = 100;

  const initialValues = {
    hospitality: 0,
    hygiene: 0,
    food: 0,
    facilities: 0,
    rooms: 0,
  };
  
  const [value, setValue] = useState(initialValues);
  
  const handleSliderChange = (event, sliderName) => {
    setValue(prevState => ({ ...prevState, [sliderName]: parseInt(event.target.value, 10) }));
  };
  


  // Define a function that sends the slider values to the server via a POST request
  const onSubmit = (event) => {
    event.preventDefault(); // prevent the form from being submitted via browser
  
    // Check that all slider values are not null
    if (
      value.hospitality === null ||
      value.hygiene === null ||
      value.food === null || 
      value.facilities === null ||
      value.rooms === null
    ) {
      alert('Please rate all categories before submitting');
      return;
    }
  
    axios.post("http://localhost:3001/feedback", value)
      .then(() => {
        alert('Rating saved');
      })
      .catch((err) => {
        console.error(err);
        alert('Error saving rating');
      });
  };
  

  return (
    <>
    <div className={style.row1}>
      <h3>Rate our service</h3>
    </div>
    <div className={style.box}>
      <form onSubmit={onSubmit}>
        <div className={style.container}>
          <label htmlFor="hospitality" className={style.label}>Hospitality</label>
          <div className={style.slider}>
            <input
              type="range"
              min={MIN_VALUE}
              max={MAX_VALUE}
              value={value.hospitality}
              onChange={(event) => handleSliderChange(event, 'hospitality')}
              className={style.rangeInput}
              style={{ '--value': value.hospitality }}
            />
          </div>
        </div>
  
        <div className={style.container}>
          <label htmlFor="hygiene" className={style.label}>Hygiene</label>
          <div className={style.slider}>
            <input
              type="range"
              min={MIN_VALUE}
              max={MAX_VALUE}
              value={value.hygiene}
              onChange={(event) => handleSliderChange(event, 'hygiene')}
              className={style.rangeInput}
              style={{ '--value': value.hygiene }}
            />
          </div>
        </div>
  
        <div className={style.container}>
          <label htmlFor="food" className={style.label}>Food</label>
          <div className={style.slider}>
            <input
              type="range"
              min={MIN_VALUE}
              max={MAX_VALUE}
              value={value.food}
              onChange={(event) => handleSliderChange(event, 'food')}
              className={style.rangeInput}
              style={{ '--value': value.food }}
            />
          </div>
        </div>
  
        <div className={style.container}>
          <label htmlFor="facilities" className={style.label}>Facilities</label>
          <div className={style.slider}>
            <input
              type="range"
              min={MIN_VALUE}
              max={MAX_VALUE}
              value={value.facilities}
              onChange={(event) => handleSliderChange(event, 'facilities')}
              className={style.rangeInput}
              style={{ '--value': value.facilities }}
            />
          </div>
        </div>
  
        <div className={style.container}>
          <label htmlFor="rooms" className={style.label}>Rooms</label>
          <div className={style.slider}>
            <input
              type="range"
              min={MIN_VALUE}
              max={MAX_VALUE}
              value={value.rooms}
              onChange={(event) => handleSliderChange(event, 'rooms')}
              className={style.rangeInput}
              style={{ '--value': value.rooms }}
            />
          </div>
        </div>
  
        <div className={style.buttons}>
          <button type="submit" className={style.submitButton}>
            Submit
          </button>
        </div>
      </form>
    </div>
    </>
  );
  };
  export default PageTwo;
  

