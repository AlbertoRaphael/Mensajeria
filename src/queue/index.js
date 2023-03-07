require("dotenv").config();
const { REDIS_PORT, REDIS_HOST, REDIS_PASSWORD } = process.env;
const Queue = require("bull");
const sendMailQueue = new Queue("send mail queue", { redis: { port: REDIS_PORT, host: REDIS_HOST, password: REDIS_PASSWORD } });

module.exports = { sendMailQueue };
