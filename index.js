const express=require('express');
const app=express();

const port=8000;

//import expressLayout
const expressLayouts=require('express-layout');

app.use(express.static('./assets'));

//use expressLayout for view
app.use(expressLayouts);

//extract styles and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//setting up view engine and path
app.set('view engine','ejs');
app.set('views','./views');

//firing Up the express server
app.listen(port,function(err){
    if(err){
        console.log('Error in server starting',err);
        return;
    }
    console.log('server is running on port:',port);
})
