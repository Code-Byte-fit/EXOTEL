import React,{useState,useContext} from 'react'
import {Formik,Form,Field} from "formik"
import Spinner from '../General/Spinner/Spinner'
import axios from "axios"
import {AppContext} from "../../Helpers/AppContext"
import coverImg from "../../Assets/Images/DP2.png"
import editIcon from "../../Assets/Images/edittransparent.png"
import Detail from './Components/Detail'
import style from "./Components/Style.module.css"

export default function Profile() {
  const {host,authState,setAuthState}=useContext(AppContext);
  const avatar=authState.proPic.split('\\')[2];
  const [isEdit,setIsEdit]=useState(false);
  const [loading, setLoading] = useState(false); 

  const handleSubmit=(values)=>{
        setLoading(true);
        axios.put(`${host}/userAccounts/profile`,values).then((response)=>{
            setAuthState({
                ...authState,
                userName:response.data.userAccount.userName,
                FirstName:response.data.user.FirstName,
                LastName:response.data.user.LastName,
                country:response.data.user.Country,
                email:response.data.user.Email,
                phone:response.data.user.PhoneNumber,
            })
            setIsEdit(false)
            setLoading(false);
        })  
  }

  return (
    <>
        <div className={style.mainCont}>
            <div className={style.imgCont}>
                <img src={coverImg} className={style.coverImg}/>
                <button className={style.edit} type="button" onClick={()=>{setIsEdit(!isEdit)}}>
                <img src={editIcon}/>
                <span>Edit</span>
                </button>
                <div className={style.lowerCont}>
                    <img src={`${host}/Images/${avatar}`} className={style.proPic}/>
                    <div className={style.nameCont}>
                        <span className={style.name}>{authState.FirstName} {authState.LastName}</span>
                        <span className={style.role}>{authState.userRole}</span>
                    </div>
                </div>
            </div>
            <div className={style.detailsCont}>
            <div className={style.line}></div>
                {loading && <Spinner loading={loading}/>}
                {!isEdit?
                <div className={style.detailsSecondCont}>
                    <div className={style.detailsInnerCont}>
                        <Detail label="First Name :" value={authState.FirstName}/>
                        <Detail label="Last Name :" value={authState.LastName}/>
                        <Detail label="Country :" value={authState.country}/>
                    </div>
                    <div className={style.detailsInnerCont}>
                        <Detail label="User Name :" value={authState.userName}/>
                        <Detail label="E-mail :" value={authState.email}/>
                        <Detail label="Phone Number :" value={authState.phone}/>
                    </div>
                </div>
                    :        
            <Formik initialValues={authState} onSubmit={handleSubmit}>
            {(formikValues) => (
              <Form>
              <div className={style.detailsSecondCont}>
                <div className={style.detailsInnerCont}>
                    <div className={style.detail}>
                        <div className={style.label}>First Name :</div>
                        <Field name="FirstName" type="text" className={style.input}/>
                    </div>
                    <div className={style.detail}>
                        <div className={style.label}>Last Name :</div>
                        <Field name="LastName" type="text" className={style.input}/>
                    </div>
                    <div className={style.detail}>
                        <div className={style.label}>Country :</div>
                        <Field name="country" type="text" className={style.input}/>
                    </div>
                </div>
                <div className={style.detailsInnerCont2}>
                    <div className={style.detail}>
                        <div className={style.label}>User Name :</div>
                        <Field name="userName" type="text" className={style.input}/>
                    </div>
                    <div className={style.detail}>
                        <div className={style.label}>E-mail :</div>
                        <Field name="email" type="text" className={style.input}/>
                    </div>
                    <div className={style.detail}>
                        <div className={style.label}>Phone Number :</div>
                        <Field name="phone" type="text" className={style.input}/>
                    </div>
                </div>
                <button className={style.save}>save</button>
              </div>
              
            </Form>
            )}
        
          </Formik>
         

                }
            </div>
        </div>
    </>
  )
}
