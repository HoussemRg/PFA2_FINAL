const asyncHandler=require('express-async-handler');
const { validateData, Data } = require("../Models/Data");
const xlsx=require('xlsx');
const  mongoose= require('mongoose');
const { Alert } = require('../Models/Alert');


/***---------------------------
 * @desc Add new data
 * @Route /api/data/add
 * @Request post
 * @access user logged in
-----------------------------*/
const addNewReport=asyncHandler(async(req,res)=>{
    const userId=req.user.id;
    if(!req.file){
        return res.status(400).send("no file provided");
     }
     const reportName=req.file.originalname;
     const workbook=xlsx.read(req.file.buffer);
     const sheet = workbook.Sheets[workbook.SheetNames[0]];
     const jsonData = xlsx.utils.sheet_to_json(sheet, { raw: true });
     let alertData=[];
     for(const row of jsonData){
        const {error}=validateData({date:row.date,data:{dataName:row.dataType,dataRate:row.rate}});
        if(error) return res.status(400).send(`${error.details[0].message} in a field of your data`);
        if(typeof(row.date)==='number'){
         row.date=new Date((row.date - 25569) * 86400 * 1000);
        }
        const timeSerie= new Data({
           date:row.date,
           data:{
            dataName:row.dataType,
            dataRate:row.rate
           },
           user:userId 
        })
        const existingData=await Data.findOne({user:userId,date:timeSerie.date,'data.dataName':timeSerie.data.dataName});
        
        if(!existingData){
         await timeSerie.save()
         if(timeSerie.data.dataName==="NH4" && timeSerie.data.dataRate>1){
            alertData.push(timeSerie._id);
         }else if(timeSerie.data.dataName==="PxOy" && timeSerie.data.dataRate>1){
            alertData.push(timeSerie._id);
         }else if(timeSerie.data.dataName==="NO3" && timeSerie.data.dataRate>50){
            alertData.push(timeSerie._id);
         }
        }
     }
     if(alertData.length!==0){
      await Alert.create({
         user:userId,
         fileName:reportName,
         data:alertData,
      })
     }
     return res.status(200).send("file uploaded successfully");
})

/***---------------------------
 * @desc Get Averate Rate of data type given
 * @Route /api/data/dataPerDate
 * @Request post
 * @access user logged in
-----------------------------*/
const getDataPerDate=asyncHandler(async (req,res)=>{
   const dataType=req.body.dataType;
   const givenDate=new Date(req.body.date);
   const userId=req.user.id;
   const data= await Data.findOne({user:userId,date:givenDate,'data.dataName':dataType});
   if(!data){
      return res.status(404).send(`${dataType} is not found for this date`);
   }
   res.status(200).send(data); 
})

/***---------------------------
 * @desc Get Averate Rate of data type given
 * @Route /api/data/average
 * @Request get
 * @access user logged in
-----------------------------*/
const getAverageOfAllData=asyncHandler(async (req,res)=>{
   const dataType = req.params.type;
   if(!dataType){
      return res.status(400).send("No data given");
   }
   const userId=req.user.id;
   const data= await Data.find({user:userId,'data.dataName':dataType});
   if(data.length ===0){
      return res.status(404).send("No data found");
   }
   let avg=0;
   for(let i=0;i<data.length;i++){
      avg+=data[i].data.dataRate;
   }
   avg=(avg/data.length).toFixed(2);
   res.status(200).send({averageRate:avg});
})




/***---------------------------
 * @desc Get data of data type and month  given
 * @Route /api/data/dataPerMonth
 * @Request get
 * @access user logged in
-----------------------------*/
const getDataPerMonth=asyncHandler(async (req,res)=>{
   const dataType=req.body.dataType;
   const month=parseInt(req.body.month);
   const year=parseInt(req.body.year);
   const userId=req.user.id;
   const data= await Data.find({user:userId,'data.dataName':dataType});
   if(data.length ===0){
      return res.status(404).send(`${dataType} is not found`);
   }
   
   
   let filteredData=data.filter(data=> data.date.getMonth()+1 ===month && data.date.getFullYear()===year);
   
   if(filteredData.length===0){
      return res.status(404).send(`no data found for this date`);
   }
   
   res.status(200).send(filteredData); 
})


/***---------------------------
 * @desc Get data of data type and year  given
 * @Route /api/data/dataPerYear
 * @Request get
 * @access user logged in
-----------------------------*/
const getDataPerYear=asyncHandler(async (req,res)=>{
   const userId=req.user.id;
   const dataType=req.body.dataType;
   const year=parseInt(req.body.year);
   const data= await Data.find({user:userId,'data.dataName':dataType});
   if(data.length ===0){
      return res.status(404).send(`${dataType} is not found`);
   }
   const filteredData=data.filter(data=> data.date.getFullYear()===year);
   if(filteredData.length===0){
      return res.status(404).send(`no data found for this date`);
   }
   res.status(200).send(filteredData); 
})
/***---------------------------
 * @desc Get recent data of data type given 
 * @Route /api/data/recent/:type
 * @Request get
 * @access user logged in
-----------------------------*/
const getRecentData=asyncHandler(async (req,res)=>{
   const userId=req.user.id;
   const dataType=req.params.type;
   const data= await Data.find({user:userId,'data.dataName':dataType}).sort({date:-1}).limit(15);
   if(data.length ===0){
      return res.status(404).send(`${dataType} is not found`);
   }
   const sortedArrayData = data.sort((a, b) => a.date - b.date)
   res.status(200).send(sortedArrayData);
})
const getNumberArrangements=asyncHandler(async (req,res)=>{
   const userId=req.user.id;
   const NH4Number=await Data.countDocuments({user:userId,'data.dataName':'NH4'})
   const PxOyNumber=await Data.countDocuments({user:userId,'data.dataName':'PxOy'})
   const NO3Number=await Data.countDocuments({user:userId,'data.dataName':'NO3'})
   res.status(200).send([NH4Number,PxOyNumber,NO3Number])
});


module.exports={addNewReport,getAverageOfAllData,getDataPerMonth,getDataPerYear,getDataPerDate,getRecentData,getNumberArrangements}