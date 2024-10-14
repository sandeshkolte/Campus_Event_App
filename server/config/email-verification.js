require('dotenv').config();

const nodemailer = require('nodemailer');

const sendVerificationEmail = (user, token) => {
  const verificationLink = process.env.CLIENT_URL+`/verify-email?token=${token}`;
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MYEMAIL,
      pass: process.env.MYPASS,
    },
  });

  const mailOptions = {
    from: process.env.MYEMAIL,
    to: user.email,
    subject: 'Email Verification',
    html: `<h4>Hello ${user.firstname + user.lastname},</h4>
           <p>This email is send to you by Eventify GCOEC for Email Verification.</p>
           <p>Click the link below to verify your email:</p>
           <a href="${verificationLink}">Verify Email</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Verification email sent:', info.response);
    }
  });
};

module.exports = {sendVerificationEmail}