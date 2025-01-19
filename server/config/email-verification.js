require('dotenv').config();

const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MYEMAIL,
    pass: process.env.MYPASS,
  },
});

// Configure SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Send Email Functions
const sendVerificationEmail = async (user, token) => {
  console.log("sendVerificationEmail function called");

  const verificationLink = process.env.CLIENT_URL + `/verify-email?token=${token}`;

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

  try {
    await sgMail.send(msg);
    console.log('Verification email sent');
  } catch (error) {
    console.error('Error sending email:', error.response.body);
  }
};


const sendWelcomeEmail = async (user) => {
  console.log("sendWelcomeEmail function called");

  const mailOptions = {
    from: process.env.MYEMAIL, // Sender's email
    to: user.email, // Recipient's email
    subject: 'Welcome to Campus Event - Eventify GCOEC',
    text: `Hi ${user.firstname},\n\nWelcome to Eventify! We are thrilled to have you on board.\n\nStay tuned for exciting events and opportunities. Feel free to explore our platform and make the most out of it.\n\nThank you!\nTeam Eventify GCOEC`,
    html: `
      <h4>Hi ${user.firstname},</h4>
      <p>Welcome to <strong>Eventify GCOEC</strong>! We are thrilled to have you on board.</p>
      <p>Stay tuned for exciting events and opportunities. Feel free to explore our platform and make the most out of it.</p>
      <p>Thank you!</p>
      <p><strong>Team Eventify GCOEC</strong></p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent:', info.response);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};


module.exports = { sendVerificationEmail, sendWelcomeEmail };
