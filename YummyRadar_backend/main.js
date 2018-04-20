var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var appRoutes = require('./routes/app');
var analysisRoutes = require('./routes/analysis');


const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// app.post('/api/addRest', (req, res, next) => 
//     console.log(req.body));


function init() {
  oracledb.createPool(
    {
      user: dbConfig.user,
      password: dbConfig.password,
      connectString: dbConfig.connectString
    },
    function(err, pool) {
      if (err) {
        console.error("createPool() error: " + err.message);
        return;
      }
      app.use('/api/analysis', analysisRoutes);
      app.use('/api', appRoutes);
      
      app.listen(PORT, () =>
          console.log(`Server is listening on port ${PORT}`)
      );

    //   // Create HTTP server and listen on port - httpPort
    //   http
    //     .createServer(function(request, response) {
    //       handleRequest(request, response, pool);
    //     })
    //     .listen(httpPort);
    }
  );
}

function handleRequest(request, response, pool) {
  var urlparts = request.url.split("/");
  var deptid = urlparts[1];

  htmlHeader(
    response,
    "Oracle Database Driver for Node.js",
    "Example using node-oracledb driver"
  );

  if (deptid == 'favicon.ico') {
    htmlFooter(response);
    return;
  }

  if (deptid != parseInt(deptid)) {
    handleError(
      response,
      'URL path "' + deptid + '" is not an integer.  Try http://localhost:' + httpPort + '/30',
      null
    );

    return;
  }

  // Checkout a connection from the pool
  pool.getConnection(function(err, connection) {
    if (err) {
      handleError(response, "getConnection() error", err);
      return;
    }

    // console.log("Connections open: " + pool.connectionsOpen);
    // console.log("Connections in use: " + pool.connectionsInUse);

    connection.execute(
        `SELECT ID, state, zip_code FROM Test WHERE state = :state AND zip_code = :zip_code ORDER BY zip_code`, 
        ['FL', '32603'],
       function(err, result) {
        if (err) {
          connection.close(function(err) {
            if (err) {
              // Just logging because handleError call below will have already
              // ended the response.
              console.error("execute() error release() error", err);
            }
          });
          handleError(response, "execute() error", err);
          return;
        }

        displayResults(response, result, deptid);

        /* Release the connection back to the connection pool */
        connection.close(function(err) {
          if (err) {
            handleError(response, "normal release() error", err);
          } else {
            htmlFooter(response);
          }
        });
      }
    );
  });
}

// Report an error
function handleError(response, text, err) {
  if (err) {
    text += ": " + err.message;
  }
  console.error(text);
  response.write("<p>Error: " + text + "</p>");
  htmlFooter(response);
}

// Display query results
function displayResults(response, result, deptid) {
  response.write("<h2>" + "Employees in Department " + deptid + "</h2>");
  response.write("<table>");

  // Column Title
  response.write("<tr>");
  for (var col = 0; col < result.metaData.length; col++) {
    response.write("<th>" + result.metaData[col].name + "</th>");
  }
  response.write("</tr>");

  // Rows
  for (var row = 0; row < result.rows.length; row++) {
    response.write("<tr>");
    for (col = 0; col < result.rows[row].length; col++) {
      response.write("<td>" + result.rows[row][col] + "</td>");
    }
    response.write("</tr>");
  }
  response.write("</table>");
}

// Prepare HTML header
function htmlHeader(response, title, caption) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("<!DOCTYPE html>");
  response.write("<html>");
  response.write("<head>");
  response.write("<style>" +
    "body {background:#FFFFFF;color:#000000;font-family:Arial,sans-serif;margin:40px;padding:10px;font-size:12px;text-align:center;}" +
    "h1 {margin:0px;margin-bottom:12px;background:#FF0000;text-align:center;color:#FFFFFF;font-size:28px;}" +
    "table {border-collapse: collapse;   margin-left:auto; margin-right:auto;}" +
    "td, th {padding:8px;border-style:solid}" +
    "</style>\n");
  response.write("<title>" + caption + "</title>");
  response.write("</head>");
  response.write("<body>");
  response.write("<h1>" + title + "</h1>");
}

// Prepare HTML footer
function htmlFooter(response) {
  response.write("</body>\n</html>");
  response.end();
}

process
  .on('SIGTERM', function() {
    console.log("\nTerminating");
    process.exit(0);
  })
  .on('SIGINT', function() {
    console.log("\nTerminating");
    process.exit(0);
  });

init();