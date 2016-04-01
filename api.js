var express = require('express');
var app = express();

app.get('/',function(req,res){
	res.send('to go beyond this root for the API, you need to have basic authentication using base64 encoding');
});

app.get('/api/displayNames',function(req,res){
	if(req.headers.authorization === undefined){
		res.status(401).send('Please provide WWW-Authorization using basic in headers with base 64 encoding');
	}
	else
	{
		//grab the encoded value
		var encoded = req.headers.authorization.split(' ')[1];
		// decode it using base64
		var decoded = new Buffer(encoded,'base64').toString();
		var name = decoded.split(':')[0];
		var password = decoded.split(':')[1];
		// check if the passed username and password match with the values in our database.
		// this is dummy validation. 
		if(name === password){
		var namesObj = [{
		name: 'Eshwar',place: 'Hyderabad'},{name: 'Prasad',place: 'New York'},{name: 'Yaddanapudi',place: 'San Francisco'}];
		res.status(200).send(JSON.stringify(namesObj));		
		}
		else{
			res.status(403).send('Invalid authorization data provided. Please check username and pwd');
		}
	
	}
}).listen(3423);
console.log('waiting at 3423');