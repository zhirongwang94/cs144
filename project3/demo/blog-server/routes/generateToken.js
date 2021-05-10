
// const jwt = require('jsonwebtoken');
// const jwt_key='C-UFRaksvPKhx1txJYFcut3QGxsafPmwCY6SCly3G6c';

// const generateToken = (res, username) => {
//   // const expiration = process.env.DB_ENV === 'testing' ? 100 : 604800000;
//   // const token = jwt.sign({ id, firstname }, process.env.JWT_SECRET, {
//   //   expiresIn: process.env.DB_ENV === 'testing' ? '1d' : '7d',
//   // });
//   // return res.cookie('token', token, {
//   //   expires: new Date(Date.now() + expiration),
//   //   secure: false, // set to true if your using https
//   //   httpOnly: true,
//   // });
  
//   // jwt.sign({data: req.body.username}, jwt_key, { expiresIn: '2h' });


//   const expiration = '2h';
//   const jwt_token = jwt.sign({username: username}, jwt_key, {expiresIn: '2h'});



//   console.log("hello from generateToken.js");

//    let a = res.cookie('token', jwt_token, {
//   	expires: new Date(Date.now() + expiration),
//   	secure: true,
//   });


//  //  res.cookie('auth-token', 'hello');

//  //     const to_print = res.cookies; 
// 	// console.log("token: " + to_print); 
//   return a; 
// };
// module.exports = generateToken