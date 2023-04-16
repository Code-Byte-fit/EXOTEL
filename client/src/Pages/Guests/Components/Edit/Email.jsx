import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';

export default function Email(props) {
  const emails = props.values.GuestEmails;
  const phones = props.values.GuestPhoneNumbers;

  const [emailEditValue, setEmailEditValue] = useState('');
  const [phoneEditValue, setPhoneEditValue] = useState('');

  const handleRemoveEmail = (id) => {
    // Remove the email with the specified id from the list
    props.setValues((values) => ({
      ...values,
      GuestEmails: values.GuestEmails.filter((email) => email.id !== id),
    }));
  };

  const handleEditEmail = (id, newValue) => {
    // Update the email with the specified id to the new value
    props.setValues((values) => ({
      ...values,
      GuestEmails: values.GuestEmails.map((email) =>
        email.id === id ? { ...email, email: newValue } : email
      ),
    }));
  };

  const handleRemovePhone = (id) => {
    // Remove the phone number with the specified id from the list
    props.setValues((values) => ({
      ...values,
      GuestPhoneNumbers: values.GuestPhoneNumbers.filter(
        (phone) => phone.id !== id
      ),
    }));
  };

  const handleEditPhone = (id, newValue) => {
    // Update the phone number with the specified id to the new value
    props.setValues((values) => ({
      ...values,
      GuestPhoneNumbers: values.GuestPhoneNumbers.map((phone) =>
        phone.id === id ? { ...phone, phoneNumber: newValue } : phone
      ),
    }));
  };

  return (
    <>
      <div>E-mails</div>
      {emails.map((email) => {
        return (
          <div key={email.id}>
            {email.id === emailEditValue ? (
              <>
                <input
                  type="text"
                  value={email.email}
                  onChange={(e) => setEmailEditValue(e.target.value)}
                />
                <button
                  onClick={() => handleEditEmail(email.id, emailEditValue)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{email.email}</span>
                <button onClick={() => handleRemoveEmail(email.id)}>
                  Remove
                </button>
                <button onClick={() => setEmailEditValue(email.id)}>
                  Edit
                </button>
              </>
            )}
          </div>
        );
      })}
      <div>Phone-Nos</div>
      {phones.map((phone) => {
        return (
          <div key={phone.id}>
            {phone.id === phoneEditValue ? (
              <>
                <input
                  type="text"
                  value={phone.phoneNumber}
                  onChange={(e) => setPhoneEditValue(e.target.value)}
                />
                <button
                  onClick={() => handleEditPhone(phone.id, phoneEditValue)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{phone.phoneNumber}</span>
                <button onClick={() => handleRemovePhone(phone.id)}>
                  Remove
                </button>
                <button onClick={() => setPhoneEditValue(phone.id)}>
                  Edit
                </button>
              </>
            )}
          </div>
        );
      })}
    </>
  );
}
