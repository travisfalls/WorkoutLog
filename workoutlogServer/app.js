//connecting express
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

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

var Sequelize = require('sequelize');
var sequelize = new Sequelize('workoutlog', 'postgres', 'Letmein1234!', {
	host: 'localhost',
	dialect: 'postgres'
});

sequelize.authenticate().then(
	function() {
		console.log('connected to workoutlog postgres db');
	},
	function(err){
		console.log(err);
	}
);

//build a user model in sqllize
	var User = sequelize.define('user', {
		username: Sequelize.STRING,
		passwordhash: Sequelize.STRING,
	});

//creates a table in postgres and matches the model we defined
User.sync();
//User.sync({force:true});

app.use(bodyParser.json());

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