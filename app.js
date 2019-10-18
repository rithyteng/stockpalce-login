var express = require('express');
var app = express();
var bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
var session = require('express-session');
var reload = require('reload')

app.use(bodyParser.json());
app.use(express.static( __dirname + '/public/dist/public' ));

var path = require('path');
// const bcrypt = require('bcrypt');
require('./backend/models/item.js');
require('./backend/config/mongoose.js');

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
  }))

var routes = require('./backend/config/routes.js');
routes(app);

app.listen(8000, function(req,res){
    console.log("listening on 8000");
})