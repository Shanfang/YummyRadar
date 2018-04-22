var express = require ('express');
var oracledb = require ('oracledb');
var dbConfig = require('../dbconfig');
var router = express.Router();

/**
 * Home searching function
 * Diane Xie
 */
router.post('/basic', function(req, res, next){
    handleDBConn(req, res, function(req, res, conn) {
        var restName = req.body.restName;
        var place = req.body.restPost;
        var sqlStatement = ``;
        var searchArray = [];

        if (place && restName){
            sqlStatement = `SELECT business_id FROM SHANFANG.BUSINESS 
                            WHERE (state like '%` + place + `%' or city like '%` + place + `%') 
                            and (name like '%` + restName + `%') 
                            and rownum < 51 
                            ORDER BY stars`;
        } else if (place){
            sqlStatement = `SELECT business_id FROM SHANFANG.BUSINESS 
                            WHERE (state like '%` + place + `%' or city like '%` + place + `%')
                            and rownum < 51 
                            ORDER BY stars`;
        } else if (restName){
            sqlStatement = `SELECT business_id FROM SHANFANG.BUSINESS 
                            WHERE name like '%` + restName + `%'  
                            and rownum < 51
                            ORDER BY stars`;
        } else {
            sqlStatement = `SELECT business_id FROM SHANFANG.BUSINESS 
                            WHERE rownum < 51
                            ORDER BY stars`;
         }

        console.log("The SQL statement is : "+sqlStatement);
        conn.execute(
            sqlStatement,
            [],
            {outformat: oracledb.OBJECT},
            function(err, result){
                if(err){
                    console.log("err: " + err.message);
                    return;
                }
                console.log(`The result is----------`);
                console.log(result.metaData);
                console.log(result.rows);
                res.send(result.rows);

                doRelease(conn);
            }
        );
    });
});

router.post('/openNow', function(req, res, next){
    handleDBConn(req, res, function(req, res, conn) {
        var restName = req.body.restName;
        var place = req.body.restPost;
        var sqlStatement = ``;
        var searchArray = [];

        if (place && restName){
            sqlStatement = `SELECT business_id FROM SHANFANG.BUSINESS 
                            WHERE (state like '%` + place + `%' or city like '%` + place + `%') 
                            and (name like '%` + restName + `%') 
                            and is_open = 1
                            and rownum < 51 
                            ORDER BY stars`;
        } else if (place){
            sqlStatement = `SELECT business_id FROM SHANFANG.BUSINESS 
                            WHERE (state like '%` + place + `%' or city like '%` + place + `%')
                            and is_open = 1
                            and rownum < 51 
                            ORDER BY stars`;
        } else if (restName){
            sqlStatement = `SELECT business_id FROM SHANFANG.BUSINESS 
                            WHERE name like '%` + restName + `%'  
                            and is_open = 1
                            and rownum < 51
                            ORDER BY stars`;
        } else {
            sqlStatement = `SELECT business_id FROM SHANFANG.BUSINESS 
                            WHERE rownum < 51
                            and is_open = 1
                            ORDER BY stars`;
         }

        console.log("The SQL statement is : "+sqlStatement);
        conn.execute(
            sqlStatement,
            [],
            {outformat: oracledb.OBJECT},
            function(err, result){
                if(err){
                    console.log("err: " + err.message);
                    return;
                }
                console.log(`The result is----------`);
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
                console.log(`Error in acquiring connection ...`);
                console.log(`Error message: `+err.message);           
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