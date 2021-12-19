const jwt = require('jsonwebtoken');
const config = require('./config');
// var passport = require('passport');


exports.verifyToken = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['access-token'];
    if (token) {
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                return res.status(401).send("Invalid Token");
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send("A token is required for authentication");
    }
};
// exports.verifyToken = (req, res, next) => {
//     const token =
//         req.body.token || req.query.token || req.headers["x-access-token"];

//     if (!token) {
//         return res.status(403).send("A token is required for authentication");
//     }
//     try {
//         const decoded = jwt.verify(token, config.secretKey);
//         req.user = decoded;
//     } catch (err) {
//         return res.status(401).send("Invalid Token");
//     }
//     return next();
// };
// exports.verifyToken = passport.authenticate('jwt', { session: false });

// module.exports = verifyToken;