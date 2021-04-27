const { response } = require('express');
const { user } = require('../config/mongoose');
const User=require('../models/user');
const bcrypt =require('bcrypt');

//controller for sign In
module.exports.signIn=function(req,res){
    return res.render('_userSignIn',{
        title:'Sign In'
    })
}

//controller for sign Up
module.exports.signUp=function(req,res){
    return res.render('_userSignUp',{
        title:'Sign Up'
    })
}

//create user
module.exports.create= async function(req,res){
    // confirm password and password are not same
    if(req.body.confirmpassword != req.body.password){
        req.flash('success', 'Password and Confirm Password are Not Same');
        return res.redirect('back');
    }
    // check the user is already present
    let user= await User.findOne({email: req.body.email});        
        //if user is not present the create the user
        if(!user){
            let newUser = new User();
            newUser.name = req.body.name;
            newUser.email = req.body.email;
            newUser.password = req.body.password;
            // newUser.setPassword(req.body.password);
            
            await newUser.save();               
            return res.redirect('/users/signin');
            
            
        }else{
            //if user is find then redirect to sign in page

            return res.redirect('/users/signin');
        }
}

//sign in create session 
module.exports.createSession=async function(req,res){
    //find the user
    try{
        let user=await User.findOne({email:req.body.email});
        //handle user find
        if(user){
            //handle password match  
            const userLogin= await bcrypt.compare(req.body.password, user.password);    
            
            //handle session creation for login user
            if(userLogin){
                res.cookie('user_id',user.id);
                req.flash('success', 'Logged In SuccessFully');
                return res.redirect('/users/profile');
            }else{
                req.flash('success', 'Invalid Username Or Password');
                return res.redirect('back');           
            }

        }else{
            //handle user not found
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error',err);
    }
    
            
}

module.exports.profile=function(req,res){
    //if user is logged in
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err,user){
            if(err){
                console.log('Error in finding user profile');
                return;
            }
            if(user){
                return res.render('profile',{
                    title:user.name,
                    user:user
                })
            }
        })
    }else{
        //if user is not loggend in
        return res.redirect('/users/signin');
    }
    
}

//delete Session
module.exports.deleteSession=function(req,res){
     res.clearCookie('user_id');
     req.flash('success', 'Logged out SuccessFully');
     return res.redirect('/users/signin');
}

//update password
// module.exports.updatePassword= async function(req,res){
//     let user=await User.findByIdAndUpdate(req.params.id,{
//         password:req.body.confirmpassword
//     })

//     //  user.save();
//      req.flash('success', 'Password Reset');
//     res.redirect('back');
// }   