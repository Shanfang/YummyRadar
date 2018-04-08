var express = require('express');
var router  = express.Router();


router.get('/', function(req, res, next) {
    return res.status(200).json({
        message: 'Success',
        obj:{"business_id": "YDf95gJZaq05wvo7hTQbbQ",
            "name": "Richmond Town Square",
            "neighborhood": "",
            "address": "691 Richmond Rd",
            "city": "Richmond Heights",
            "state": "OH",
            "postal_code": "44143",
            "latitude": 41.5417162,
            "longitude": -81.4931165,
            "stars": 2.0,
            "review_count": 17,
            "is_open": 1,
            "attributes": {
                "RestaurantsPriceRange2": 2,
                "BusinessParking": {
                    "garage": false,
                    "street": false,
                    "validated": false,
                    "lot": true,
                    "valet": false},
                "BikeParking": true,
                "WheelchairAccessible": true},
            "categories": ["Shopping", "Shopping Centers"],
            "hours": {
                "Monday": "10:00-21:00",
                "Tuesday": "10:00-21:00",
                "Friday": "10:00-21:00",
                "Wednesday": "10:00-21:00",
                "Thursday": "10:00-21:00",
                "Sunday": "11:00-18:00",
                "Saturday": "10:00-21:00"}
        }
    });
});

module.exports = router;
// var oracledb = require('oracledb');
//
// oracledb.getConnection(
//     {
//         user          : "jingmin",
//         password      : "jmyu1994",
//         connectString : "oracle.cise.ufl.edu:1521/orcl"
//     },
//     function(err, connection)
//     {
//         if (err) {
//             console.error(err.message);
//             return;
//         }
//         connection.execute(
//             'select * from country',  // bind value for :id
//             function(err, result)
//             {
//                 if (err) {
//                     console.error(err.message);
//                     doRelease(connection);
//                     return;
//                 }
//                 console.log(result.rows);
//                 doRelease(connection);
//             });
//
//     });
//
// function doRelease(connection)
// {
//     connection.close(
//         function(err) {
//             if (err)
//                 console.error(err.message);
//         });
// }
//