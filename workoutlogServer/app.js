require('dotenv').config();
//connecting express
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db.js');
var User = sequelize.import(__dirname + '/models/user');

User.sync(); // sync( {force: true}) WARNING: This will DROP the table!

app.use(bodyParser.json());

//connects app to middleware's headers JS file
app.use(require('./middleware/headers'));
app.use(require('./middleware/validate-session'));

app.use('/api/user', require('./routes/user'));

//login route
app.use('/api/login', require('./routes/session'));

//prints message on AJAX call to api/test
app.use('/api/test', function(req, res){
	res.send("Hello World");
});

//tells server to run on localhost: 3000 and prints success message in console
app.listen(3000, function () {
	console.log("app is listening on 3000");
});