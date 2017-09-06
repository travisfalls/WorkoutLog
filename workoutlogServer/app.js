require('dotenv').config();
//connecting express
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db.js');
var User = sequelize.import(__dirname + '/models/user');

//User.sync(); //sync( {force: true}) WARNING: This will DROP the table!
sequelize.sync();

app.use(bodyParser.json());

//connects app to middleware's headers JS file
app.use(require('./middleware/headers'));
app.use(require('./middleware/validate-session'));

app.use('/api/user', require('./routes/user'));
app.use('/api/login', require('./routes/session'));
app.use('/api/definition', require('./routes/definition'));
app.use('/api/log', require('./routes/log'));

//tells server to run on localhost: 3000 and prints success message in console
app.listen(3000, function () {
	console.log("app is listening on 3000");
});