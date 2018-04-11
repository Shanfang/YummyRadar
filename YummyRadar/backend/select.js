var oracledb = require('oracledb');

oracledb.getConnection(
{
	user : "wzun",
	password: "19930525Wz",
	connectString : "oracle.cise.ufl.edu:1521/orcl"
},
function(err, connection){
	var sqlStatement = `SELECT id, password, name, email, review_count, cool_num, funny_num, useful_num
	FROM Customer WHERE id =: id`;

	// var sqlStatement = `select * from customer`;
	var id = 'tom1'; // replace with user input id when logging

	if (err) {
		console.error(err.message);
		return;
	}
	connection.execute(
		sqlStatement,
    [id],
		
      

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




	