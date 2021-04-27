const passport= require('passport');
// const bcrypt=require('bcrypt');
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
                req.flash('error',err);
                console.log('Error in finding user',err);
                 return done(err);
            }
            // const userLogin=  bcrypt.compare(password, req.body.password);
            // const userLogin=user.validPassword(password);
            if(!user || (!user.validPassword(password))){
                req.flash('error','Invalid Username/PassWord');
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

//check if the user is Authenticated
passport.checkAuthentication= function(req,res,next){
    //if the user is signed in then pass on hte next function (controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in
    return res.redirect('users/signin');
}

//check if the user is logged in
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from cookie and we are just sending this to the locals to views
        res.locals.user=req.user;
        
    }
    next();
}

module.exports = passport;