const server = require("./src/server.js");
const { conn } = require("./src/db/index.js");

const port = process.env.PORT || 3001;

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(port, () => {
    console.log(`%s listening at ${port} Conection Succesful MAIL SERVICE!`); // eslint-disable-line no-console
  });
});
