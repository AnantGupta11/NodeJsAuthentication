const express=require('express');

// install cookie parser and require it 
const cookieParser=require('cookie-parser');
const app=express();
// const router=require('express-router')();

const port=8000;
const db= require('./config/mongoose');

// reading through the post request
app.use(express.urlencoded());

//setting up cookieParser
app.use(cookieParser());

//import expressLayout
const expressLayouts=require('express-ejs-layouts');

app.use(express.static('./assets'));

//use expressLayout for view
app.use(expressLayouts);

//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//setting up view engine and path
app.set('view engine','ejs');
app.set('views','./views');

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
