module.exports.render = (req, res) => {
    res.render("index", { title: "Sample Test" });
};

module.exports.renderAdd = (req, res) => {
    res.render("add_task", { title: "Add New Task" });
};

