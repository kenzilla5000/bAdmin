// /server.js


//====================
// Modules
// ===================
// 
// ----Express--------
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var methodOverride = require('method-override');
//-----Misc------------
var colors = require('colors');

var User = require('./app/models/model_users');

//===================
// Configuration
//===================
var app = express();
var config = require('./config');
var mongoose = require('mongoose');
// connect to database via mongoose
mongoose.connect(config.database);

// set body-parser to pull info from POSTs
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// enable CORS requests
app.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, \Authorization');
	next();
});

// log requests to console
app.use(morgan('dev'));

//===================
// Authentication
//===================
var jwt = require('jsonwebtoken');
var superSecret = config.secret;

//===================
// Routing
//===================
var adminRoutes = require('./app/routes/routes')(app, express);
app.use('/admin', adminRoutes);


//===================
// Server Startup
//===================
app.listen(config.port, config.loc);  // This command actually starts the server
console.log(("Server running at " + config.siteUrl + ":" + config.port + "").toString().rainbow); // Server-side confirmation, outputs to terminal
 