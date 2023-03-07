const checkMailData = (req, res, next) => {
  const { to, from, html, subject } = req.body;

  if (!to) return res.status(400).send({ error: "Missing 'to' field" });
  if (!from) return res.status(400).send({ error: "Missing 'from' field" });
  if (!html) return res.status(400).send({ error: "Mail body is empty" });
  if (!subject) return res.status(400).send({ error: "Missing subject field" }); //  ¿¿ subject obligatory ??
  next();
};

const convertArray = (arr) => {
  return arr.map(str => {
    return {path: str};
  });
}

/* const convertArraywhats = (arr) => {
  return arr.map(str => {
    return  {href: str};
  });
} */


const checkWhatsapp = (req, res, next) => {
  const { to, from, body } = req.body;

  if (!to) return res.status(400).send({ error: "Missing 'to' field" });
  if (!from) return res.status(400).send({ error: "Missing 'from' field" });
  if (!body) return res.status(400).send({ error: "Mail body is empty" });
   
  next();
};

module.exports = { checkMailData, convertArray,checkWhatsapp };
