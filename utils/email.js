// const nodemailer = require('nodemailer');
// const sendEmail = async (options) => {
//   //////////

//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   ///////////////
//   const mailOptions = {
//     from: 'Akshay Vaidya <akshayvaidya2003@gmail.com>',
//     to: options.email,
//     subject: options.subject,
//     text: options.messgae,
//   };

//   /////////////////////

//   await transporter.sendMail(mailOptions);

//   /////////////////////////////
// };

// module.exports = sendEmail;

// /////////////////////////////////////////
// /////////////////////////////////////////

// const nodemailer = require('nodemailer');

// const sendEmail = async (options) => {
//   // Ensure required environment variables are set
//   if (
//     !process.env.EMAIL_HOST ||
//     !process.env.EMAIL_PORT ||
//     !process.env.EMAIL_USERNAME ||
//     !process.env.EMAIL_PASSWORD
//   ) {
//     throw new Error(
//       'Missing required environment variables for email configuration',
//     );
//   }

//   try {
//     const transporter = nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port: process.env.EMAIL_PORT,
//       auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });

//     const mailOptions = {
//       from: 'Akshay Vaidya <akshayvaidya2003@gmail.com>',
//       to: options.email,
//       subject: options.subject,
//       text: options.message, // Fixed the spelling of 'message'
//     };

//     await transporter.sendMail(mailOptions);

//     console.log('Email sent successfully');
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw new Error('Failed to send email');
//   }
// };

// module.exports = sendEmail;

/////////////////////////////////
/////////////////////////////////

// const nodemailer = require('nodemailer');

// const sendEmail = async (options) => {
//   // Ensure required environment variables are set
//   if (
//     !process.env.EMAIL_HOST ||
//     !process.env.EMAIL_PORT ||
//     !process.env.EMAIL_USERNAME ||
//     !process.env.EMAIL_PASSWORD
//   ) {
//     throw new Error(
//       'Missing required environment variables for email configuration',
//     );
//   }

//   try {
//     const transporter = nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port: process.env.EMAIL_PORT,
//       auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });

//     const mailOptions = {
//       from: 'akshay vaidya <akshayvaidya2003@gmail.com>',
//       to: options.email,
//       subject: options.subject,
//       text: options.message, // Fixed the spelling of 'message'
//     };

//     await transporter.sendMail(mailOptions);

//     console.log('Email sent successfully');
//   } catch (error) {
//     console.error('Error sending email:', error);

//     if (error.response) {
//       console.error('Error response from email server:', error.response);
//     }

//     // Throw a custom error to be handled by the calling function
//     const customError = new Error(
//       'There was an error sending the email. Try again later.',
//     );
//     customError.statusCode = 500;
//     customError.isOperational = true;
//     throw customError;
//   }
// };

// module.exports = sendEmail;
const nodemailer = require('nodemailer');
const sendEmail = async (options) => {
  //////////

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  ///////////////
  const mailOptions = {
    from: 'Akshay Vaidya <akshayvaidya2003@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  /////////////////////

  await transporter.sendMail(mailOptions);

  /////////////////////////////
};

module.exports = sendEmail;
