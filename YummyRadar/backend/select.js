var oracledb = require('oracledb');

oracledb.getConnection(
{
	user : "wzun",
	password: "19930525Wz",
	connectString : "oracle.cise.ufl.edu:1521/orcl"
},
function(err, connection){
	if (err) {
		console.error(err.message);
		return;
	}
	connection.execute(
		'select * from country',
		
      

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

function doRelease(connection)
{
  connection.close(
    function(err) {
      if (err) {
        console.error(err.message);
      }
    });
}




	