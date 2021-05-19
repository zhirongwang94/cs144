const jwt = require('jsonwebtoken');
const jwt_key='C-UFRaksvPKhx1txJYFcut3QGxsafPmwCY6SCly3G6c';

// if the jwt cookie is not included in the HTTP header, 
// if the included jwt has expired, 
// or if the username in jwt does not match the username in the path or the body
// return 401, not authorized 
function auth(req, res, next){
	console.log("hello from auth.js");

	
	//case1: if the jwt cookie is not icluded in the HTTP header 
	if(!req.cookies['jwt']){ 
		console.log("jwt cookie is not included");
		res.status(401); //Unauthorized
		res.end("Unauthorized");
	}

	//case2: verify jwt cookie  
	else{
		let jwt_cookie = req.cookies['jwt'];

		// invalid token - synchronous
		try {
			var payload = jwt.verify(jwt_cookie, jwt_key);
			console.log("body: ");
			console.dir(req.body);

			if(payload.username == req.query.username ||  payload.username == req.body.username ){
				next();
			}else{
				console.log("the username in jwt does not match the username in the path or in the body");
				res.status(401); //Unauthorized
				res.end("Unauthorized");
			}

		} catch(err) {//if the jwt cookie is
			console.log("invalid jwt token, or the tokem has expired");
			res.status(401); //Unauthorized
			res.end("Unauthorized");
		}
  

	}
	

	
	


}

module.exports = auth;

	// res.clearCookie('token');
	// console.log("Your cookie: " + req.cookies['token']);
	// 1. get jwt from cookie (req.cookies.jwt)
	// 2. get username (GET, DELETE, POST: consider both query and post)

	// 3. JWT.verify(jwt, jwt_key) => payload(json file)
	// 4. payload.usr==username 