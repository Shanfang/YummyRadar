var express = require('express');
var router  = express.Router();
var oracledb = require('oracledb');
var dbConfig = require('./dbconfig');

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
                //{fetchInfo: {"text": {type: oracledb.STRING}}},
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
                    console.log(result.rows);
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