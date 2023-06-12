import Input from "../../General/Inputs/Inputs";
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import style from "./Promotions.module.css";
import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../Helpers/AppContext"
import { ReactComponent as Exclamation } from "../../../Assets/Images/exclamation.svg";

function EditPromo(props) {


  const [Promotions, setPromotions] = useState([]);
  const { host } = useContext(AppContext);
  const [isPromoValid, setPromoValid] = useState(false);

  const handleEdit = (data, success) => {
    success ?
      axios.put(`${host}/promotions`, data).then((res) => {
        props.setIsDone(true);
        props.setSuccess(success);
      }) :
      props.setIsDone(true);
    props.setSuccess(success);
  };

  const checkConflict = async (PromoCode) => {
    try {
      const response = await axios.get(`${host}/promotions/${PromoCode}/apply`);
      console.log(response.data)
      const reservations = response.data.reservations;
      const isValid = !reservations.includes('checked-in') && !reservations.includes('active');
      setPromoValid(isValid);
    } catch (error) {
      console.error(error);
    }
  };  
  useEffect(() => {
    checkConflict(initialValues.NewPromoCode);
  }, []);



  const [initialValues, setInitialValues] = useState({ ...props.values, NewPromoCode: props.values.PromoCode })

  const validationSchema = Yup.object().shape({
    PromoCode: Yup.string().required('Required'),
    PromoType: Yup.string().required('Required'),
    Value: Yup.string()
      .required('Required')
      .matches(/%$/, 'Value must end with %'),
    MaxUses: Yup.number()
      .required('Required')
      .test('non-negative', 'MaxUses must be non-negative', function (value) {
        return value >= 0;
      }),
    Status: Yup.string().required('Required'),
    Startdate: Yup.date()
      .required('Required')
      .test(
        'end-date-after-start-date',
        'End date must be after start date',
        function (value) {
          const { Enddate } = this.parent;
          return !Enddate || value <= Enddate;
        }
      ),
    Enddate: Yup.date()
      .required('Required')
      .test(
        'end-date-after-start-date',
        'End date must be after start date',
        function (value) {
          const { Startdate } = this.parent;
          return !Startdate || value >= Startdate;
        }
      ),
    AddInfo: Yup.string(),
  });


  const Status = [{ key: "--None Selected --", value: "" },
  { key: "Active", value: "Active" },
  { key: "Disabled", value: "Disabled" },]

  // const temp = true;
  return (

    <>
      {!isPromoValid ?

        <>
          <div className={style.editCont}>


            <div className={style.editHeading}>Edit Promo</div>
            <Formik initialValues={initialValues} onSubmit={handleEdit} validationSchema={validationSchema}>
              {(formik) => (
                <Form>
                  <div className={style.Editdiv1}>
                    <div className={style.top}>


                      <span className={style.box3}>
                        <Field name="NewPromoCode"
                          component={Input}
                          label="Promo Code"
                          type="text"
                          width="13vw" />
                        <ErrorMessage name="PromoCode" component="span" className={style.error} />
                      </span>


                      <span className={style.box3}>
                        <Field name="PromoType"
                          component={Input}
                          label="Promo Type"
                          type="text"
                          width="13vw" />
                        <ErrorMessage name="PromoType" component="span" className={style.error} />
                      </span>

                      <span className={style.box3}>
                        <Field name="Value"
                          component={Input}
                          label="Value(%)"
                          type="text"
                          width="13vw" />
                        <ErrorMessage name="Value" component="span" className={style.error} />
                      </span>
                      <span className={style.box3}>
                        <Field name="MaxUses"
                          component={Input}
                          label="Max Uses"
                          type="number"
                          width="13vw"
                        />
                        <ErrorMessage name="MaxUses" component="span" className={style.error} />
                      </span>


                      <span className={style.box3}>
                        <Field name="Status"
                          component={Input}
                          label="Status"
                          type="select"

                          options={Status}
                          width="13vw" />
                        <ErrorMessage name="Status" component="span" className={style.error} />
                      </span>
                    </div>
                    <div className={style.Editdiv6}>
                      <div className={style.Editdiv7}>
                        <span className={style.box3}>
                          <Field name="Startdate"
                            component={Input}
                            label="Start Date"
                            type="Date"

                            width="13vw" />
                          <ErrorMessage name="Startdate" component="span" className={style.error} />
                        </span>
                        <span className={`${style.box3} ${style.box4}`}>
                          <Field name="Enddate"
                            component={Input}
                            label="End Date"
                            type="Date"
                            width="13vw" />
                          <ErrorMessage name="Enddate" component="span" className={style.error} />
                        </span>
                      </div>
                      <div className={style.textArea1}>
                        <Field name="AddInfo"
                          component={Input}
                          label="Additional Information"
                          type="textarea"
                          rows="3"
                          cols="115" />
                      </div>


                    </div>

                  </div>
                  <div className={style.confirmBtnCont}>
                    <button type='button' className={`${style.editBtn} ${style.cancelBtn}`} onClick={() => { handleEdit(formik.values, false) }} >Cancel</button>
                    <button type='button' className={`${style.editBtn} ${style.confirmBtn}`} onClick={() => { handleEdit(formik.values, true) }} >Confirm</button>
                  </div>
                </Form>
              )}

            </Formik>

          </div>
        </> :
        <span>
                    <>
                        <div className={style.confirmModal}>
                            <Exclamation className={style.exclamation} />
                            <span className={`${style.confirmHeading} ${style.success}`}>Error!</span>
                            <span className={style.confirmBody}> This promotion cannot be edited since it is associated with one or more reservations</span>
                            <button className={`${style.Btn} ${style.doneBtn}`} onClick={() => { handleEdit(null, false) }}>Ok</button>
                        </div>
                    </>
                </span>
      }
    </>

  )
}

export default EditPromo;