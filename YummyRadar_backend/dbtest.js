// myscript.js

var oracledb = require('oracledb');

oracledb.getConnection(
    {
        user          : "jingmin",
        password      : "jmyu1994",
        connectString : "oracle.cise.ufl.edu:1521/orcl"
    },
    function(err, connection)
    {
        if (err) {
            console.error(err.message);
            return;
        }
        connection.execute(
            'select * from country',  // bind value for :id
            function(err, result)
            {
                if (err) {
                    console.error(err.message);
                    doRelease(connection);
                    return;
                }
                console.log(result.rows);
                doRelease(connection);
            });
    });

function doRelease(connection)
{
    connection.close(
        function(err) {
            if (err)
                console.error(err.message);
        });
}