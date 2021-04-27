// require mongoose
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

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
    }
},{
    timestamps:true
});

//hasing the password before saving
UserSchema.pre('save', async function (next) {
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password, 12);
        // this.confirmpassword=bcrypt.hash(this.confirmpassword, 12);
    }
    next();
});
const User= mongoose.model('User',UserSchema);

  //export User
module.exports=User;
  