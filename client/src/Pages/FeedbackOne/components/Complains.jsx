import React from 'react'
import style from "../components/Complains.module.css"
// import back from "../images/"
import Progress from './ProgressBarStepThree'

export default function Complains() {
  return (
    
    <>
    <form class={style.form}>
      <div class={style.progress}>
        <Progress/>
      </div>
      <div class={style.row1}>
        <h2>How can we improve  to <br></br>serve you better 
        ? </h2>
          <span class={style.box1}></span>
          <div >
            
    <div class={style.headings}>
            <div class={style.row2}>
              <span className={style.feedback}>Feedback</span>
              {/* <label for="Feedback" name="Feedback">Feedback</label> */}
            </div>
            <span class={style.txtAreaBack1}></span>
            <span class={style.txtAreaBack2}></span>
            <div class={style.row2}>
              <span class={style.Complains}>Complains / Suggestions</span>
              {/* <label for="Complains" name="complains">Complains and Suggestions</label> */}
            </div>
            </div>
            <div class={style.txtAreas}>
            <div class={style.row3}>
                <textarea class={style.txtArea} rows={10} cols={35} placeholder="Type Your Feedback"></textarea>
                {/* </div> */}
                {/* <div class="column"> */}</div>
              <div class={style.row4}>
                <textarea class={style.txtArea} rows={10} cols={35} placeholder="Type Your Complains/Suggestions"></textarea>
                {/* </div>
    </div> */}
    </div>
    </div>
    </div>
      <button class={style.submit}>
        <span class={style.transition}></span>
        <span class={style.gradient}></span>
        <span class={style.label}>Submit</span>
      </button>
        {/* <button class={style.submit}>Submit</button> */}
      </div>
      
      {/* <button class={style.cancel}>Cancel</button> */}
      <button class={style.cancel}>
        <span class={style.transition}></span>
        <span class={style.gradient}></span>
        <span class={style.label}>Cancel</span>
      </button>
    </form></>
    
  )
}
