const nodemailer=require('nodemailer')
require('dotenv').config();
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,   
    pass: process.env.EMAIL_PASS    
  }
});


function mail(userEmail){
    const otp=Math.floor(Math.random()*1000000)

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'otp mail',
      text: `your otp is ${otp}`,
      
    };
    
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
    return otp
}

module.exports={mail};