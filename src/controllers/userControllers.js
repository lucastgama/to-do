const bcrypt = require("bcrypt");

module.exports = (app) => {
  const { notExists, notEquals } = app.src.config.validations;

  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const save = async (req, res) => {
    const user = { ...req.body };
    if (req.params.id) user.id = req.params.id;

    try {
      notExists(user.name, "Nome do usuário não adicionado");
      notExists(user.email, "E-mail do usuário não adicionado");
      notExists(user.password, "Senha do usuário não adicionado");
      notEquals(
        user.password,
        user.confirmPassword,
        "Senha do usuário não conferem"
      );
    } catch (error) {
      res.status(400).send(error);
    }

    user.password = encryptPassword(user.password);
    delete user.confirmPassword;

    if (user.id) {
      app
        .db("users")
        .update(user)
        .where({ id: user.id })
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    } else {
      app
        .db("users")
        .insert(user)
        .then((_) => res.status(204).send())
        .catch((err) => res.status(500).send(err));
    }
  };
  const getAllUser = (req, res) => {
    console.log(req.user)
    app
      .db("users")
      .select("id", "name", "email")
      .then((users) => res.json(users))
      .catch((err) => res.status(500).send(err));
  };

  const getById = (req, res) => {
    const userId = req.params.id;

    app
      .db("users")
      .where({ id: userId })
      .select("id", "name", "email")
      .then((users) => res.json(users))
      .catch((err) => res.status(500).send(err));
  };

  const remove = (req, res) => {
    const user = req.params.id;
  };

  return { save, getAllUser, getById, remove };
};
