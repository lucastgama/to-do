module.exports = (app) => {
  const { notExists } = app.src.config.validations;

  const save = (req, res) => {
    const task = { ...req.body };
    if (req.params.id) task.id = req.params.id;
    if (!req.user) return res.status(500).send("Usuário não encontrado");
    task.userId = req.user.id;

    try {
      notExists(task.name, "A atividade não possuí nome");
      notExists(task.description, "A atividade não uma drescrição");
    } catch (error) {
      res.status(400).send(error);
    }

    if (task.id) {
      app
        .db("task")
        .update(task)
        .where({ id: task.id })
        .then((_) => {
          res.status(204).send("Atividade atualizada com sucesso");
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    } else {
      app
        .db("task")
        .insert(task)
        .then((_) => {
          res.status(204).send("Atividade inserida com sucesso");
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }
  };

  const getAllTask = (req, res) => {
    const userId = req.user.id;

    app
      .db("task")
      .select("name", "description", "completed", "created_at", "updated_at")
      .where({ userId: userId })
      .then((task) => {
        res.json(task);
      })
      .catch((err) => res.status(500).send(err));
  };

  const getById = (req, res) => {
    const userId = req.user.id;
    const taskId = req.params.id;

    app
      .db("task")
      .select("name", "description", "completed", "created_at", "updated_at")
      .where({ userId: userId, id: taskId })
      .then((task) => {
        res.json(task);
      })
      .catch((err) => res.status(500).send(err));
  };

  return { save, getAllTask, getById };
};
