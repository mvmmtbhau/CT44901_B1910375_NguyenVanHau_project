const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');
const path = require("path");


app.use(cors());
app.use("/image/", express.static(path.join(__dirname, "./uploads")));
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));

// Route
const route = require('./app/routes');

// Use route
route(app);

module.exports = app;