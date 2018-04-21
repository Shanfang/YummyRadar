var express = require('express');
var oracledb = require('oracledb');
var dbConfig = require('../dbconfig');
var router = express.Router();

/* 
TODOs: 
    Add routes for calculating popularity for a type of restaurants(must figure how to calculate popularity)
    Add routes for calculating popularity for a specific restaurant
    Pooling connections


Completed:
    Calculating food type distribution for a specific location(need to put percentage logic at backend)
    Calculating popularity changes for each month throughout the year(for a specific year)
*/

router.post('/location', function(req, res, next) {
    handleDBConn(req, res, function(req, res, conn) {
        // var sqlStatement = `SELECT business_id, state, postal_code 
        //                     FROM shanfang.business 
        //                     WHERE state = :state AND city = :city AND postal_code = :zipCode 
        //                     ORDER BY postal_code`;


        var sqlStatement = `SELECT r.category, num
                            FROM (
                                SELECT bc.category, COUNT(*) AS num
                                FROM shanfang.business b, shanfang.business_category bc
                                WHERE b.business_id = bc.business_id AND b.state = :state AND b.city = :city
                                    AND b.postal_code = :zipCode AND b.stars >= :stars
                                GROUP BY bc.category
                                ) r
                            WHERE num >= 10`;

        var state = req.body.state;
        var city = req.body.city;
        var stars = req.body.stars;

        var zipCode = req.body.zipCode;
        conn.execute(
            sqlStatement,
            [state, city, zipCode, stars],
            {outFormat: oracledb.OBJECT},
            function (err, result) {
                if (err) {
                    console.log(err.message);
                    return;
                }
                // console.log(`The city is: ${city} and state is: ${state}, star is: ${stars}`);
                console.log(`The result is: `);
                console.log(result.metaData);
                console.log(result.rows);                  
                res.send(result.rows);

                doRelease(conn);
            }
        );
    });
});

/*
Calculating popularity changes for each month throughout the year(for a specific year)
*/
router.post('/popularity/:id/:year', function(req, res, next) {
    handleDBConn(req, res, function(req, res, conn) {
        var sqlStatement = `SELECT r.create_date, b.business_id, r.stars
                            FROM  shanfang.business b, wzun.reviews r
                            WHERE b.business_id = r.business_id AND b.business_id = '-kOAY_7PlNBzezdo6jNvqw'
                            GROUP BY r.create_date, b.business_id, r.stars
                            ORDER BY r.create_date DESC`;

        var year = req.parms.year;
        var business_id = req.parms.ID;
        conn.execute(
            sqlStatement,
            [year, business_id],
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

/* 
Find distribution for different types of businesses in a specified location
with stars and ratings constraints. This will be used to generate pie chart.
*/
router.post('/category/distribution', function(req, res, next) {
    handleDBConn(req, res, function(req, res, conn) {
        var sqlStatement = `SELECT bc.category, COUNT(*) AS num
                            FROM shanfang.business b, shanfang.business_category bc
                            WHERE b.business_id = bc.business_id AND b.state = :state AND b.city = :city
                                AND b.postal_code = :zipCode AND b.stars >= :stars AND b.review_count >= :reviewCount
                            GROUP BY bc.category`;
        

        var state = req.body.state;
        var city = req.body.city;
        var zipCode = req.body.zipCode;
        var reviewCount = req.body.reviewCount;
        var stars = req.body.stars;
        console.log(`state is ${state}`);
        console.log(`city is ${city}`);
        console.log(`stars is ${stars}`);

        conn.execute(
            sqlStatement,
            [state, city, zipCode, stars, reviewCount],
            {outFormat: oracledb.OBJECT},
            function (err, result) {
                if (err) {
                    console.log(err.message);
                    return;
                }
                console.log(`The result is: `);
                console.log(result.rows); 
                res.send(result.rows);
                
                doRelease(conn);
            }
        );
    });
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