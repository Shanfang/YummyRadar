var express = require('express');
var router  = express.Router();
var oracledb = require('oracledb');
var dbConfig = require('./dbconfig');

oracledb.fetchAsString = [ oracledb.CLOB ];

router.get('/', function(req, res, next) {
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
            connection.execute(
                'select * from wzun.reviews where rownum < 2',
                [],
                {outFormat: oracledb.OBJECT},
            function (err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    console.log(result);
                    //console.log(result.rows);
                    doRelease(connection);
                    return res.json(result.rows);
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

