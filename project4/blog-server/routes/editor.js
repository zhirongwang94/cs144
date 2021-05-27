var express = require('express');
var router = express.Router();


const jwt = require('jsonwebtoken');
const jwt_key='C-UFRaksvPKhx1txJYFcut3QGxsafPmwCY6SCly3G6c';


/* GET home page. */
router.get('/', (req, res, next) => {
    console.log("hello from editor router");
    // res.redirect(window.location.href);
    // next();
    try{
        let jwt_cookie = req.cookies['jwt'];
        jwt.verify(jwt_cookie, jwt_key);
        next();
    } catch(err){
        console.log("faillllllll edirotr router");
        res.redirect(302, '/login?redirect=/editor/');

    }
});

module.exports = router;
