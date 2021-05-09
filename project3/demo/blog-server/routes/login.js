var express = require('express');
var router = express.Router();
let client = require('../db');
const bcrypt = require('bcryptjs');
var bodyParser = require('body-parser')
const commonmark = require('commonmark');

const reader = new commonmark.Parser();
const writer = new commonmark.HtmlRenderer();

const jwt = require('jsonwebtoken');
const jwt_key='C-UFRaksvPKhx1txJYFcut3QGxsafPmwCY6SCly3G6c';


// console.log("Hello from login");
// var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync("password", salt);
// console.log("hash: " + hash);

// var hash_str = "$2a$10$2DGJ96C77f/WwIwClPwSNuQRqjoSnDFj9GDKjg6X/PePgFdXoE4W6";
// var result = bcrypt.compareSync("password", hash_str);
// console.log("result:" + result);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile("login.html");  
});


router.post('/', function(req, res, next) {


// TODO, 
  if(!req.body.username || !req.body.password){
  	res.status(404); 
	res.send("username or password is undefined");
	// res.end("yes");
  }
  else if(req.body.username === "" || req.body.password === ""){	
  	res.status(404); 
	res.send("username or password is empty string");
  }
  else if(req.body.password === "gotogoogle"){
  	res.status(200); 
  	res.redirect("https://www.google.com"); // this works
  }
  else{
  	res.status(200); 

    let db_users = client.db('BlogServer').collection('Users');
    db_users.findOne({username: req.body.username}).then((user) => {
        if(user==null){
        	res.status(404);
        	res.send("No user found");
        }

        else{
        	res.status(200);
        	user.username = writer.render(reader.parse(user.username));
        	user.password = writer.render(reader.parse(user.password));
        	var hash = String(user.password);
        	hash = hash.substring(3, hash.length-5)

        	var salt = bcrypt.genSaltSync(10);

			var passwordIsCorrect = bcrypt.compareSync(req.body.password, hash);

			console.log("hash:" + hash);
			if(passwordIsCorrect){
				console.log("password is correct");
			}
			else{
				console.log("Wrong password");
			}
        	res.send(user.username + user.password);

        }

    });


  	console.log("User name = "+ req.body.username +", password is "+req.body.password);
  }


});

// router.get('/:username/:postid', (req, res) => {
//     let db_posts = client.db('BlogServer').collection('Posts');
//     db_posts.findOne({username: req.params.username, postid: parseInt(req.params.postid)}).then((post) => {
//     	if(post==null){
//     		res.status(404); 
//     		res.send("No Post Found");
//     	}
//     	else{
//     		res.status(200);
//     		post.title = writer.render(reader.parse(post.title));
//     		post.body = writer.render(reader.parse(post.body));
//     		const posts = [post];
//     		res.render('post', {posts: posts});
//     	}
//     });
// });

module.exports = router;

