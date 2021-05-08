var express = require('express');
var router = express.Router();
let client = require('../db');
const commonmark = require('commonmark');

const reader = new commonmark.Parser();
const writer = new commonmark.HtmlRenderer();


/* GET home page. */
router.get('/', (req, res) => {
    let db_posts = client.db('BlogServer').collection('Posts');
    db_posts.find({username: "cs144"}).then((post) => {
    	if(post==null){
    		res.status(404); 
    		res.send("No Post Found");
    	}
    	else{
    		res.status(200);
    		post.title = writer.render(reader.parse(post.title));
    		post.body = writer.render(reader.parse(post.body));
    		const posts = [post];
    		res.render('indexx', {posts: posts});
    	}
        // res.json(docs);
        // res.send("username: " + req.params.username);
        // res.render('indexx',doc[0]);
        // res.send("hello from index");
    });
});


module.exports = router;