const { authSecret } = require("../../.env");
const jwt = require("jwt-simple");
const bcrypt = require("bcrypt");

module.exports = (app) => {
  const signin = async (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send("Informe usuário e senha");
    }

    const user = await app.db("users").where({ email: req.body.email }).first();

    if (!user) return res.status(400).send("Usuário não encontrado!");

    const isMatch = bcrypt.compareSync(req.body.password, user.password);
    if (!isMatch) return res.status(401).send("Email/senha inválido");

    const now = Math.floor(Date.now() / 1000);

    const playload = {
      id: user.id,
      name: user.name,
      email: user.email,
      iat: now,
      exp: now + 60 * 60 * 24 * 3,
    };

    res.json({
      ...playload,
      token: jwt.encode(playload, authSecret),
    });
  };

  const validateToken = async (req, res) => {
    const userData = req.body;

    try {
      if (userData) {
        const token = jwt.decode(userData.token, authSecret);
        if (new Date(token.exp * 1000) > new Date()) {
          return res.send(true);
        }
      }
    } catch (error) {
      //problema com o token
    }
    res.send(false);
  };

  return { signin, validateToken };
};
