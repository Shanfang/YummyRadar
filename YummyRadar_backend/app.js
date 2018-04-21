var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var appRouter = require('./routes/app');
var businessRouter = require('./routes/business');
var reviewRouter = require('./routes/review');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// app.post('/api/addRest', (req, res, next) =>
//     console.log(req.body));

app.use('/v1/business', businessRouter);
app.use('/v1/review', reviewRouter);
app.use('/', appRouter);

app.listen(PORT, () =>
    console.log(`Server is listening on port ${PORT}`)
);



