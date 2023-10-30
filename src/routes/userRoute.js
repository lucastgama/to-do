module.exports = (app) => {
  app.post("/signup", app.src.controllers.userControllers.save);
  app.post("/signin", app.src.controllers.auth.signin);
  app.post("/validateToken", app.src.controllers.auth.validateToken);

  app
    .route("/users")
    .all(app.src.config.passport.authenticate())
    .get(app.src.controllers.userControllers.getAllUser);

  app
    .route("/users/:id")
    .put(app.src.controllers.userControllers.save)
    .get(app.src.controllers.userControllers.getById)
    .delete(app.src.controllers.userControllers.remove);

  app
    .route("/task")
    .all(app.src.config.passport.authenticate())
    .post(app.src.controllers.taskControllers.save)
    .get(app.src.controllers.taskControllers.getAllTask);

  app
    .route("/task/:id")
    .all(app.src.config.passport.authenticate())
    .get(app.src.controllers.taskControllers.getById);
};
