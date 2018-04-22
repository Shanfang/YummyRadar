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

/*
Calculating popularity changes for each month throughout the year(for a specific year)
*/
router.get('/popularity/:id/:year', function(req, res, next) {
    handleDBConn(req, res, function(req, res, conn) {   
        var year = req.params.year;
        var id = req.params.id;
        var sqlStatement = `
                            WITH targetReviews AS (SELECT r.create_date, r.stars
                                FROM wzun.reviews r
                                WHERE r.business_id = :id AND (SUBSTR(r.create_date, 1, 4) = :year))  
                                
                            SELECT temp2.month, SUM(temp2.total_per_star_month) AS monthly_total
                            FROM (SELECT temp.month, temp.stars * COUNT(*) AS total_per_star_month
                                FROM (SELECT SUBSTR(targetReviews.create_date, 6, 2) AS month, targetReviews.stars
                                        FROM targetReviews) temp
                                GROUP BY temp.month, temp.stars) temp2
                            GROUP BY temp2.month
                            ORDER BY temp2.month`;

        conn.execute(
            sqlStatement,
            [id, year],
            {outFormat: oracledb.OBJECT},
            function (err, result) {
                if (err) {
                    console.log(err.message);
                    return;
                }
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
                                AND b.stars >= :stars AND b.review_count >= :reviewCount
                            GROUP BY bc.category`;
        
        var state = req.body.state;
        var city = req.body.city;
        // var zipCode = req.body.zipCode;
        var reviewCount = req.body.reviewCount;
        var stars = req.body.stars;

        conn.execute(
            sqlStatement,
            [state, city, stars, reviewCount],
            {outFormat: oracledb.OBJECT},
            function (err, result) {
                if (err) {
                    console.log(err.message);
                    return;
                }
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