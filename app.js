require('./config/config');

// Packages
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Custom modules
const { mongoose } = require('./database/mongoose');
const categoryRoutes = require('./routes/category');

// Packages middlewares
app.use(bodyParser.json());

// Custom middlewares

// Routes
app.use('/api/categories', categoryRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Started on port ${process.env.PORT}`);
});

module.exports = {
    app
};