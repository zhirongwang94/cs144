var express = require('express');
var router = express.Router();
let client = require('../db');
const commonmark = require('commonmark');

const reader = new commonmark.Parser();
const writer = new commonmark.HtmlRenderer();

/* GET home page. */
router.get('/:username', (req, res) => {
    let db_posts = client.db('BlogServer').collection('Posts');
    db_posts.find({username: req.params.username}).toArray((err, docs) => {
        res.json(docs);
        // res.send("username: " + req.params.username);
    });
});


// router.get('/:username/:postid', (req, res) => {
//     let db_posts = client.db('BlogServer').collection('Posts');
//     db_posts.find({username: req.params.username, postid: parseInt(req.params.postid)}).toArray((err, docs) => {
//         res.json(docs);
//         // res.send("here your are" + req.params.postid);
//     });
// });

/* GET home page. */
router.get('/:username/:postid', (req, res) => {
    let db_posts = client.db('BlogServer').collection('Posts');
    db_posts.findOne({username: req.params.username, postid: parseInt(req.params.postid)}).then((post) => {
    	if(post==null){
    		res.status(404); 
    		res.send("No Post Found");
    	}
    	else{
    		res.status(200);
    		post.title = writer.render(reader.parse(post.title));
    		post.body = writer.render(reader.parse(post.body));
    		const posts = [post];
    		res.render('post', {posts: posts});
    	}
    });
});



module.exports = router;