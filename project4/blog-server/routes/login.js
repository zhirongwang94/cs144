var express = require('express');
var router = express.Router();
let client = require('../db');
const bcrypt = require('bcryptjs');
var bodyParser = require('body-parser')
const commonmark = require('commonmark');
// const generateToken = require('./generateToken');

const reader = new commonmark.Parser();
const writer = new commonmark.HtmlRenderer();

const jwt_token = require('jsonwebtoken');
const jwt_key='C-UFRaksvPKhx1txJYFcut3QGxsafPmwCY6SCly3G6c';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('login.html', { root: '.' });
});

/* POST method */
router.post('/', function(req, res, next) {


  if(req.body.username === null || req.body.password === null){
  	res.status(401); 
    res.end("please enter username and password");
  }


  else{
    let db_users = client.db('BlogServer').collection('Users');

    db_users.findOne({username: req.body.username}).then((user) => {
        if(user === null){
        	res.status(401); //Unauthorized
          res.redirect(req.baseUrl + "/");
        }

        else{

			    var passwordIsCorrect = bcrypt.compareSync(req.body.password, user.password);

			    if(!passwordIsCorrect){
            res.status(401);
            res.redirect(req.baseUrl + "/");
			    }
         
			    else{  // password is correct
            const jwt = jwt_token.sign({usr: req.body.username}, jwt_key, {expiresIn: '2h'});
            res.cookie('jwt', jwt, {expires: new Date(Date.now() + '2h'),	});

            if (req.query.redirect === undefined){
              res.status(200); //ok
              res.send("hello, " + req.body.username + " you succeed to login ");
            }

            else{ //redirect is specified
              res.status(302); //found
              res.redirect(req.query.redirect);
            }

			    }

        }

    });
  }


});


module.exports = router;


