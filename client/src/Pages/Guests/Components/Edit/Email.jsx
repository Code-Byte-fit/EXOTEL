import React from 'react'
import {Formik,Form,Field} from "formik"

export default function Email(props) {
  const emails=props.values.GuestEmails;
  const phones=props.values.GuestPhoneNumbers;
  return (
    <>
    <div>E-mails</div>
       {emails.map(emails=>{
        return(
          <span key={emails.id}>{emails.email}</span>
        )
       })}
       <div>Phone-Nos</div>
       {phones.map(numbers=>{
        return(
          <span key={numbers.id}>{numbers.phoneNumber}</span>
        )
       })}
    </>
  )
}
