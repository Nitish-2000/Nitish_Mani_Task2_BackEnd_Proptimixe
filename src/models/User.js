const mongoose = require('./index')

validateEmail = (e)=>{
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(e);
}

const userSchema = mongoose.Schema({
    firstName:{type:String,required:[true,"First Name is Required"]},
    lastName:{type:String,required:[true,"Last Name is Required"]},
    email:{type:String,required:[true,"Email is Required"],validate:validateEmail},
    password:{type:String,required:[true,"Email is Required"]},
    status:{type:Boolean,default:true},
    role:{type:String,default:'customer'},
    createdAt:{type:Date, default:Date.now()}
    
},{
    versionkey:false
})

const userModel = mongoose.model('users',userSchema)
module.exports = userModel