const mongoose = require('mongoose');
// const joi = require('joi');
const Userschema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

    },
    // email: joi.string().min(6).required().email(),
    password: {
        require: true,
        type: String
    },
    token: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Userdata", Userschema)