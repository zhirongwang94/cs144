var express = require('express');
var router = express.Router();
let client = require('../db');
const bcrypt = require('bcryptjs');
var bodyParser = require('body-parser')

const jwt = require('jsonwebtoken');
const jwt_key='C-UFRaksvPKhx1txJYFcut3QGxsafPmwCY6SCly3G6c';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile("login.html");  
});


router.post('/', function(req, res, next) {


// TODO, 
  if(!req.body.username || !req.body.password){
  	res.status(404); 
	res.send("username or password is undefined");
  }
  else if(req.body.username === "" || req.body.password === ""){	
  	res.status(404); 
	res.send("username or password is empty string");
  }
  else if(req.body.password === "password"){
  	res.status(200); 
  	res.redirect("https://www.google.com"); // this works
  }
  else{
  	res.status(200); 
  	console.log("User name = "+ req.body.username +", password is "+req.body.password);
  }


});



module.exports = router;

