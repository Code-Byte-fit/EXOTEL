import React from 'react'
import style from './Cards.module.css'
import ReactCardSlider from 'react-card-slider-component';

export default function Cards() {
  const sliderClick = () => {
    // Implement the click event logic here
  };

  const slides = [
    {title:"This is a title", description:"This is a description", clickEvent: sliderClick},
    {image:"https://picsum.photos/600/500", title:"This is a second title", description:"This is a second description", clickEvent: sliderClick},
    {image:"https://picsum.photos/700/600", title:"This is a third title", description:"This is a third description", clickEvent: sliderClick},
    {image:"https://picsum.photos/500/400", title:"This is a fourth title", description:"This is a fourth description", clickEvent: sliderClick},
    {image:"https://picsum.photos/200/300", title:"This is a fifth title", description:"This is a fifth description", clickEvent: sliderClick},
    {image:"https://picsum.photos/800/700", title:"This is a sixth title", description:"This is a sixth description", clickEvent: sliderClick},
    {image:"https://picsum.photos/300/400", title:"This is a seventh title", description:"This is a seventh description", clickEvent: sliderClick},
  ];

  return (
    <div className={style.boxOne}>
      <div className={style.slideShow}>
        <ReactCardSlider
          visibleSlides={3}
          totalSlides={slides.length}
          arrowLeft={<div className={style.leftArrow}>{'<'}</div>}
          arrowRight={<div className={style.rightArrow}>{'>'}</div>}
        >
          {slides.map((slide, index) => (
            <div key={index}>
              {slide.image && (
                <img src={slide.image} alt={slide.title} className={style.cardImage} />
              )}
              <div className={style.cardContent}>
                <h3>{slide.title}</h3>
                <p>{slide.description}</p>
                <button onClick={slide.clickEvent}>Click me</button>
              </div>
            </div>
          ))}
        </ReactCardSlider>
      </div>
    </div>
  );
}
