const express=require('express');
const app=express();

const port=8000;




//firing Up the express server
app.listen(port,function(err){
    if(err){
        console.log('Error in server starting',err);
        return;
    }
    console.log('server is running on port:',port);
})
