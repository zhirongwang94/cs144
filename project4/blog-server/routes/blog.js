var express = require('express');
var router = express.Router();
let client = require('../db');
const commonmark = require('commonmark');

const reader = new commonmark.Parser();
const writer = new commonmark.HtmlRenderer();

/* GET home page. */
router.get('/:username', (req, res) => {
    if(!req.params.username){
        res.status(404); // unfound
        res.send(":username is missing");
        console.log(":username is missing");
    }
    let db_posts = client.db('BlogServer').collection('Posts');
    db_posts.find({username: req.params.username}).toArray((err, docs) => {
        console.dir(docs);
        // res.json(docs);  
        var posts = [];
        for (const post of docs){
            console.log("hello from blog.js");
            console.dir(post);
            res.status(200);

            var created = new Date();
            created.setTime(parseInt(post.created))
            created_string = created.toUTCString()

            var modified = new Date();
            modified.setTime(parseInt(post.created))
            modified_string = created.toUTCString()

            post.title = writer.render(reader.parse(post.title));
            post.body = writer.render(reader.parse(post.body));
            post.username = writer.render(reader.parse(post.username));
            post.postid = writer.render(reader.parse(String(post.postid)));
            post.modified = writer.render(reader.parse(modified_string));
            post.created = writer.render(reader.parse(created_string));

            posts.push(post);
        }

        let length = posts.length;

        let start = 0; 
        if(req.query.start && parseInt(req.query.start) > 0 ){
            start = Math.min(req.query.start, posts.length);
        }

        let end = Math.min(start+10, posts.length); 

        let next = './';
        if ( parseInt(start)+5 < posts.length ){
            next = './' + req.params.username + '?start=' + String(parseInt(start) + 5);
        }
        else{
            next = './' + req.params.username +'?start=' + String(parseInt(start));
        }

        
        
        console.log("start: " + start + " end: " + end );

        res.render('post', 
            {posts: posts,
             start: start,
             end: end, 
             next: next,
        });
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
            console.log("hello from blog.js");
            // console.dir(post);
    		res.status(200);
            
            var created = new Date();
            created.setTime(parseInt(post.created))
            created_string = created.toUTCString()

            var modified = new Date();
            modified.setTime(parseInt(post.created))
            modified_string = created.toUTCString()

            console.log(created_string);

    		post.title = writer.render(reader.parse(post.title));
    		post.body = writer.render(reader.parse(post.body));
            post.username = writer.render(reader.parse(post.username));
            post.postid = writer.render(reader.parse(String(post.postid)));
            post.modified = writer.render(reader.parse(modified_string));
            post.created = writer.render(reader.parse(created_string));

    		const posts = [post];


            //
            let start = 0; 
            let end = 1;
            let next = './' + req.params.postid;

            console.log("start: " + start + " end: " + end );

    		res.render('post', 
                {posts: posts,
                start: start,
                end: end,  
                next: next,
            });
    	}
    });
});



module.exports = router;