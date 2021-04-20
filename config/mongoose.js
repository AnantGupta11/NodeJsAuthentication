//require the mongoose library
const mongoose=require('mongoose');

//connect it to database
mongoose.connect('mongodb://localhost/nodejsAuthentication');

//establish connection
const db=mongoose.connection;

// if there is any error in connecting to db
db.on('error',console.error.bind(console,"Error connecting to mongodb"));

//if connection establish successfully
db.once('open',function(){
    console.log('Connected to database : MongoDb');

})

//export the db
module.exports=db;