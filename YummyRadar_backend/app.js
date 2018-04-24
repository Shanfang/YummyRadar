var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');


var businessRouter = require('./routes/business');
var reviewRouter = require('./routes/review');
var appRoutes = require('./routes/app');
var analysisRoutes = require('./routes/analysis');
var searchingRoutes = require('./routes/searching');
//Zun
var customerRoutes = require('./routes/customer');
var userRoutes = require('./routes/user');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/v1/business', businessRouter);
app.use('/v1/review', reviewRouter);


app.use('/api/searching', searchingRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/auth', userRoutes);


app.use('/', appRoutes);
app.use('/api', appRoutes);



app.listen(PORT, () =>
    console.log(`Server is listening on port ${PORT}`)
);



