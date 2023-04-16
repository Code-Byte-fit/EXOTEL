import React, { useState } from 'react';
import Slider from 'react-slider';
import style from './PageTwo.module.css'    

const RatingForm = () => {
  const [values, setValues] = useState({
    hospitality: 0,
    hygiene: 0,
    food: 0,
    facilities: 0,
    rooms: 0
  });

  const handleChange = (name, value) => {
    setValues({
      ...values,
      [name]: value
    });
  };

  return (
    <form>
      <div>
        <label htmlFor="hospitality">Hospitality:</label>
        <Slider
          className={style.slider}
          id="hospitality"
          name="hospitality"
          min={0}
          max={100}
          value={values.hospitality}
          onChange={(value) => handleChange('hospitality', value)}
          renderThumb={(props, state) => (
            <div {...props} className="thumb" style={{ backgroundColor: state.valueNow > 0 ? style.track1 : style.track }}>
              <div className="value">{state.valueNow}</div>
            </div>
          )}
          renderTrack={(props, state) => (
            <div {...props} className={`track track-${state.index}`} style={state.active ? { backgroundColor: style.track1 } : {}}>
              <div className="progress" style={{ width: `${state.offsetPercent}%` }} />
            </div>
          )}
        />
        <span>{values.hospitality}</span>
      </div>

      <div>
        <label htmlFor="hygiene">Hygiene:</label>
        <Slider
        className={style.slider}
          id="hygiene"
          name="hygiene"
          min={0}
          max={100}
          value={values.hygiene}
          onChange={(value) => handleChange('hygiene', value)}
          renderThumb={(props, state) => (
            <div {...props} className="thumb" style={{ backgroundColor: state.valueNow > 0 ? style.track1 : style.track }}>
              <div className="value">{state.valueNow}</div>
            </div>
          )}
          renderTrack={(props, state) => (
            <div {...props} className={`track track-${state.index}`} style={state.active ? { backgroundColor: style.track1 } : {}}>
              <div className="progress" style={{ width: `${state.offsetPercent}%` }} />
            </div>
          )}
        />
        <span>{values.hygiene}</span>
      </div>

      <div>
        <label htmlFor="food">Food:</label>
        <Slider
        className={style.slider}
          id="food"
          name="food"
          min={0}
          max={100}
          value={values.food}
          onChange={(value) => handleChange('food', value)}
          renderThumb={(props, state) => (
            <div {...props} className="thumb" style={{ backgroundColor: state.valueNow > 0 ? style.track1 : style.track }}>
              <div className="value">{state.valueNow}</div>
            </div>
          )}
          renderTrack={(props, state) => (
            <div {...props} className={`track track-${state.index}`} style={state.active ? { backgroundColor: style.track1 } : {}}>
              <div className="progress" style={{ width: `${state.offsetPercent}%` }} />
            </div>
          )}
        />
        <span>{values.food}</span>
      </div>

      <div>
        <label htmlFor="facilities">Facilities:</label>
        <Slider
        className={style.slider}
          id="facilities"
          name="facilities"
          min={0}
          max={100}
          value={values.facilities}
          onChange={(value) => handleChange('facilities', value)}
          renderThumb={(props, state) => (
            <div {...props} className="thumb" style={{ backgroundColor: state.valueNow > 0 ? style.track1 : style.track }}>
              <div className="value">{state.valueNow}</div>
            </div>
          )}
          renderTrack={(props, state) => (
            <div {...props} className={`track track-${state.index}`} style={state.active ? { backgroundColor: style.track1 } : {}}>
              <div className="progress" style={{ width: `${state.offsetPercent}%` }} />
            </div>
          )}
        />
        <span>{values.facilities}</span>
      </div>

      <div>
        <label htmlFor="rooms">Rooms:</label>
        <Slider
        className={style.slider}
          id="rooms"
          name="rooms"
          min={0}
          max={100}
          value={values.rooms}
          onChange={(value) => handleChange('rooms', value)}
          renderThumb={(props, state) => (
            <div {...props} className="thumb" style={{ backgroundColor: state.valueNow > 0 ? style.track1 : style.track }}>
              <div className="value">{state.valueNow}</div>
            </div>
          )}
          renderTrack={(props, state) => (
            <div {...props} className={`track track-${state.index}`} style={state.active ? { backgroundColor: style.track1 } : {}}>
              <div className="progress" style={{ width: `${state.offsetPercent}%` }} />
            </div>
          )}
        />
        <span>{values.rooms}</span>
      </div>
    </form>
  );
};

export default RatingForm;
