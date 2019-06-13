require('./config/config');

// Packages
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Custom modules
var { mongoose } = require('./database/mongoose');

// Packages middlewares
app.use(bodyParser.json());

// Custom middlewares

// Routes


app.listen(process.env.PORT, () => {
    console.log(`Started on port ${process.env.PORT}`);
});

module.exports = {
    app
};