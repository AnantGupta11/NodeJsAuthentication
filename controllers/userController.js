const User=require('../models/user');

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
module.exports.create= function(req,res){
    // confirm password and password are not same
    if(req.body.confirmpassword != req.body.password){
        return res.redirect('back');
    }
    // check the user is already present
    User.findOne({email: req.body.email}, function(err,user){
        if(err){
            console.log('Error in finding user In Signing Up',err);
            return;
        }
        
        //if user is not present the create the user
        if(!user){
            User.create(req.body,function(err){
                if(err){
                    console.log('Error in creating User',err);
                    return;
                }
                //if no error then user is created and redirect to sign in page
                return res.redirect('/users/signin')                
            })
        }else{
            //if user is find then redirect to sign in page

            return res.redirect('/users/signin');
        }
    });
    

}

//sign in create session 
module.exports.createSession=function(req,res){

}
