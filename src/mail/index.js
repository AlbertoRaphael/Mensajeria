const nodemailer = require("nodemailer");
require("dotenv").config();
const { MAIL_USER, MAIL_PASSWORD, MAIL_HOST, MAIL_PORT } = process.env;

const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
});

const sendMail = async mail => {
  try {
    await transporter.sendMail(mail);
    return true;
  } catch (error) {
    return false;
  }
};
module.exports = { transporter, sendMail };
