const { Router } = require("express");
const mailRouter = Router();
require('dotenv');
const { checkMailData, convertArray, checkWhatsapp } = require("../controller/index.js");
const { Whatsapp } = require("../db/index.js");
const TWILIO_ACCOUNT_SID ="ACe230a5b936de98a94095585b1ce02892"
const TWILIO_TOKEN ="ad2b1254ba8890504445b89d34a3089b"

const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_TOKEN);
//const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_TOKEN);

const { sendMail } = require("../mail/index.js");
const { insertMailIntoDB } = require("../db/index.js");
const { sendMailQueue } = require("../queue/index.js");

mailRouter.get("/", async (req, res) => {
  res.send("Hello Mail service");
});


sendMailQueue.process(async function (job, done) {
  const didSend = await sendMail(job.data);
  const attemps = job.attemptsMade;
  attemps == 0 || didSend ? await insertMailIntoDB(job.data, didSend) : null;
  if (didSend) {
    done(null, { message: "Email sent" });
    console.log(`${job.id} has completed`);
  } else {
    done(new Error("Something went wrong"));
  }
});

mailRouter.post("/", checkMailData, async (req, res) => {
  const mail = req.body;
  let formed_attachments;
  const mail_attachments = mail.attachments;

  mail_attachments ? (formed_attachments = convertArray(mail_attachments)) : "";
  mail.attachments = formed_attachments;

  await sendMailQueue.add(mail, { attempts: 3 });
  res.send(true);
});


//////////////////////////////servicio de Whatsapp///////////////////////////////////


mailRouter.get("/whatsapp", async (req, res) => {
  res.send("Hello WhatsappMail  service");
});




mailRouter.post('/whatsapp', checkWhatsapp, async (req, res) => {
  const bodymsg = req.body;
  console.log('this is the req', req.body);
  const { to, from, body } = req.body;
  let wasSent = false;
  let msg = bodymsg;
 
  try {
    client.messages.create(msg, async (err, info) => {
      if (err) {
        wasSent = false;
        console.log(err);
        res.status(400).send({ error: err.message });
      }
      wasSent = true;
      
      
      const newWhatsapp = await Whatsapp.create({
        to: to,
        from: from,
        message: body,
        wasSent: wasSent,
      });
     
      res.send({ message: "Whatsapp sent " + info?.response });
    //.then(message => console.log("Message sent successfully"))
        //.done();

    });

  } catch (error) {
    console.log(error);
    res.send({ error: error.message });
  }
});





module.exports = mailRouter;
