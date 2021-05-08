var express = require('express');
var router = express.Router();

// const MongoClient = require('mongodb').MongoClient;
// const options = { useUnifiedTopology: true, writeConcern: { j: true } };

// // connection URL
// const url = 'mongodb://localhost:27017';

// // create a new MongoClient
// const client = new MongoClient(url, options);


// let db_posts = "";
// client.connect((err) => {
//     const posts = client.db('BlogServer').collection('Posts');
// 	posts.find().toArray((err, docs) => {
//     console.log(docs);
//     db_posts = docs;
//     client.close();
//     });
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("hello from index");
});


module.exports = router;


////


// let db_posts = "";
// let user_posts = "";


// // create a new MongoClient
// const client = new MongoClient(url, options);
// // let username = req.params.username;


// client.connect((err) => {
//     // obtain dogs collection in animals db
//     const posts = client.db('BlogServer').collection('Posts');
// 	// users.find({ breed: 'poodle' }).toArray((err, docs) => {
// 	posts.find().toArray((err, docs) => {
//     // print retrieved document in console
//     console.log(docs[0]);
//     db_posts = docs;
//     client.close();
//     });
// });


// var myJSON = JSON.stringify(db_posts);

// // -------- app.js ---------
// let express = require('express');
// let app = express();


// app.get('/', (req, res, next) => {
//     res.send('Hello World!');
// });

// app.get('/blog', (req, res, next) => {
//     // res.send('Here are all posts: ' + db_posts);
//     // res.json(db_posts);
//     res.send("Here are all posts: " + db_posts);
// });

// app.get('/blog/:username', (req, res, next) => {
// 	// res.send("Here is " + req.params.username + "\'s blogs:  " + db_posts);
// 	// res.json(user_posts);
// 	// res.render('index', {title: "Hello"})
// 	// res.render(db_posts)

// });

// app.get('/blog/:username/:postid', (req, res, next) => {
//     res.send("Here is " + req.params.username + "\'s "+ req.params.postid + "th blogs:  ");
// });

// app.listen(3000);