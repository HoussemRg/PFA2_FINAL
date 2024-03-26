const Joi=require('joi')
const mongoose=require('mongoose');
const fs=require('fs')
const jwt = require('jsonwebtoken');


const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:100,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:100,
    },
    email:{
        type :String,
        required:true,
        minlength:5,
        unique:true
    },
    password:{
        type :String,
        required:true,
        minlength:5,
        maxlength:200,
        unique:true
    },
    phoneNumber:{
        type :String,
        required:true,
    },
    profilePhoto:{
        type:Buffer
    },
    isAdmin:{
        type : Boolean,
        default : false
    },
    isAccountVerified:{
        type : Boolean,
        default : false
    }
},{timestamps:true});

userSchema.methods.generateAuthToken=function(){
    return jwt.sign({id:this._id, isAdmin:this.isAdmin},process.env.JWT_SECRET);
}

const validateRegisterUser=(obj)=>{
    const schema=Joi.object({
        firstName:Joi.string().min(3).max(100).trim().required(),
        lastName:Joi.string().min(3).max(100).trim().required(),
        email:Joi.string().email().min(5).required(),
        password:Joi.string().min(5).max(50).required(),
        phoneNumber:Joi.string().required(),
    })
    return schema.validate(obj);
}

const validateLoginUser=(obj)=>{
    const schema=Joi.object({
        email:Joi.string().email().min(5).required().trim(),
        password:Joi.string().min(5).max(50).required().trim(),
    })
    return schema.validate(obj);
}
const validateUpdateUser=(obj)=>{
    const schema=Joi.object({
        firstName:Joi.string().min(3).max(100).trim(),
        lastName:Joi.string().min(3).max(100).trim(),
        email:Joi.string().email().min(5).trim(),
        password:Joi.string().allow('', null).min(5).max(50).trim(),
        phoneNumber:Joi.string().trim(),
    })
    return schema.validate(obj);
}
const User=mongoose.model("User",userSchema)
module.exports={validateRegisterUser,User,validateLoginUser,validateUpdateUser};