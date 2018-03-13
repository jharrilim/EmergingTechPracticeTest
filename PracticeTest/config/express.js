const config = require("./config");
const express = require("express");
const morgan = require("morgan");
const compress = require("compression");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require('connect-flash');

module.exports = () => {
    const app = express();
    if (process.env.NODE_ENV == "development") {
        app.use(morgan("dev"));
    }
    else if (process.env.NODE_ENV == "production") {
        app.use(compress());
    }
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(methodOverride("_method"));
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    app.set("views", "./app/views");
    app.set("view engine", "ejs");
    app.use(flash());
    app.engine("html", require("ejs").renderFile);

    require("../app/routes/task.server.routes")(app);
    app.use(express.static("./public"));
    return app;
};