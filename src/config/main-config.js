require("dotenv").config();

const path = require("path");
const viewsFolder = path.join(__dirname, "..", "views");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("express-flash");
const async = require('async');
const expressValidator = require("express-validator");

module.exports = {

    init(app, express){
         app.set("views", viewsFolder);
         app.set("view engine", "ejs");
         app.use(bodyParser.json())
         app.use(bodyParser.urlencoded({ extended: true }));
         app.use(express.static(path.join(__dirname, "..", "assets")));
         app.use(expressValidator());

  }
};
