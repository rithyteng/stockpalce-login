var mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var Users = mongoose.model("Users");
var Items = mongoose.model("Items");
module.exports = {
    register: (req, res) =>{
            Users.findOne({email:req.body.email},(err,user)=>{
            if(err){
                console.log('Error');
                res.json({message:"Error",error:err})
            }
            else if(user){
                res.json({message:"Email Already Existed"})
            }
            else{
                hashed=bcrypt.hash(req.body.password,10).then(hashed =>{
                    console.log(hashed,'Hased Password');

                    var users = new Users({email:req.body.email,username:req.body.username,password:hashed});
                    users.save(function(err,users){
                        if(err){
                        console.log("Something is Wrong");
                        res.json({message:"Error",error:err})
                        }
                        if(users){
                        console.log("Sucessfully Added A User")
                        res.json({user:"Success"})
                        }
                        })
                    }).catch(error=>{res.redirect='/'})
            }
            })
        // Users.create(req.body, (err, user)=>{
        //     if(err){
        //         res.json(err);
        //     } else{
        //         console.log("added succesfully");
        //         res.json({message: "Succesful", user:user});
        //     }
        // })
    },
    login:(req,res)=>{
        console.log(req.body.username,'Username');
        Users.findOne({username:req.body.username},(err,user)=>{
            if(err){
                res.json({message: "Error with login", error: err})
            }
            if(user){
                test=bcrypt.compareSync(req.body.password,user.password);
                if(test==true){

                    req.session.email = user.email;
                    console.log(req.session.email,'Testing');
                    console.log('Testing');
                    console.log(user.email);
                    res.json({users:'success'})
                    }
                else{
                    console.log('WRONG PASSWORD');
                    res.json({message:'Wrong Password'})
                    }
                }
             // Users.findOne({username:req.body.username,password:req.body.password},(err,users)=>{
                //     if(err){
                //         res.json(err);
                //         console.log('Password Does Not Match')
                //     }
                //     if(users){
                //         // req.session.em=users.email;
                //         console.log(users,"users");
                //         res.json({message: "Succesfully",user:users});
                //     }
                //     else{
                //         console.log('Password Does Not Match!')
                //         res.json({message: "Username or password is not valid"})
                //     }

                // })
            else{
                console.log('Username Does Not Exist');
                res.json({message: "Username or password is not valid"})
            }
        })
    },
    create: (req, res) =>{
        // console.log(req.body, "this is the form");
        Items.create({title:req.body.title,price:req.body.price,imgUrl:req.body.imgUrl,description:req.body.description,brand:req.body.brand,user:req.session.email}, (err, item)=>{
            if(err){
                res.json(err);
            } else{
                console.log(req.body,'****USER',item);
                console.log('Testing')
                res.json({message: "Success", item:item})
                
            }
        })
    },
    finditem: (req,res)=>{
        console.log("Inside Find My Item");
        Items.find({user:req.session.email},(err,item)=>{
            if(err){
                res.json(err)
            }
            else{
                console.log(item,'*********');
                res.json({message: "Success", items:item})
                
            }
        })
    },
    all: (req, res) =>{
        Items.find({}, (err, items)=>{
            if(err){
                res.json(err);
            } else{
                res.json(items);
            }
        })
    },
    one: (req, res) =>{
        Items.findOne({_id:req.params.id}, (err, item)=>{
            if(err){
                res.json(err);
            } else{
                res.json({message:"Success", item:item})
            }
        })
    },
    
    views: (req, res) =>{
        console.log('In Views 2');
        Items.findOneAndUpdate({_id:req.params.id},{$inc:{"view":1}}, (err, item)=>{
            if(err){
                res.json(err);
            } else{
                console.log('In Views');
                res.json({message:"Success", item:item})
            }
        })
    },
    validate:(req,res)=>{
        console.log(req.session);
        console.log(req.session.email);
        // console.log(req.session._expires,'Expires Session');
        if(req.session.email){
            console.log('Testing In items.js validate')
            res.json({message:"Success"});
        }
        else{
            res.json({error:"Errors"})
        }
    },
    logout:(req,res)=>{
        console.log(req.session.email,'Logout')
        req.session.destroy();
        console.log('Testing');
        res.json({message:"Success"});
        
    }
}