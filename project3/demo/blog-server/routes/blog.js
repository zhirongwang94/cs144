var express = require('express');
var router = express.Router();
let client = require('../db');


/* GET home page. */
router.get('/:username', (req, res) => {
    let db_posts = client.db('BlogServer').collection('Posts');
    db_posts.find({username: req.params.username}).toArray((err, docs) => {
        res.json(docs);
        // res.send("username: " + req.params.username);
    });
});


router.get('/:username/:postid', (req, res) => {
    let db_posts = client.db('BlogServer').collection('Posts');
    db_posts.find({username: req.params.username, postid: parseInt(req.params.postid)}).toArray((err, docs) => {
        res.json(docs);
        // res.send("here your are" + req.params.postid);
    });
});



module.exports = router;