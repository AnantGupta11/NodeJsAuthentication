const express=require('express');

// install cookie parser and require it 
const cookieParser=require('cookie-parser');
const app=express();
const port=3000;
//import expressLayout
const expressLayouts=require('express-ejs-layouts');
const db= require('./config/mongoose');

const session=require('express-session');

//use for session cookie
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo')(session);
const flash=require('connect-flash');
const customMware= require('./config/middleware');

// reading through the post request
app.use(express.urlencoded());


//setting up cookieParser
app.use(cookieParser());


app.use(express.static('./assets'));

//use expressLayout for view
app.use(expressLayouts);

//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//setting up view engine and path
app.set('view engine','ejs');
app.set('views','./views');

//MongoStore is use to store the session cookie in db
app.use(session({
    name: 'NodejsAuth',
    //todo change the secret before deployment
    secret:'ssshhhhh',
    saveUninitialized:false,
    resave:false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: new MongoStore({
        mongooseConnection:db,
        autoRemove:'disabled'
    },function(err){
        if(err){
            console.lof(err || 'Connect-mongo is ok');
        }
    }
    )

}));

// app.use(session({secret:'ssssshhhhhh'}));
app.use(passport.initialize());
app.use(passport.session());

// app.use(passport.setAuthenticatedUser);

app.use(flash());

app.use(customMware.setFlash);

//use express router
app.use('/', require('./routes'));

//firing Up the express server
app.listen(port,function(err){
    if(err){
        console.log('Error in server starting',err);
        return;
    }
    console.log('server is running on port:',port);
})
