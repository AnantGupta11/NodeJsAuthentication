const passport= require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

//tell passport to use a new Strategy for google login
passport.use(new googleStrategy({
        clientID: "331776835487-nupm71gfigbevkjjb31li85sel8u236n.apps.googleusercontent.com",
        clientSecret: "6bMufKb91wb4XOLVpyP9guAF",
        callbackURL: "http://localhost:3000/users/auth/google/callback",
    },
    function(accessToken, refreshToken,profile,done){
        //find a User
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log("Error in google strategy passport",err);
                return;
            }
            // console.log(profile);
            //if found set the user as req.user
            if(user){
                return done(null,user);
            }else{
                //if not found then create the user and set it as req.user
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){
                        console.log("Error in creating User google strategy passport",err);
                        return;
                    }
                    return done(null,user);
                })
            }
        })
    }
))
module.exports=passport;