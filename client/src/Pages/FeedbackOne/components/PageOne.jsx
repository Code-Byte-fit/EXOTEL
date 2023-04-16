import React from 'react'
import style from './PageOne.module.css'                        // Importing CSS 
import veryBad from '../../../Assets/Images/veryBad.png'        // Importing images 
import poor from '../../../Assets/Images/poor.png'
import medium from '../../../Assets/Images/medium.png'
import good from '../../../Assets/Images/good.png'
import exellent from '../../../Assets/Images/exellent.png'

export default function PageOne({ handleNextStep }) { 
   return (
     <>
       <div class={style.components}> 
         <div class={style.row1}> 
           <h3>How was our service ?</h3> 
           <div class={style.row2}> 
           
             <div class={style.survey}>                      {/* A div with emoji faces */}

               <span class={style.angryFace}>                {/* A span for angryFace */}
                 <img src={veryBad} className={style.angryFace1} /> 
                 <p class={style.angryFace2}>Very Bad</p> 
               </span>

               <span class={style.poorFace}>                  {/* A span for poorFace */}
                 <img src={poor} className={style.poorFace1} /> 
                 <p class={style.poorFace2}>Poor</p> 
               </span>

               <span class={style.neutralFace}>               {/* A span for neutralFace */}
                 <img src={medium} className={style.neutralFace1} /> 
                 <p class={style.neutralFace2}>Medium</p> 
               </span>

               <span class={style.happyFace}>                 {/* A span for happyFace */}
                 <img src={good} className={style.happyFace1} /> 
                 <p class={style.happyFace2}>Good</p> 
               </span>

               <span class={style.veryhappyFace}>             {/* A span for veryhappyFace */}
                 <img src={exellent} className={style.veryhappyFace1} /> 
                 <p class={style.veryhappyFace2}>Excellent</p> 
               </span>

             </div>
           </div>
         </div>
         
         <div class={style.buttons}>                          {/* A div with including the next button */}
           <button class={style.nextbtn} onClick={() => handleNextStep({})}> 
             Next
           </button>
         </div>
       </div>
     </>
   );
 }
