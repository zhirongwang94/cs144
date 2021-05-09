var express = require('express');
var router = express.Router();
let client = require('../db');

const commonmark = require('commonmark');
const reader = new commonmark.Parser();
const writer = new commonmark.HtmlRenderer();


console.log("hello from api.js");
/* GET home page. */
router.get('/posts/', (req, res, next) => {
    // let db_posts = client.db('BlogServer').collection('Posts');
    // db_posts.find().toArray((err, docs) => {
    //     res.json(docs);
    //     // res.send("username: " + req.params.username);
    // });
    let username = req.query.username;
    let postid = req.query.postid; 

	let db_posts = client.db('BlogServer').collection('Posts');
    // case 1: GET /api/posts?username=:username:
    if(username && !postid){
    	console.log("case 1");
		db_posts.find({username: username}).toArray((err, docs) => {
    		res.json(docs);
		});
    }

    // case 2: GET /api/posts?username=:username&postid=:postid:
    else if(username && postid){
    	console.log("case 2" + "postid: " + postid );
		db_posts.find({username: username, postid: parseInt(postid)}).toArray((err, docs) => {
    		res.json(docs);
		});
    }


    else{
    	res.send("unkonw query");
    }
    // res.send("Your query username: " + username + "Your query username: " + postid + to_print);


});



router.delete('/posts', (req, res, next) => {
    let username = req.query.username;
    let postid = req.query.postid; 
   
    if(!username || !postid){
    	res.status(404);
    }

    let db_posts = client.db('BlogServer').collection('Posts');
    var delete_query = {username: username, postid: parseInt(postid)}
	db_posts.deleteOne(delete_query, function(err, docs) {
		if (err) throw err; 
		console.log("document deleted");
		res.json(docs);
	});
});

// case 5: POST /api/posts:
router.post('/posts', (req, res, next) => {
	// handle requests
    let username = req.body.username;
    let postid = req.body.postid; 
    let title = req.body.title;
    let body = req.body.body; 

    let cur_time = Date.now();

    console.log("username: " + username );
    console.log("postid: " + postid );
    console.log("title: " + title );
    console.log("body: " + body );
    // console.log("maxid: " + maxid );
    console.log("cur_time: " + cur_time );



    
    let db_posts = client.db('BlogServer').collection('Posts');

    // CASE 5-1: postid=0; insertOne() with postid=maxid+1, then update maxid in User connection 
    if(postid == 0){
    	let maxid = -1; 
	    // obtain the maxid for db
	    let find_query = {username: username};
	    db_posts.find(find_query).sort({postid:-1}).limit(1).toArray((err, docs) => {
	        res.json(docs);
	        maxid = docs[0].postid + 1;
	        console.log("output: "  + maxid);

	        var document_to_insert = { "postid" : maxid, 
	    					"username" : username, 
	    					"created" : cur_time, 
	    					"modified" : cur_time, 
	    					"title" : title, 
	    					"body" : body };

	    	db_posts.insertOne(document_to_insert);//TODO, CATCH ERROR 
	    });
    }



	// CASE 5-2: updataOne() 
	else if(postid > 0){
		let find_query = {username: username, postid: postid};
		db_posts.findOne(find_query).then((post) => {
	    	if(post==null){
	    		res.status(404); 
	    		res.send("No Post Found")
	    		console.log("No Post Found");
	    	}

	    	else{
	    		res.status(202); //OK 
	    		let filter = {username: username, postid: postid};
	    		let update = {$set: {title: title, modified: cur_time,body: body} }


			  	db_posts.updateOne(filter, update, function(err, res) {
				    if (err) throw err;
				    console.log("1 document updated");
			  	});
	    	}

	    });		
	}


});




    

    



module.exports = router;


// curl --request DELETE http://localhost:3000/api/posts?username=cs144\&postid=1


//curl --request POST --header "Content-Type:application/json" --data '{"username":"cs144", "postid": 1 , "title": "updated yourtitle", "body": "updated yourbody"}' http://localhost:3000/api/posts




// { "postid" : 7, "username" : "user2", "created" : 1518669758380, "modified" : 1518669758380, "title" : "tititletle", "body" : "bobodydy" }


// db.Posts.insertOne({ "postid" : 7, "username" : "user2", "created" : 1518669758380, "modified" : 1518669758380, "title" : "tititletle", "body" : "bobodydy" })

// db.Posts.replaceOne({postid: 1, username: "cs144"}, {body: "updated body"})

// db.Posts.updateOne({postid: 1, username: "cs144"}, {$set: {body: "updated body again"}})

