const asyncHandler=require('express-async-handler');
const { validateData, Prediction } = require("../Models/Prediction");
const xlsx=require('xlsx');
const { default: mongoose } = require('mongoose');

const addNewPredictionReport=asyncHandler(async(req,res)=>{
    const userId=req.user.id;
    if(!req.file){
        return res.status(400).send("no file provided");
     }
     const workbook=xlsx.read(req.file.buffer);
     const sheet = workbook.Sheets[workbook.SheetNames[0]];
     const jsonData = xlsx.utils.sheet_to_json(sheet, { raw: true });
     for(const row of jsonData){
        const {error}=validateData({date:row.date,data:{dataName:row.dataType,dataRate:row.rate}});
        if(error) return res.status(400).send(`${error.details[0].message} in a field of your data`);
        if(typeof(row.date)==='number'){
         row.date=new Date((row.date - 25569) * 86400 * 1000);
        }
        const timeSerie= new Prediction({
           date:row.date,
           data:{
            dataName:row.dataType,
            dataRate:row.rate
           },
           user:userId 
        })
        const existingData=await Prediction.findOne({user:userId,date:timeSerie.date,'data.dataName':timeSerie.data.dataName});
        
        if(!existingData){
         await timeSerie.save()
         
        }
     }
     return res.status(200).send("file uploaded successfully");
});
const getAverageOfAllPredictionData=asyncHandler(async (req,res)=>{
   const dataType = req.params.type;
   if(!dataType){
      return res.status(400).send("No Prediction given");
   }
   const userId=req.user.id;
   const data= await Prediction.find({user:userId,'data.dataName':dataType});
   if(data.length ===0){
      return res.status(404).send("No Prediction found");
   }
   let avg=0;
   for(let i=0;i<data.length;i++){
      avg+=data[i].data.dataRate;
   }
   avg=(avg/data.length).toFixed(2);
   res.status(200).send({averageRate:avg});
})

const getPredictionDataPerDate=asyncHandler(async (req,res)=>{
   const dataType=req.body.dataType;
   const givenDate=new Date(req.body.date);
   const userId=req.user.id;
   const prediction= await Prediction.findOne({user:userId,date:givenDate,'data.dataName':dataType});
   if(!prediction){
      return res.status(404).send(`${dataType} is not found for this date`);
   }
   res.status(200).send(prediction); 
})
const getPredictionDataPerMonth=asyncHandler(async (req,res)=>{
   const dataType=req.body.dataType;
   const month=parseInt(req.body.month);
   const year=parseInt(req.body.year);
   const userId=req.user.id;
   const prediction= await Prediction.find({user:userId,'data.dataName':dataType});
   if(prediction.length ===0){
      return res.status(404).send(`${dataType} is not found`);
   }
   
   
   let filteredData=prediction.filter(data=> data.date.getMonth()+1 ===month && data.date.getFullYear()===year);
   
   if(filteredData.length===0){
      return res.status(404).send(`no data found for this date`);
   }
   
   res.status(200).send(filteredData); 
})

const getPredictionDataPerYear=asyncHandler(async (req,res)=>{
   const userId=req.user.id;
   const dataType=req.body.dataType;
   const year=parseInt(req.body.year);
   const data= await Prediction.find({user:userId,'data.dataName':dataType});
   if(data.length ===0){
      return res.status(404).send(`${dataType} is not found`);
   }
   const filteredData=data.filter(data=> data.date.getFullYear()===year);
   if(filteredData.length===0){
      return res.status(404).send(`no data found for this date`);
   }
   res.status(200).send(filteredData); 
})
const getRecentPredictionData=asyncHandler(async (req,res)=>{
   const userId=req.user.id;
   const dataType=req.params.type;
   const data= await Prediction.find({user:userId,'data.dataName':dataType}).sort({date:-1}).limit(15);
   if(data.length ===0){
      return res.status(404).send(`${dataType} is not found`);
   }
   const sortedArrayData = data.sort((a, b) => a.date - b.date)
   res.status(200).send(sortedArrayData);
})
const getNumberArrangements=asyncHandler(async (req,res)=>{
   const userId=req.user.id;
   const NH4Number=await Prediction.countDocuments({user:userId,'data.dataName':'NH4'})
   const PxOyNumber=await Prediction.countDocuments({user:userId,'data.dataName':'PxOy'})
   const SNumber=await Prediction.countDocuments({user:userId,'data.dataName':'NO3'})
   res.status(200).send([NH4Number,PxOyNumber,SNumber])
})


module.exports={addNewPredictionReport,getAverageOfAllPredictionData, getPredictionDataPerMonth, getPredictionDataPerYear,getNumberArrangements,  getPredictionDataPerDate,getRecentPredictionData}