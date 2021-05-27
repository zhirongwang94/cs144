var express = require('express');
var router = express.Router();
let client = require('../db');

const commonmark = require('commonmark');
const reader = new commonmark.Parser();
const writer = new commonmark.HtmlRenderer();


console.log("hello from api.js");
/* GET home page. */
router.get('/posts/', (req, res, next) => {

	// console.log("API ROUTER Your cookie: " + req.cookies['jwt_token']);

    let username = req.query.username;
    let postid = req.query.postid; 
	let db_posts = client.db('BlogServer').collection('Posts');

    // case 1: GET /api/posts?username=:username:
    if(username && !postid){
		db_posts.find({username: username}).toArray((err, docs) => {
			res.status(200).json(docs);
		});
    }


    // case 2: GET /api/posts?username=:username&postid=:postid:
    else if(username && postid){
		db_posts.find({username: username, postid: parseInt(postid)}).toArray((err, docs) => {
			if(docs.length == 0){
				res.status(404);
				res.end("post not found");
			}
			else{
				res.status(200);//ok
				res.json(docs[0]);
			}
		});
    }


    else{
    	res.status(404);//not found
    	res.send("unkonw query");
    }
});



// DELETE /api/posts?username=:username&postid=:postid:
// The server should delete the existing blog post with :postid by :username from the database. 
// If successful, the server should reply with “204 (No content)” status code. 
// If there is no such post, the server should reply with “404 (Not found)” status code.
router.delete('/posts', (req, res, next) => {
    let username = req.query.username;
    let postid = req.query.postid; 
   
	console.log("query: ");
	console.dir(req.query);
	let db_posts = client.db('BlogServer').collection('Posts');

	
    if(postid == null){
    	res.status(404);
		res.end("Please specify both username and postid");
		return; 
    }
	else{

		db_posts.findOne({username: username, postid: parseInt(postid)}).then((post) => {
			if(post==null){
				res.status(404);
				res.end("post not found");
			}

			else{
				let db_posts = client.db('BlogServer').collection('Posts');
				var delete_query = {username: username, postid: parseInt(postid)};
		
				db_posts.deleteOne(delete_query).then(()=> {
					res.status(204); //no content
					res.end("Post Deleted no content");
				})
	
			}
		});		
	}
	



	// else{
	// 	let db_posts = client.db('BlogServer').collection('Posts');
	// 	var delete_query = {username: username, postid: parseInt(postid)};

	// 	db_posts.deleteOne(delete_query).then(function(){
	// 		res.status(204); //no content
	// 		res.end("Post Deleted no content");
	// 	}).catch(function(error){
	// 		res.status(404);
	// 		res.send("Not Found");
	// 	});
	// }
});



// case 5: POST /api/posts:
router.post('/posts', (req, res, next) => {

	try{
		// handle requests
		let username = req.body.username;
		let postid = parseInt(req.body.postid); 
		let title = req.body.title;
		let body = req.body.body; 

		// console.log("api body: ");
		// console.dir(req.body);

		if( postid == null ){
			res.status(404)
			res.end("You must specify username and postid in data");
			return; 
		}

		let now  = new Date().getTime();


		let cur_time = Date.now();
		let db_posts = client.db('BlogServer').collection('Posts');
	
		// CASE 5-1: postid=0; insertOne() with postid=maxid+1, then update maxid in User connection 
		if(postid == 0){
			// obtain the maxid for db
			let maxid = 0; 
			db_posts.find({username: username}).sort({postid:-1}).limit(1).toArray((err, docs) => {
				if(docs.length == 0){ maxid = 0;}
				else{ maxid = docs[0].postid; }
				console.log("output: "  + maxid);

							//construct the document to insert
				let document_to_insert = { "postid" : maxid + 1, 
							"username" : username, 
							"created" : cur_time, 
							"modified" : cur_time, 
							"title" : title, 
							"body" : body 
						};

				// insert the document
				db_posts.insertOne(document_to_insert);

				res.status(201); //201 created 

				// res.json(document_to_insert);
				res.json();
			});

			

		}
	

		// CASE 5-2: updataOne() 
		else if(postid > 0){
			console.log("postid > 0")
			db_posts.findOne({username: username, postid: postid}).then((post) => {
				if(post==null){
					console.log("post is null")
					res.status(404);
					res.end("post not found");
				}
	
				else{
					let filter = {username: username, postid: postid};
					let update = {$set: {title: title, modified: cur_time, body: body} }
	
					db_posts.updateOne(filter, update); 

					res.status(200); //OK
					// res.json('{title: "title", modified: "cur_time", body: "body"}');
					res.send("finish update");
				}
			});		
		}
	
	}catch{
		res.status(404)
		res.end("Error, require username, postid, title, body ");
	}



});




    

    



module.exports = router;


// curl --request DELETE http://localhost:3000/api/posts?username=cs144\&postid=1
// curl --request GET 
// curl --request GET http://localhost:3000/api/posts?username=cs144\&postid=1

//curl --request POST --header "Content-Type:application/json" --data '{"username":"cs144", "postid": 0 , "title": "updated yourtitle", "body": "updated yourbody"}' http://localhost:3000/api/posts


// curl --request DELETE http://localhost:3000/api/posts?username=cs144\&postid=1 --cookies "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNzMTQ0IiwiaWF0IjoxNjIwNjg5OTYxLCJleHAiOjE2MjA2OTcxNjF9.CpJpURv9T0zJW-QTTOzyVwfqv0SS2pQb_lCNu6HpfmA"

// { "postid" : 7, "username" : "user2", "created" : 1518669758380, "modified" : 1518669758380, "title" : "tititletle", "body" : "bobodydy" }


// db.Posts.insertOne({ "postid" : 7, "username" : "user2", "created" : 1518669758380, "modified" : 1518669758380, "title" : "tititletle", "body" : "bobodydy" })

// db.Posts.replaceOne({postid: 1, username: "cs144"}, {body: "updated body"})

// db.Posts.updateOne({postid: 1, username: "cs144"}, {$set: {body: "updated body again"}})

// curl --request GET http://localhost:3000/api/posts?username=cs144 --cookies "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNzMTQ0IiwiaWF0IjoxNjIxNDQ0NTM4LCJleHAiOjE2MjE0NTE3Mzh9.TI7tGlDUgwHYa1tdYJX5TRRZWGgz1nfvBOe1F6-l3iM"