const app = require("express")();
const consign = require("consign");
const db = require("./config/db");

const port = 3000;
app.db = db;

consign()
  .then("./src/config/middleware.js")
  .then("./src/controllers/")
  .then("./src/routes/")
  .into(app);

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
