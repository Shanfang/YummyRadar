var express = require('express');
var oracledb = require('oracledb');
var dbConfig = require('./dbconfig');

const app = express();
const PORT = 3000;

// Get a non-pooled connection
oracledb.getConnection(
  {
    user          : dbConfig.user,
    password      : dbConfig.password,
    connectString : dbConfig.connectString
  },
  function(err, connection)
  {
    if (err) {
      console.error(err.message);
      return;
    }
    connection.execute(
      `SELECT *
       FROM professors
       WHERE id = :id`,
      [1],
      { maxRows: 1
      },

      // The callback function handles the SQL execution results
      function(err, result)
      {
        if (err) {
          console.error(err.message);
          doRelease(connection);
          return;
        }
        console.log(result.metaData); 
        console.log(result.rows);     
        doRelease(connection);
      });
  });

// Note: connections should always be released when not needed
function doRelease(connection)
{
  connection.close(
    function(err) {
      if (err) {
        console.error(err.message);
      }
    });
}

app.get('/', (req, res) => 
    res.send(`Node server is running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`Server is listening on port ${PORT}`)
);
