require('dotenv').config();

const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MYEMAIL,
    pass: process.env.MYPASS,
  },
});

const sendVerificationEmail =async (user, token) => {
  const verificationLink = process.env.CLIENT_URL+`/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.MYEMAIL,
    to: user.email,
    subject: 'Email Verification',
    html: `<h4>Hello ${user.firstname + user.lastname},</h4>
           <p>This email is send to you by Eventify GCOEC for Email Verification.</p>
           <p>Click the link below to verify your email:</p>
           <a href="${verificationLink}">Verify Email</a>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = {sendVerificationEmail}