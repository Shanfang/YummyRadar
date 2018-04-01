var express = require('express');
var router = express.Router();

router.get('/', (req, res) => 
    res.send(`Thanks for visiting YummyRadar!`));

module.exports = router;
