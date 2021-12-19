const express = require('express');
const bodyParser = require('body-parser');
const route = express.Router();
var model = require('../model/data');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
route.use(bodyParser.json());
const config = require('../Authentication/config');
const auth = require('../Authentication/auth.js');

route.post('/register', (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.send("enter all field");
    }

    model.findOne({ email })
        .then(user => {
            if (user) {
                return res.status(409).send("user exist");
            } else {
                const newuser = new model({
                    name,
                    email,
                    password
                })

                const token = jwt.sign(
                    { user_id: newuser._id, email },
                    config.secretKey,
                    {
                        expiresIn: "48h",
                    }
                );
                // save user token
                newuser.token = token;

                bcrypt.genSalt(10, (err, uv) => {
                    bcrypt.hash(newuser.password, uv, (err, hash) => {
                        if (err) throw err;
                        newuser.password = hash;
                        newuser
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(200).json({
                                    result,
                                    // token,
                                    message: "Registration Successful! Now You can Login"
                                });
                            }).catch(err => res.status(400).json(err));
                    })
                })
            }
        })
})

route.post('/login', auth.verifyToken, (req, res, next) => {
    model.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).send('user not found!  Please register');
            }
            else {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        return res.status(400).send('server error');
                    }
                    //  else
                    if (result) {
                        return res.status(200).json({ result, user, message: 'login successfully' });
                    }
                    return res.send('login info incorrect');

                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
})



module.exports = route;