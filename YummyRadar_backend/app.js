var express = require('express');
var bodyParser = require('body-parser');

var appRoutes = require('./routes/app');
var analysisRoutes = require('./routes/analysis');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// app.get('/', (req, res) => 
//     res.send(`Thanks for visiting YummyRadar!`));

app.use('/analysis', analysisRoutes);
app.use('/', appRoutes);

app.listen(PORT, () =>
    console.log(`Server is listening on port ${PORT}`)
);
