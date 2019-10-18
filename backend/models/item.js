var mongoose = require("mongoose");
require('../config/mongoose.js');
var UserSchema = new mongoose.Schema({
    username: {type: String, required: [true, "Must provide a user name"], minlength: [5, "Must be longer than 5 characters"]},
    email: {type: String, require: [true, "Must provide an email"], match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please input valid email"],
},
    password: {type: String, required: [true, "Must provide a password"]}
})
mongoose.model("Users", UserSchema);
var ItemSchema = new mongoose.Schema({
    title: {type: String, required: [true, "Must provide a title"], minlength: [2, "Must be 2 characters long"]},
    price: {type: Number, required: [true, "Must provide a price"]},
    imgUrl: {type: String},
    description: {type: String, required: [true, "Must provide description"], minlength: [3, "Must be 3 characters"]},
    brand: {type: String, required: [true, "Select brand"]},
    user: {type: String},
    view: {type: Number,default:0}
},
{timestamps: true});



mongoose.model("Items", ItemSchema);

