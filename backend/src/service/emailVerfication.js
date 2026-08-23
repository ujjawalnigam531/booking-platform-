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
  subject: 'Your OTP Code - TurfBook',
  text: `your otp is ${otp}`,
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0; padding:0; background-color:#f4f5f7; font-family: 'Segoe UI', Arial, sans-serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f5f7; padding:40px 0;">
        <tr>
          <td align="center">
            <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.06);">
              
              <!-- Header -->
              <tr>
                <td style="background-color:#1a73e8; padding:24px 32px;">
                  <h1 style="margin:0; color:#ffffff; font-size:20px; font-weight:600;">
                    TurfBook
                  </h1>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:32px;">
                  <h2 style="margin:0 0 12px; color:#1a1a1a; font-size:18px;">
                    Verify Your Email
                  </h2>
                  <p style="margin:0 0 24px; color:#555555; font-size:14px; line-height:1.6;">
                    Use the OTP below to complete your verification. This code is valid for the next 10 minutes.
                  </p>

                  <!-- OTP Box -->
                  <div style="background-color:#f0f4ff; border:1px dashed #1a73e8; border-radius:6px; padding:16px; text-align:center; margin-bottom:24px;">
                    <span style="font-size:32px; font-weight:700; letter-spacing:8px; color:#1a73e8;">
                      ${otp}
                    </span>
                  </div>

                  <p style="margin:0 0 8px; color:#777777; font-size:13px; line-height:1.5;">
                    Didn't request this code? You can safely ignore this email.
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color:#f9fafb; padding:20px 32px; text-align:center;">
                  <p style="margin:0; color:#999999; font-size:12px;">
                    &copy; ${new Date().getFullYear()} TurfBook. All rights reserved.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,
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