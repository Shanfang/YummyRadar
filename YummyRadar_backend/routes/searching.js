var express = require ('express');
var oracledb = require ('oracledb');
var dbConfig = require('../dbconfig');
var router = express.Router();

/**
 * Establish DB connection
 */
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


/**
 * Relase DB Connection
 * @param {} conn 
 */
function doRelease(conn) {
    conn.release(function(err) {
        if (err) {
            console.error(err.message);
        }
    });
}

/**
 * Home Basic searching function: Searching with restaurant name and place.
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

/**
 * Searching basic on Restaurant Name, Place, Option Open Now
 * Diane Xie
 */

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
                            WHERE (name like '%` + restName + `%') 
                            and is_open = 1
                            and rownum < 51
                            ORDER BY stars`;
        } else {
            sqlStatement = `SELECT business_id FROM SHANFANG.BUSINESS 
                            WHERE is_open = 1
                            and rownum < 51
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

/**
 * Searching basic on Restaurant Name, Place, Option Distance in 5 miles
 * Diane Xie
 */
router.post('/dist5miles', function(req, res, next){
    handleDBConn(req, res, function(req, res, conn) {
        var restName = req.body.restName;
        var place = req.body.place;
        var latitudeMax = req.body.latituemax;
        var latitudeMin = req.body.latituemin;
        var longitudeMax = req.body.longitudemax;
        var longitudeMin = req.body.longitudemin;
        var sqlStatement = ``;
        var searchArray = [];

        if (place && restName){
            sqlStatement = `SELECT business_id FROM SHANFANG.BUSINESS 
                            WHERE (state like '%` + place + `%' or city like '%` + place + `%') 
                            and (name like '%` + restName + `%') 
                            and latitude < `+latitudeMax+` and latitude > `+latitudeMin+`
                            and longitude < `+longitudeMax+`  and longitude > `+longitudeMin+`
                            and rownum < 51 
                            ORDER BY stars`;
        } else if (place){
            sqlStatement = `SELECT business_id FROM SHANFANG.BUSINESS 
                            WHERE (state like '%` + place + `%' or city like '%` + place + `%')
                            and latitude < `+latitudeMax+` and latitude > `+latitudeMin+`
                            and longitude < `+longitudeMax+`  and longitude > `+longitudeMin+`
                            and rownum < 51 
                            ORDER BY stars`;
        } else if (restName){
            sqlStatement = `SELECT business_id FROM SHANFANG.BUSINESS 
                            WHERE (name like '%` + restName + `%')  
                            and latitude < `+latitudeMax+` and latitude > `+latitudeMin+`
                            and longitude < `+longitudeMax+`  and longitude > `+longitudeMin+`
                            and rownum < 51
                            ORDER BY stars`;
        } else {
            sqlStatement = `SELECT business_id FROM SHANFANG.BUSINESS 
                            WHERE 
                            latitude < `+latitudeMax+` and latitude > `+latitudeMin+`
                            and longitude < `+longitudeMax+`  and longitude > `+longitudeMin+`
                            and rownum < 51
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

/**
 * Searching basic on Restaurant Name, Place, Option order delivery
 * Diane Xie
 */
router.post('/orderdelivery', function(req, res, next){
    console.log("Print searchInfo in backend");
    console.log("restName:"+req.body.restName+"  place:"+req.body.restPost);
    handleDBConn(req, res, function(req, res, conn) {
        var restName = req.body.restName;
        var place = req.body.restPost;
        var sqlStatement = ``;
        var searchArray = [];

        if (place && restName){
            sqlStatement = `SELECT business_id FROM
                                (SELECT business_id, stars FROM SHANFANG.BUSINESS 
                                WHERE (state like '%` + place + `%' or city like '%` + place + `%') 
                                and (name like '%` + restName + `%')) s,  
                                (SELECT business_id FROM SHANFANG.BUSINESS_CATEGORY 
                                WHERE CATEGORY like '%Delivery%') c
                            WHERE s.business_id = c.business_id
                            and rownum < 51 
                            ORDER BY stars`;
        } else if (place){
            sqlStatement = `SELECT s.business_id FROM
                                (SELECT business_id, stars FROM SHANFANG.BUSINESS 
                                 WHERE name like '%` + restName + `%' ) s,  
                                (SELECT business_id FROM SHANFANG.BUSINESS_CATEGORY 
                                 WHERE CATEGORY like '%Delivery%') c 
                            WHERE s.business_id = c.business_id
                            and rownum < 51 
                            ORDER BY stars`;
        } else if (restName){
            sqlStatement = `SELECT business_id FROM
                                (SELECT business_id, stars FROM SHANFANG.BUSINESS 
                                WHERE (state like '%` + place + `%' or city like '%` + place + `%') 
                                and (name like '%` + restName + `%')) s,  
                                (SELECT business_id FROM SHANFANG.BUSINESS_CATEGORY 
                                WHERE CATEGORY like '%Delivery%') c
                            WHERE s.business_id = c.business_id
                            and rownum < 51 
                            ORDER BY stars`;
        } else {
            sqlStatement = `SELECT s.business_id FROM
                                (SELECT business_id, stars FROM SHANFANG.BUSINESS 
                                 ) s,  
                                (SELECT business_id FROM SHANFANG.BUSINESS_CATEGORY 
                                WHERE CATEGORY like '%Delivery%') c 
                            WHERE s.business_id = c.business_id
                            and rownum < 51 
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

/**
 * Search based on category options
 * Diane Xie
 */
router.post('/category', function(req, res, next){
    handleDBConn(req, res, function(req, res, conn) {
        var place = req.body.restPost;
        var selectMexcanFood = req.body.selectMexcanFood;
        var selectAmericanFood = req.body.selectAmericanFood;
        var selectChineseFood = req.body.selectChineseFood;
        var selectSeaFood = req.body.selectSeaFood;
        var sqlStatementGetResltBasedPlace = '';
        var sqlStatementGetResltBasedCategory = '';
        var firstOptionFlag = false;

        // deal with the sql statement with place parameter.
        sqlStatementGetResltBasedPlace = `(SELECT business_id, stars FROM SHANFANG.BUSINESS`;

        if (place){
            sqlStatementGetResltBasedPlace = sqlStatementGetResltBasedPlace + `
                                WHERE (state like '%` + place + `%' or city like '%` + place + `%') `
        }

        sqlStatementGetResltBasedPlace = sqlStatementGetResltBasedPlace + `) s, `;
        //---------------------------------------------------

        // deal with the sql statement with category options.
        if (selectMexcanFood || selectAmericanFood || selectChineseFood || selectSeaFood){
            sqlStatementGetResltBasedCategory = ` (SELECT business_id 
                                                  FROM SHANFANG.BUSINESS_CATEGORY
                                                  WHERE `;
            // If select the MexicanFood option
            if (selectMexcanFood){
                sqlStatementGetResltBasedCategory = sqlStatementGetResltBasedCategory + `category = 'Mexican' `;
                firstOptionFlag = true;
            }

            // If select the MexicanFood option                
            if (selectChineseFood){
                if (firstOptionFlag){
                    sqlStatementGetResltBasedCategory = sqlStatementGetResltBasedCategory + `or category = 'Chinese' `;
                } else {
                    sqlStatementGetResltBasedCategory = sqlStatementGetResltBasedCategory + `category = 'Chinese' `;
                    firstOptionFlag = true;
                }
            }

            // If select the Seafood option
            if (selectSeaFood){
                if (firstOptionFlag){
                    sqlStatementGetResltBasedCategory = sqlStatementGetResltBasedCategory + `or category = 'Seafood' `;
                } else {
                    sqlStatementGetResltBasedCategory = sqlStatementGetResltBasedCategory + `category = 'Seafood' `;
                    firstOptionFlag = true;
                }
            }

            // If select the American option
            if (selectAmericanFood){
                if (firstOptionFlag){
                    sqlStatementGetResltBasedCategory = sqlStatementGetResltBasedCategory + `or category = 'Salad'
                     or category = 'Cafes' or category = 'Cupcakes' or category = 'Bakeries' or category = 'Bars' 
                     or category = 'Beer Bar' or category = 'Sandwiches' `;
                } else {
                    sqlStatementGetResltBasedCategory = sqlStatementGetResltBasedCategory + ` category = 'Salad'
                     or category = 'Cafes' or category = 'upcakes' or category = 'Bakeries' or category = 'Bars' 
                     or category = 'Beer Bar' or category = 'Sandwiches' `;
                    firstOptionFlag = true;
                }
            }

            sqlStatementGetResltBasedCategory = sqlStatementGetResltBasedCategory + `) c`
        }
        //---------------------------------------------------

        // Combine the two SQL statement.
        var sqlStatement = `SELECT s.business_id FROM `+ sqlStatementGetResltBasedPlace;

        if (sqlStatementGetResltBasedCategory){
            sqlStatement = sqlStatement +  sqlStatementGetResltBasedCategory + 
                            ` WHERE s.business_id = c.business_id 
                              AND rownum < 51
                              ORDER BY stars`
        } else {
            sqlStatement = sqlStatement +  sqlStatementGetResltBasedCategory + 
            ` WHERE rownum < 51
              ORDER BY stars`
        }
         //---------------------------------------------------
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


module.exports = router;