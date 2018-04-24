var express = require('express');
var router  = express.Router();
var oracledb = require('oracledb');
var dbConfig = require('./dbconfig');


oracledb.fetchAsString = [ oracledb.CLOB ];

router.post('/saveReviews/', function(req, res, next) {
    oracledb.getConnection(
        {
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        },
        function (err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            var stars = req.body.STARS;
            var text = req.body.TEXT;
            var business_id = req.body.BUSINESS_ID;
            var user_id = req.body.USER_ID;
            var user_name = req.body.USER_NAME;
            connection.execute(
                "INSERT INTO wzun.reviews values (1, :user_id, :business_id, :stars, '2018-04-24', :text, 0, 0, 0, :user_name)",
                [user_id, business_id, stars, text, user_name],
                { autoCommit: true},
                //{fetchInfo: {"CAPTION": {type: oracledb.BUFFER}}},
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    //console.log(result.rows);
                    doRelease(connection);
                    return res.json({
                        message: "Success",
                        obj: result.rows
                    });
                });

        });

    function doRelease(connection) {
        connection.close(
            function (err) {
                if (err)
                    console.error(err.message);
            });
    }
});

router.get('/reviews/:id', function(req, res, next) {
    oracledb.getConnection(
        {
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        },
        function (err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            var bID = req.params.id;
            connection.execute(
                'select * from wzun.reviews where business_id=:id and rownum < 5',
                [bID],
                {outFormat: oracledb.OBJECT},
                //{fetchInfo: {"CAPTION": {type: oracledb.BUFFER}}},
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    // console.log(result.rows);
                    doRelease(connection);
                    return res.json({
                        message: "Success",
                        obj: result.rows
                    });
                });

        });

    function doRelease(connection) {
        connection.close(
            function (err) {
                if (err)
                    console.error(err.message);
            });
    }
});

router.get('/photos/:id', function(req, res, next) {
    oracledb.getConnection(
        {
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        },
        function (err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            var bID = req.params.id;
            connection.execute(
                'select * from shanfang.photo where business_id=:id and rownum < 5',
                [bID],
                {outFormat: oracledb.OBJECT},
                //{fetchInfo: {"CAPTION": {type: oracledb.BUFFER}}},
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    // console.log(result.rows);
                    doRelease(connection);
                    return res.json({
                        message: "Success",
                        obj: result.rows
                    });
                });

        });

    function doRelease(connection) {
        connection.close(
            function (err) {
                if (err)
                    console.error(err.message);
            });
    }
});

router.get('/:id', function(req, res, next) {
    oracledb.getConnection(
        {
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        },
        function (err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            var bID = req.params.id;
            connection.execute(
                'select * from shanfang.business where business_id=:id',
                [bID],
                {outFormat: oracledb.OBJECT},
                //{fetchInfo: {"caption": {type: oracledb.STRING}}},
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    doRelease(connection);
                    return res.json({
                        message: "Success",
                        obj: result.rows
                    });
                });

        });

    function doRelease(connection) {
        connection.close(
            function (err) {
                if (err)
                    console.error(err.message);
            });
    }
});

router.get('/array/test/:ids', function(req, res, next){
    return res.json(
        {obj : [{"business_id": "YDf95gJZaq05wvo7hTQbbQ", "name": "Richmond Town Square", "neighborhood": "", "address": "691 Richmond Rd", "city": "Richmond Heights", "state": "OH", "postal_code": "44143", "latitude": 41.5417162, "longitude": -81.4931165, "stars": 2.0, "review_count": 17, "is_open": 1},
            {"business_id": "mLwM-h2YhXl2NCgdS84_Bw", "name": "South Florida Style Chicken & Ribs", "neighborhood": "Eastland", "address": "2824 Milton Rd", "city": "Charlotte", "state": "NC", "postal_code": "28215", "latitude": 35.23687, "longitude": -80.7419759, "stars": 4.5, "review_count": 4, "is_open": 0},
            {"business_id": "v2WhjAB3PIBA8J8VxG3wEg", "name": "The Tea Emporium", "neighborhood": "Riverdale", "address": "337 Danforth Avenue", "city": "Toronto", "state": "ON", "postal_code": "M4K 1N7", "latitude": 43.6771258, "longitude": -79.3532848, "stars": 4.5, "review_count": 7, "is_open": 0}
        ]}
    );
});
router.get('/array/:ids', function (req, res, next){
    oracledb.getConnection(
        {
            user: dbConfig.user,
            password: dbConfig.password,
            connectString: dbConfig.connectString
        },
        function (err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            var tempIDs = req.params.ids;
            var businessIDs = tempIDs.split(",");
            sqlStatement = 'select * from shanfang.business where business_id in (';
            for (var i=0; i < businessIDs.length; i++) sqlStatement += (i > 0) ? ', :' + i : ':' + i;
            sqlStatement += ')';
            connection.execute(
                sqlStatement,
                businessIDs,
                {outFormat: oracledb.OBJECT},
                //{fetchInfo: {"text": {type: oracledb.STRING}}},
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    // console.log(result.rows);
                    doRelease(connection);
                    return res.json({
                        message: "Success",
                        obj: result.rows
                    });
                });

        });

    function doRelease(connection) {
        connection.close(
            function (err) {
                if (err)
                    console.error(err.message);
            });
    }
});
module.exports = router;