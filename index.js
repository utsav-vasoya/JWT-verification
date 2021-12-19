const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser=require('body-parser')
const route = require('./Route/app');
const port = process.env.PORT || 3000;
const url = "mongodb+srv://utsav:Utsav%405289@cluster0.x4v0q.mongodb.net/JWT"
app.use(express.json())
app.use('/',route);
route.use(bodyParser.json());

mongoose.connect(url, {useNewUrlParser: true}, () => {
    console.log('Mongodb connected');

})
app.listen(port,console.log(`server listiong at port ${port}`));
