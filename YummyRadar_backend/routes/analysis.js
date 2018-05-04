var express = require('express');
var oracledb = require('oracledb');
var dbConfig = require('./dbconfig');
var router = express.Router();

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
        console.log("Come to distribution=------");
        console.log(`The selected state is ${state}`);
        var sqlStatement = `SELECT bc.category, COUNT(*) AS num
                            FROM shanfang.business b, shanfang.business_category bc
                            WHERE b.business_id = bc.business_id AND b.state = 'WI' AND b.city = 'Madison'
                                AND b.stars >= 1 AND b.review_count >= 10
                            GROUP BY bc.category`;
        
        var state = req.body.state;
        // var city = req.body.city;
        var city = 'Madison';
        // var zipCode = req.body.zipCode;
        var reviewCount = req.body.reviewCount;
        var stars = req.body.stars;

        conn.execute(
            sqlStatement,
             [],
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

/*
Get top10 most popular business.
*/
router.post('/popularity/top10', function(req, res, next) {
    handleDBConn(req, res, function(req, res, conn) {
        var sqlStatement = `
                            SELECT *
                            FROM (
                                SELECT b.name, COUNT(*) AS num
                                FROM shanfang.business b, shanfang.business_category bc
                                WHERE b.business_id = bc.business_id 
                                    AND b.state = :state 
                                    AND b.city = :city
                                    AND b.business_id in (SELECT bc1.business_id
                                                            FROM shanfang.business_category bc1
                                                            WHERE bc1.category = :type)
                                GROUP BY b.name
                                ORDER BY num DESC)
                            WHERE ROWNUM <= 10`;
        
        var state = req.body.state;
        var city = req.body.city;
        var type = req.body.businessType;
        
        console.log(`The selected state is ${state}`);
        console.log(`The selected city is ${city}`);
        console.log(`The selected type is ${type}`);

        conn.execute(
            sqlStatement,
            [state, city, type],
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

/*
Get summary of database tables.
*/
router.get('/summary/total', function(req, res, next) {
// router.get('/summary/:tableName', function(req, res, next) {
    handleDBConn(req, res, function(req, res, conn) {   
        var tableName = req.params.tableName;
        var sqlStatement = '';

        // console.log(`Table name is ${tableName}`);
        // if (tableName == "business") {
        //     sqlStatement = `SELECT COUNT(*) AS business_count
        //                         FROM shanfang.business`;
        // } else if (tableName == "businessAttr") {
        //     sqlStatement = `SELECT COUNT(*) AS businessAttr_count
        //                     FROM shanfang.business_attribute`;
        // } else if (tableName == "businessCat") {
        //     sqlStatement = `SELECT COUNT(*) AS businessCat_count
        //                     FROM shanfang.business_category`;
        // } else if (tableName == "businessCheckIn") {
        //     sqlStatement = `SELECT COUNT(*) as business_checkin_count
        //                     FROM shanfang.business_checkin`;
        // } else if (tableName == "businessHours") {
        //     sqlStatement = `SELECT COUNT(*) as business_hours_count
        //                     FROM shanfang.business_hours`;
        // } else if (tableName == "tip") {
        //     sqlStatement = `SELECT COUNT(*) as tip_count
        //                     FROM shanfang.tip`;
        // } else if (tableName == "photo") {
        //     sqlStatement = `SELECT COUNT(*) as photo_count
        //                     FROM shanfang.photo`; 
        // } else if (tableName == "review") {                                      
        //     sqlStatement = `SELECT COUNT(*) AS review_count
        //                     FROM wzun.reviews`;
        // } else if (tableName == "users")  {
        //     sqlStatement = `SELECT COUNT(*) AS user_count
        //                     FROM jingmin.users`;
        // } else if (tableName == "total") {
        //     sqlStatement = `SELECT num1+num2+num3+num4+num5+num6+num7 AS total 
        //                     FROM 
        //                     (SELECT COUNT(*) AS num1 FROM wzun.reviews),
        //                     (SELECT COUNT(*) as num2 FROM jingmin.users),
        //                     (SELECT COUNT(*) as num3 FROM shanfang.business),
        //                     (SELECT COUNT(*) as num4 FROM shanfang.business_attribute),
        //                     (SELECT COUNT(*) as num5 FROM shanfang.business_category),
        //                     (SELECT COUNT(*) as num6 FROM shanfang.business_hours),
        //                     (SELECT COUNT(*) as num7 FROM shanfang.photo)`
        // }
       
        sqlStatement = `SELECT num1+num2+num3+num4+num5+num6+num7 AS total 
                        FROM 
                        (SELECT COUNT(*) AS num1 FROM wzun.reviews),
                        (SELECT COUNT(*) as num2 FROM jingmin.users),
                        (SELECT COUNT(*) as num3 FROM shanfang.business),
                        (SELECT COUNT(*) as num4 FROM shanfang.business_attribute),
                        (SELECT COUNT(*) as num5 FROM shanfang.business_category),
                        (SELECT COUNT(*) as num6 FROM shanfang.business_hours),
                        (SELECT COUNT(*) as num7 FROM shanfang.photo)`;
        conn.execute(
            sqlStatement,
            [],
            {outFormat: oracledb.OBJECT},
            function (err, result) {
                if (err) {
                    console.log(sqlStatement);
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
            console.error(err.message)
        }
    });
}

module.exports = router;