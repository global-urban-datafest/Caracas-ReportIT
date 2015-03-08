
exports.algo = function(req, res){
	res.contentType('application/json');
	res.write(JSON.stringify(req.body.name));
	res.end();
}