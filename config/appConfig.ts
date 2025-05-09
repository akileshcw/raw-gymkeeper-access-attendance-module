const dotenv = require("dotenv");
dotenv.config();

const appConfig = {
  port: process.env.PORT || 3001,
  paymentThreshold: process.env.PAYMENT_THRESHOLD || 1000, // Threshold in your currency
};

module.exports = appConfig;
