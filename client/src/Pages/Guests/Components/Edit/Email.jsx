import React, { useState } from 'react';

export default function Email(props) {
  const [emails,setEmails] = useState(props.values.GuestEmails);
  const [phones,setPhones] = useState(props.values.GuestPhoneNumbers);
  const [editEmailOpts, setEditEmailOpts] = useState(emails.map(() => false));
  const [editPhoneOpts, setEditPhoneOpts] = useState(phones.map(() => false));
  const [emailValue,setEmailValue]=useState("")
  
  const EditEmailOpt=(index)=>{
    const newEditEmailOpts = editEmailOpts.map((currentElement, i) => i === index);
    setEditEmailOpts(newEditEmailOpts);
  }

  const EditPhoneOpt=(index)=>{
    const newEditPhoneOpts = editPhoneOpts.map((currentElement, i) => i === index);
    setEditPhoneOpts(newEditPhoneOpts);
  }

  const handleEmailEdit=(index,value)=>{
          const newEmails = [...emails];
          newEmails[index].email = value;
          setEmails(newEmails)
          const newEditOpts = [...editEmailOpts];
          newEditOpts[index] = false;
          setEditEmailOpts(newEditOpts);
  }

  


  return (
    <>
      <div>E-mails</div>
      {emails.map((email,index) => {
        return (
          <div key={email.id}>
            {!editEmailOpts[index]?<span>{email.email}</span>:<input defaultValue={emailValue} onChange={(e)=>setEmailValue(e.target.value)} />}
            {!editEmailOpts[index]?
              <><button onClick={() => EditEmailOpt(index)}>edit</button>
              <button>remove</button></>:
              (<>
              <button onClick={() =>handleEmailEdit(index,emailValue)}>done</button>
              <button>cancel</button>
              </>)
            }
          </div>
        );
      })}
      <div>Phone-Nos</div>
      {phones.map((phone,index) => {
        return (
          <div key={phone.id}>
            {!editPhoneOpts[index]?<span>{phone.phoneNumber}</span>:<input defaultValue={phone.phoneNumber}/>}
            <button onClick={() => EditPhoneOpt(index)}>edit</button>
            <button>remove</button>
          </div>
        );
      })}
    </>
  );
}
