import React, { useState } from 'react';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import style from '../Calendar/components/Cal.module.css.css'


function Cal() {
  const [value, onChange] = useState(new Date());

  return (
    <div className={style.container}>
    <div className={style.title}>
        {/* <h3>Calendar</h3> */}
    </div>
      <Calendar 
        onChange={onChange} 
        value={value} 
        selectRange={true} 
        className={style.myCal}
      />
    </div>
  );
}

export default Cal;
