const jwt = require('jsonwebtoken');
const jwt_key='C-UFRaksvPKhx1txJYFcut3QGxsafPmwCY6SCly3G6c';


function auth(req, res, next){
	console.log("hello from auth.js");

	//now i can access the token 
	let jwt_cookie = req.cookies['jwt'];
	let username = req.query.username; 
	
	// invalid token - synchronous
	try {
	  var payload = jwt.verify(jwt_cookie, jwt_key);
	} catch(err) {
	  console.log("invalid token");
	}

	console.log("auth Your cookie: " + jwt);
	console.log("username : " + username);
	console.log("payload.username: " + payload.username);

	if(payload.username == req.query.username){
		next();
	}else{
		res.status(401); //Unauthorized
		console.log("Unauthorized");
		res.end("Unauthorized");
	}
	

	// res.clearCookie('token');
	// console.log("Your cookie: " + req.cookies['token']);
	// 1. get jwt from cookie (req.cookies.jwt)
	// 2. get username (GET, DELETE, POST: consider both query and post)

	// 3. JWT.verify(jwt, jwt_key) => payload(json file)
	// 4. payload.usr==username 

}

module.exports = auth;


//curl --request GET --cookie "jwt_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNzMTQ0IiwiaWF0IjoxNjIwNjM1OTM3LCJleHAiOjE2MjA2NDMxMzd9.zL_LtcrmF5J94OWa3GrrRtEsVsW9fR5xaB9Z3pErZmk" http://localhost:3000/api/posts?username=cs144\&postid=1