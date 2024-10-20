const express = require("express");

const mainApi = require('./router/mainApi');
const authApi = require('./router/authApi');
const yasApi = require('./router/yasApi');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cors = require("cors");

const app = express();
app.use(cors());

app.use('/api', mainApi)
app.use('/api/auth', authApi)
app.use('/api/yas', yasApi)

app.use(express.json());

module.exports = app;
