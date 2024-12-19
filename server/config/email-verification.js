require('dotenv').config();

// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.MYEMAIL,
//     pass: process.env.MYPASS,
//   },
// });

// const sendVerificationEmail =async (user, token) => {
//   const verificationLink = process.env.CLIENT_URL+`/verify-email?token=${token}`;

//   const mailOptions = {
//     from: process.env.MYEMAIL,
//     to: user.email,
//     subject: 'Email Verification',
//     html: `<h4>Hello ${user.firstname + user.lastname},</h4>
//            <p>This email is send to you by Eventify GCOEC for Email Verification.</p>
//            <p>Click the link below to verify your email:</p>
//            <a href="${verificationLink}">Verify Email</a>`,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Verification email sent:', info.response);
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// };

const sgMail = require('@sendgrid/mail');

// Set API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Send Email Function

const sendVerificationEmail =async (user, token) => {
  console.log("SendVErificationEmail function called");
  
  const verificationLink = process.env.CLIENT_URL+`/verify-email?token=${token}`;

    const msg = {
        to: user.email, // Recipient's email
        from: process.env.EMAIL_SENDER, // Sender's email
        subject: 'Email Verification - Campus Event',
        text: `Hi ${user.firstname},\n\nPlease verify your email by clicking the link below:\n${verificationLink}\n\nThank you!`,
        html: `
            <p>Hi ${user.firstname},</p>
            <p>Please verify your email by clicking the link below:</p>
            <a href="${verificationLink}" target="_blank">Verify Email</a>
            <p>Thank you!</p>
        `,
    };

  await sgMail
        .send(msg)
        .then(() => console.log('Verification email sent'))
        .catch((error) => console.error('Error sending email:', error.response.body));
};


module.exports = {sendVerificationEmail}