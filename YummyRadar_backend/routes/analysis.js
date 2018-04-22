var express = require('express');
var oracledb = require('oracledb');
var dbConfig = require('../dbconfig');
var router = express.Router();

// TODO: pooling connections

router.get('/area', function(req, res, next) {
    handleDBConn(req, res, function(req, res, conn) {
        var sqlStatement = `SELECT ID, state, zip_code FROM Test WHERE state = :state AND zip_code = :zip_code ORDER BY zip_code`;
        var state = 'FL'; // replace with whatever is in the req
        var zip_code = '32603'; // replace with whatever is in the req
        conn.execute(
            sqlStatement,
            [state, zip_code],
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
});

function handleDBConn(req, res, callback) {
    oracledb.getConnection(
        {
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
        }
    );
}

function doRelease(conn) {
    conn.release(function(err) {
        if (err) {
            console.error(err.message);
        }
    });
}

module.exports = router;