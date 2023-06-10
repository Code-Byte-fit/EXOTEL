const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'exotelhotel2@gmail.com',
      pass: 'kvyrkigwoxvsltpw',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const sendEmail=(destination,content)=>{
    transporter.sendMail({
        from: 'exotelhotel2@gmail.com',
        to: destination,
        subject: 'Reservation Confirmation',
        html: content,
      }, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
  }

  module.exports = sendEmail;