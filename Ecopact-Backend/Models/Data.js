const mongoose=require('mongoose');
const Joi=require('joi');

const dataSchema=new mongoose.Schema({
    date:{
        type:Date,
        required:true
    },
    data:{
        dataName:{
            type:String,
            required:true,
            minlength:1,
            maxlength:15
        },
        dataRate:{
            type:Number,
            required:true
        },
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
},{timestamps:true})


const validateData=(obj)=>{
    const schema=Joi.object({
        date:Joi.date().required(),
        data:Joi.object({
            dataName:Joi.string().trim().min(1).max(15).required(),
            dataRate:Joi.number().required()
        }).required()
    })
    return schema.validate(obj);
}


const Data=mongoose.model("Data",dataSchema);

module.exports={Data,validateData}