var express = require('express');
require("dotenv").config();
require("./middleware/database").connect();
 
const bodyParser = require('body-parser');
var app = module.exports = express();
const path = require('path');
const cors = require("cors");
app.use(cors());
 
const mainApi = require('./router/mainApi')

const { API_PORT } = process.env;
const port = API_PORT;

var router = express.Router();
router.use(bodyParser.json())

// Let's make our express `Router` first.
var router = express.Router();
router.use(bodyParser.urlencoded({
  extended: true
}))
router.use(bodyParser.json())
router.get('/error', function(req, res, next) {
  // here we cause an error in the pipeline so we see express-winston in action.
  return next(new Error("This is an error and it should be logged to the console"));
});

router.use('/api', mainApi)

router.use(cors());
// express-winston logger makes sense BEFORE the router

// Now we can tell the app to use our routing code:
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}))
app.use('/upload', express.static('upload'));

app.use(router);

app.use('/uploads', express.static('uploads'));
// Optionally you can include your custom error handler after the logging.

app.listen(port, function(){
  console.log("logger listening on port %d in %s mode", this.address().port, app.settings.env);
});