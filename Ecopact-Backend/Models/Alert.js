const mongoose=require('mongoose');

const alertSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    fileName:{
        type:String,
        required:true
    },
    data:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Data",  
    }],
    isChecked:{
        type : Boolean,
        default : false
    },
    isViewed:{
        type : Boolean,
        default : false
    },
    
},{timestamps:true});



const Alert=mongoose.model("Alert",alertSchema)
module.exports={Alert};