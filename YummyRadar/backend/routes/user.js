var express = require('express');
var oracledb = require('oracledb');
var dbConfig = require('../dbconfig');
var router = express.Router();
// var bcrypt = require('bcryptjs')
// var jwt = require('jsonwebtoken');

//var User = require('../models/user');

/* router.post('/', function(req, res, next) {
  var salt = bcrypt.genSaltSync(10);
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: bcrypt.hashSync(req.body.password, salt),
    email: req.body.email
  })
  user.save(function (err, result) {
    if (err) {
      return res.status(500).json({
        title: 'An error occured',
        error: err
      });
    }
    res.status(201).json({
      message: 'User created',
      obj: result
    });
  });
}); */

router.post('/signup', function (req, res, next) {//signup
    handleDBConn(req, res, function(req, res, conn) {
        var sqlStatement = `INSERT INTO Customer (id, password, name, review_count, 
            cool_num, funny_num, useful_num) values (id, password, name, 0, 0, 0, 0)`;

        var id = req.body.id; // replace with user input id when logging
        var password = req.body.password;
        var name = req.body.name;
                
        conn.execute(
            sqlStatement,
            [id, password, name],
            {outFormat: oracledb.OBJECT},
            function (err, result) {
                if (err) {
                    console.log(err.message);
                    return;
                }
                console.log(`The result is: `);
                console.log(result.metaData);
                console.log(result.rows);                  
                res.send(result.rows);
                doRelease(conn);
            }
        );
    });
    console.log(req.body);
});


router.post('/signin', function (req, res, next) {
    handleDBConn(req, res, function(req, res, conn) {
        var sqlStatement = `SELECT * FROM Customer WHERE id =: id and password =: password`;
        var id = req.body.id; // replace with user input id when logging   
        var password = req.body.password;     
        conn.execute(
            sqlStatement,
            [id, password],
            {outFormat: oracledb.OBJECT},
            function (err, result) {
                if (err) {
                    console.log(err.message);
                    return;
                }
                console.log(`The result is: `);
                console.log(result.metaData);
                console.log(result.rows);                  
                res.send(result.rows);
                doRelease(conn);
            }
        );
    });
    console.log(req.body);
});

// router.post('/signin', function (req, res, next) {
//   User.findOne({email: req.body.email}, function (err, user) {
//     if (err) {
//       return res.status(500).json({
//         title: 'An error occurred',
//         error: err
//       });
//     }
//     if (!user) {
//       return res.status(401).json({
//         title: 'Login failed!',
//         error: {message: 'No such user exists'}
//       });
//     }
//     console.log(user.password);
//     console.log(req.body.password);
//     console.log(bcrypt.compareSync(req.body.password, user.password));
//     if (!bcrypt.compareSync(req.body.password, user.password)){
//       console.log()
//       return res.status(401).json({
//         title: 'Login failed',
//         error: {message: 'Wrong password'}
//       });
//     }

//     var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});

//     res.status(200).json({
//       message: 'Successfully logged in',
//       token: token,
//       user_id: user._id
//     });
//   });
// });



function handleDBConn(req, res, callback) {
    oracledb.getConnection({
        user          : dbConfig.user,
        password      : dbConfig.password,
        connectString : dbConfig.connectString
        }, 
        function(err, conn) {
        if (err) {
            console.log('Error in acquiring connection ...');
            console.log('Error message '+err.message);           
            return;
        }        
        callback(req, res, conn);
    });
}

function doRelease(conn) {
    conn.release(function(err) {
        if (err) {
            console.error(err.message);
        }
    });
}


module.exports = router;
