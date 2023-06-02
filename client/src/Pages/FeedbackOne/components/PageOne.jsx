import React,{useState} from 'react'
import { Formik, Form, Field } from "formik"
import veryBad from '../../../Assets/Images/veryBad.png'
import poor from '../../../Assets/Images/poor.png'
import medium from '../../../Assets/Images/medium.png'
import good from '../../../Assets/Images/good.png'
import exellent from '../../../Assets/Images/exellent.png'
import style from './PageOne.module.css'
import Emoji from "./Emoji"

export default function PageOne(props) {
  const [selectedEmoji, setSelectedEmoji] = useState(props.data.emoji);

  const handleClick = (values) => {
    props.next(values)
  }

  const handleEmojiClick = (value) => {
    setSelectedEmoji(value);
  }


  return (
    <div className={style.components}>
      <div className={style.row1}>
        <h3>How was our service?</h3>
        <div className={style.row2}>
          <Formik initialValues={props.data} onSubmit={handleClick}>
            {(formik) => (
              <Form>
                <div className={style.survey}>
                  <Field name="Emoji" component={Emoji} img={veryBad} desc="Worst" isSelected={selectedEmoji === "Worst"}
                  onClick={() => {
                    formik.setFieldValue("emoji", "Worst")
                    handleEmojiClick("Worst");
                  }} />
                  <Field name="Emoji" component={Emoji} img={poor} desc="Poor" isSelected={selectedEmoji === "Poor"}
                  onClick={() => {
                    formik.setFieldValue("emoji", "Poor")
                    handleEmojiClick("Poor");
                  }}/>
                  <Field name="Emoji" component={Emoji} img={medium} desc="Average" isSelected={selectedEmoji === "Average"}
                  onClick={() => {
                    formik.setFieldValue("emoji", "Average")
                    handleEmojiClick("Average");
                    }} />
                  <Field name="Emoji" component={Emoji} img={good} desc="Good" isSelected={selectedEmoji === "Good"}
                  onClick={() => {
                    formik.setFieldValue("emoji", "Good")
                    handleEmojiClick("Good");
                  }} />
                  <Field name="Emoji" component={Emoji} img={exellent} desc="Excellent" isSelected={selectedEmoji === "Excellent"}
                  onClick={() => {
                    formik.setFieldValue("emoji", "Excellent")
                    handleEmojiClick("Excellent");
                    }} />
                </div>
                <div className={style.buttons}>
                  <button className={style.nextbtn} type='submit'>Next</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
