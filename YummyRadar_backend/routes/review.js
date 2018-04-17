var express = require('express');
var router  = express.Router();
var oracledb = require('oracledb');
oracledb.fetchAsString = [ oracledb.CLOB ];

router.get('/', function(req, res, next) {

    oracledb.getConnection(
        {
            user: "jingmin",
            password: "jmyu1994",
            connectString: "oracle.cise.ufl.edu:1521/orcl"
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
                //{fetchInfo: {"text": {type: oracledb.STRING}}},
            function (err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
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

