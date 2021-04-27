// require mongoose
const mongoose=require('mongoose');
const crypto=require('crypto');

//create UserSchema
const UserSchema=new mongoose.Schema({
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    hash:String,
    salt:String
},{
    timestamps:true
});
//hasing password using crypto
UserSchema.methods.setPassword =  function(password){
    this.salt = crypto.randomBytes(16).toString('hex'); 
    this.hash = crypto.pbkdf2Sync(password, this.salt,  
    1000, 64, `sha512`).toString(`hex`); 
    return this.hash;
}
UserSchema.methods.validPassword =  function(password){
    var hash = crypto.pbkdf2Sync(password,  
    this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.hash === hash;
}

// //hasing the password before saving using becrypt
// UserSchema.pre('save', async function (next) {
//     if(this.isModified('password')){
//         this.password=await bcrypt.hash(this.password, 12);
//         // this.confirmpassword=bcrypt.hash(this.confirmpassword, 12);
//     }
//     next();
// });
const User= mongoose.model('User',UserSchema);

  //export User
module.exports=User;
  