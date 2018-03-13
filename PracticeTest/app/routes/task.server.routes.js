const tasks = require("../controllers/task.server.controller");
const index = require("../controllers/index.server.controller");

module.exports = (app) => {
    app.route("/").get(index.render);
    app.route("/tasks").get(index.renderAdd);
    app.route("/tasks").post(tasks.createTask);
    app.route('/list_tasks').get(tasks.readTasks);
    app.route('/list_tasks').put(tasks.updateTask);
    app.route('/list_tasks').delete(tasks.deleteTask);
};
