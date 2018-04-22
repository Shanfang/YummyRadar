var express = require('express');
var oracledb = require('oracledb');
var dbConfig = require('../dbconfig');
var router = express.Router();

// TODO: pooling connections

router.post('/', function(req, res, next) {
    handleDBConn(req, res, function(req, res, conn) {
        var sqlStatement = `SELECT id, password, name, email, review_count, cool_num, funny_num, useful_num
                            FROM Customer WHERE id =: id`;
        var id = req.body.id; // replace with user input id when logging
        
        // var sqlStatement = 'select * from country';
        
        conn.execute(
            sqlStatement,
            [id],
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

router.post('/review', function (req, res, next) {
    handleDBConn(req, res, function(req, res, conn) {
        var sqlStatement = `SELECT text FROM REVIEWS WHERE USER_ID =: id and rownum<3`;
        var id = req.body.USER_ID; // replace with user input id when logging   
        conn.execute(
            sqlStatement,
            [id],
            {outFormat: oracledb.OBJECT},
            function (err, result) {
                if (err) {
                    console.log(err.message);
                    return;
                }
                console.log(`The result is: `);
                // console.log(result.metaData);
                // console.log(result.rows);                  
                // res.send(result.rows);
                res.status("200").json(result.rows);
                // displayResults(res, result, id);
                doRelease(conn);
            }

        );
    });
    console.log(req.body);
});

router.post('/updateProfile', function (req, res, next) {
    handleDBConn(req, res, function(req, res, conn) {
        var sqlStatement = `UPDATE jingmin.USERS SET NAME =: name, EMAIL =: email 
        where USER_ID =: id`;
        
        var Vname = req.body.name;  
        var Vid = req.body.id;
        var Vemail = req.body.email;
        
        conn.execute(
            sqlStatement,
            [Vname, Vemail, Vid],
            { autoCommit: true},
            
            // {outFormat: oracledb.OBJECT},
            function (err, result) {
                if (err) {
                    console.log(err.message);
                    return;
                }
                console.log(`The result is: `);
                // console.log(result.metaData);
                // console.log(result.rows);                  
                // res.send(result.rows);

                // displayResults(res, result, id);
                doRelease(conn);
            }

        );
    });
    console.log(req.body);
});

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