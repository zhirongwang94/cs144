var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile("login.html");
});


router.post('/', function(req, res, next) {
  var user_name = req.body.user;
  var password = req.body.password;
  console.log("User name = "+user_name+", password is "+password);
  res.end("yes");
  
});

module.exports = router;

