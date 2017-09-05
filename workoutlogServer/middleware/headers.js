//allows access to all outside page requests and then goes on to check next module
module.exports = function(req, res, next) {
	res.header('access-control-allow-origin', '*');
	next();
};