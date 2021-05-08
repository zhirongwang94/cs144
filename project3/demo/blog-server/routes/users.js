var express = require('express');
var router = express.Router();
let client = require('../db');


// const MongoClient = require('mongodb').MongoClient;
// const options = { useUnifiedTopology: true, writeConcern: { j: true } };

// // connection URL
// const url = 'mongodb://localhost:27017';

// // create a new MongoClient
// const client = new MongoClient(url, options);


// let db_posts = "";
// client.connect((err) => {
//     const posts = client.db('BlogServer').collection('Posts');
// 	posts.find({username: 'cs144'}).toArray((err, docs) => {
//     console.log(docs);
//     db_posts = docs;
//     client.close();
//     });
// });



/* GET home page. */
router.get('/:username', (req, res) => {
    let db_posts = client.db('BlogServer').collection('Posts');
    db_posts.find({username: req.params.username}).toArray((err, docs) => {
        res.json(docs);
        // res.send("username: " + req.params.username);
    });
});


module.exports = router;