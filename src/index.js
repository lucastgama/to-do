const app = require("express")();
const consign = require("consign");
const db = require("./config/db");

const port = 3000;
app.db = db;

consign()
  .include("./src/config/passport.js")
  .then("./src/config/validations.js")
  .then("./src/config/")
  .then("./src/controllers/")
  .then("./src/controllers/auth.js")
  .then("./src/routes/")
  .into(app);

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
