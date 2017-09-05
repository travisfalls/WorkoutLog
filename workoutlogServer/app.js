//connecting express
var express = require('express');
var app = express();

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