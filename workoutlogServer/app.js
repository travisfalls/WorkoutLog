//connecting express
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db.js');
var User = sequelize.import('./models/user');

User.sync(); // sync( {force: true}) WARNING: This will DROP the table!

app.use(bodyParser.json());

//connects app to middleware's headers JS file
app.use(require('./middleware/headers'));

//prints message on AJAX call to api/test
app.use('/api/test', function(req, res){
	res.send("Hello World");
});

//tells server to run on localhost: 3000 and prints success message in console
app.listen(3000, function () {
	console.log("app is listening on 3000");
});

app.post('/api/user', function(req, res) {
	var username = req.body.user.username;
	var pass = req.body.user.password;
	
	User.create({
		username: username,
		passwordhash: ""
	}).then(
		function createSuccess(user){
			res.json({
				user: user,
				message: 'create'
			});
		},
		function createError(err){
			res.send(500, err.message);
		}
	);
});