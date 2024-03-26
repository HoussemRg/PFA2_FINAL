const  mongoose= require('mongoose');
const { Alert } = require('../Models/Alert');
const asyncHandler=require('express-async-handler')

/***---------------------------
 * @desc Get all reports that depassed the seuil 
 * @Route /api/alerts
 * @Request get
 * @access  adminUser
-----------------------------*/
const getAllAlertData=asyncHandler(async (req,res)=>{
    
    const data= await Alert.find().populate("user", "firstName lastName profilePhoto").sort({createdAt:-1});
    
    res.status(200).send(data); 
 })

/***---------------------------
 * @desc Get reports that depassed the seuil for ANPE
 * @Route /api/alerts/ANPE
 * @Request get
 * @access  adminUser
-----------------------------*/
const getANPEAlertData=asyncHandler(async (req,res)=>{
    
    const data= await Alert.find({isChecked:false}).populate("user", "firstName lastName profilePhoto").sort({createdAt:-1});
    
    res.status(200).send(data); 
 })



/***---------------------------
 * @desc Get reports that depassed the seuil for client
 * @Route /api/alerts/client/:id
 * @Request get
 * @access  only for client
-----------------------------*/
const getClientAlertData=asyncHandler(async (req,res)=>{
    const userId=req.params.id;
    const data= await Alert.find({user:userId,isChecked:true}).sort({createdAt:-1}).populate("user", "firstName lastName profilePhoto");
    res.status(200).send(data); 
 })

/***---------------------------
 * @desc chek up reports that depassed the seuil 
 * @Route /api/alerts/ANPE/:id
 * @Request put
 * @access  adminUser
-----------------------------*/
const checkAlertData=asyncHandler(async (req,res)=>{
    
    const data = await Alert.findOneAndUpdate(
        { _id: req.params.id },
        { isChecked: true },
        { new: true }
    ).populate("user", "firstName lastName").populate("data", "data date");
    res.status(200).send(data); 
 })

/***---------------------------
 * @desc chek up reports that depassed the seuil 
 * @Route /api/alerts/report/:id
 * @Request put
 * @access  Only for client
-----------------------------*/
const viewAlertData=asyncHandler(async (req,res)=>{
    const userId=req.user.id;
    await Alert.findOneAndUpdate({ _id: req.params.id },{
        isViewed:true
    },{new:true}).populate("user", "firstName lastName").populate("data","data date");
    const data=await Alert.find({user:userId,isChecked:true}).sort({createdAt:-1});
    res.status(200).send(data); 
 })

 /***---------------------------
 * @desc get data list that depassed the seuil 
 * @Route /api/alerts/report/:id
 * @Request put
 * @access  adminUser or user himself
-----------------------------*/
const getSingleReportData=asyncHandler(async (req,res)=>{
    
    const data= await Alert.findById(req.params.id).populate("user", "firstName lastName").populate("data","data date");
    if(!data){
       return res.status(404).send(`data not found`);
    }
    res.status(200).send(data); 
 })



 module.exports={getANPEAlertData,getClientAlertData,checkAlertData,getSingleReportData,viewAlertData,getAllAlertData}