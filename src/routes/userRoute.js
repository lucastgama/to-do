module.exports = (app) => {
  app.route("/").get(app.src.controllers.userControllers.save)
};
