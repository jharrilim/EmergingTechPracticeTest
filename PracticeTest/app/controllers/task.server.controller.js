const Task = require("mongoose").model("Task");

module.exports.createTask = (req, res, next) => {
    unsetEmptyDates(req.body);
    const task = new Task(req.body);
    task.save((err) => {
        if (err) {
            return next(err);
        } else {
            res.json(task);
        }
    });
};

module.exports.readTasks = (req, res, next) => {
    console.log("in readTasks");
    Task.find({}, function (err, tasks) {
        console.log(tasks);
        if (err) {
            console.log(`Error in readTasks: ${err}`);
            return next(err);
        } else {
            res.render("tasks", {
                title: "Tasks",
                tasks: tasks
            });
        }
    });
};

function unsetEmptyDates(body) {
    if (body.startDate == null || body.startDate == "")
        body.startDate = undefined;
    if (body.endDate == null || body.endDate == "")
        body.endDate = undefined;
}