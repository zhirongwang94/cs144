var express = require('express');
var router = express.Router();
let client = require('../db');
const commonmark = require('commonmark');

const reader = new commonmark.Parser();
const writer = new commonmark.HtmlRenderer();


/* GET home page. */
router.get('/', (req, res) => {
    let db_posts = client.db('BlogServer').collection('Posts');
    db_posts.find().toArray((err, docs) => {
    	// "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNzMTQ0IiwiaWF0IjoxNjIwNjI0MTQ2LCJleHAiOjE2MjA2MzEzNDZ9.pU1_kz2Tov93LO8IUR8N1ysfsMRJB2GWVKrllMDTeBA"
		// console.dir(req.cookies);
  		console.log("INDEX ROUTER Your cookie: " + req.cookies['jwt_token']);
        res.json(docs);

        // res.send("username: " + req.params.username);
        //     res.cookie('cookiename', 'cookievalue1', { maxAge: 900000, httpOnly: true });
  		// res.clearCookie('token');
    });
});


module.exports = router;
