const { response } = require('express');
const { user } = require('../config/mongoose');
const User=require('../models/user');
const bcrypt =require('bcrypt');

//controller for sign In
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }
    return res.render('_userSignIn',{
        title:'Sign In'
    })
}

//controller for sign Up
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }
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
module.exports.createSession= function(req,res){
    req.flash('success', 'Logged In SuccessFully');
    return res.redirect('/');
}

//render the profile page
module.exports.profile=function(req,res){
    
    User.findById(req.params.id, function(err,user){
                
        res.render('profile',{
            title:user.name,
            user:user
        })
        
    })
    
    
}

//delete Session
module.exports.deleteSession=function(req,res){
    req.logout();
    req.flash('success', 'Logged out SuccessFully');
    return res.redirect('/');
}

//update password
module.exports.updatePassword=async function(req,res){
    try{
        if(req.user.id==req.params.id){
            let user=await User.findById(req.params.id);
            user.password=req.body.password;
            await user.save();
        }
    }catch(err){
        console.log('Error',err);
        return res.redirect('back');
    }
    
}