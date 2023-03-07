require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/mailApi`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(file => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
  .forEach(file => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map(entry => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Mail, Attachment } = sequelize.models;

Mail.hasMany(Attachment, { timestamps: false });
Attachment.belongsTo(Mail, { timestamps: false });





const insertMailIntoDB = async (mail, wasSent) => {
  const { to, from, subject, html, attachments } = mail;
  const newMail = await Mail.create({
    to: to,
    from: from,
    message: html,
    subject: subject,
    wasSent: wasSent,
  });
  if (attachments) {
    let newAttachment = "";
    const attachmentsArr = attachments.map(str => str.content);

    attachmentsArr.forEach(async str => {
      // binary = Buffer.from(str, "base64");
      newAttachment = await Attachment.create({ name: str });
      await newMail.addAttachment(newAttachment);
    });
  }
};
module.exports = {
  ...sequelize.models,
  conn: sequelize,
  insertMailIntoDB,
};
