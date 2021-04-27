const passport= require('passport');
const bcrypt=require('bcrypt');
const LocalStrategy= require('passport-local').Strategy;
const User=require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback:true
    },
    function(req,email,password,done){
        //find the user and establish the identity
        User.findOne({email:email}, function(err,user){
            if(err){
                console.log('Error in finding user',err);
                 return done(err);
            }
            const userLogin=  bcrypt.compare(password, req.body.password);
            if(!user || (!userLogin)){
                console.log('Invalid Username/Password');
                done(null,false);
            }
            return done(null,user);
        })
    }
));

//serialize the user to decide to which key  is to be kept in the cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserlize the user from the key in the cookie
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user',err);
             return done(err);
        }
        return done(null,user);
    })
})

module.exports = passport;