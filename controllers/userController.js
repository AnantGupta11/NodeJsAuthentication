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


