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
                tasks: tasks,
                msg: req.flash("msg")
            });
        }
    });
};

module.exports.updateTask = (req, res, next) => {
    Task.findOneAndUpdate({taskId: req.body.originalTaskId}, req.body, (err) => {
        if (err) {
            console.log("Error finding and updating stuff");
            return next(err);
        }
        req.flash("msg", `Task "${req.body.originalTaskId}" updated successfully!`);
        res.redirect("/list_tasks");
    });
};

module.exports.deleteTask = (req, res, next) => {
    Task.findOneAndRemove({ taskId: req.body.taskId }, req.body, (err) => {
        if (err) {
            console.log("Error finding and deleting stuff");
            return next(err);
        }
        req.flash("msg", `Task "${req.body.originalTaskId}" deleted successfully!`);
        res.redirect("/list_tasks");
    });
};

function unsetEmptyDates(body) {
    if (body.startDate == null || body.startDate == "")
        body.startDate = undefined;
    if (body.endDate == null || body.endDate == "")
        body.endDate = undefined;
}