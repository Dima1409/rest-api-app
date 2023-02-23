const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SEND_GRID_API_KEY } = process.env;

sgMail.setApiKey(SEND_GRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "dmytrolevchenko22@meta.ua" };
  // eslint-disable-next-line no-useless-catch
  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
