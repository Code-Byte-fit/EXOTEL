import React, { useState, useEffect } from 'react';
import style from './Slider.module.css';
import axios from 'axios';

function Slider({ field, value: initialValue,onChange}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = async (event) => {
    const newValue = parseInt(event.target.value, 10);
    setValue(newValue);
    onChange(field,event);
  };

  return (
    <div>
      <input
        className={value > 50 ? style.heigh : style.less}
        type="range"
        min="0"
        max="100"
        step="10"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default Slider;
