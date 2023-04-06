import React, { useState } from 'react';
import Combobox from 'react-widgets/Combobox';
import countries from '../../RegisterUser/Components/CountryList.json';
import style from './Style.module.css';

export default function Filter(props) {
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleClearClick = () => {
    setSelectedCountry('');
    props.setSearchQuery(prevState => ({
      ...prevState,
      country: ''
    }));
  };

  return (
    <>
      <div className={style.filter}>
        <span className={style.inputs}>
          <label htmlFor="Fname">First Name</label>
          <input
            id="Fname"
            type="text"
            onChange={e =>
              props.setSearchQuery(prevState => ({
                ...prevState,
                fname: e.target.value
              }))
            }
          />
        </span>
        <span className={style.inputs}>
          <label htmlFor="Lname">Last Name</label>
          <input
            id="Lname"
            type="text"
            onChange={e =>
              props.setSearchQuery(prevState => ({
                ...prevState,
                lname: e.target.value
              }))
            }
          />
        </span>
        <span className={`${style.inputs} ${style.country}`}>
          <label htmlFor="country">Country</label>
          <Combobox name="country" id="country" hideEmptyPopup
            data={countries} value={selectedCountry}
            onChange={value => {setSelectedCountry(value);
                                props.setSearchQuery(prevState => ({...prevState,country: value}));}}
          />
          {selectedCountry && (
            <button type="button" onClick={handleClearClick} className={style.clear}>X</button>)}
        </span>
      </div>
    </>
  );
}
