const asyncHandler=require('express-async-handler');
const {User,validateUpdateUser}=require('../Models/User');
const {Data}=require('../Models/Data');
const bcrypt = require('bcrypt');
const {OTP}=require('../Models/OTP');
const sendMail = require('../lib/sendMail');
const sendEmailVerif = require('../lib/sendEmailVerif');
const { Alert } = require('../Models/Alert');
const { Prediction } = require('../Models/Prediction');

/***---------------------------
 * @desc delete user
 * @Route /api/user/:id
 * @Request delete
 * @access only for admin or user himself
-----------------------------*/
const deleteUser = asyncHandler(async(req,res)=>{
    const userId = req.params.id;
    const fetchedUser=await User.findById(userId);
    if(!fetchedUser) return res.status(400).send("User not found");
    const data=await Data.deleteMany({user:userId});
    await Alert.deleteMany({user:userId})
    await Prediction.deleteMany({user:userId})
    await User.findByIdAndDelete(userId);
    return res.status(201).send(fetchedUser);
});

/***---------------------------
 * @desc update user
 * @Route /api/user/:id
 * @Request put
 * @access only for user logged in himself
-----------------------------*/
const updateUser = asyncHandler(async(req, res) => {
    const {error}=validateUpdateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const userId = req.params.id;
    const newUser = req.body;
    const user=await User.findById(userId);
    if(!user) return res.status(404).send("User not found");
    if(newUser.password){
        newUser.password = await bcrypt.hash(newUser.password, 10);
    }
    
    const updatedUser=await User.findByIdAndUpdate(
        { _id: userId },
        { $set: newUser },
        { new: true }
    ).select("-password");
    return res.status(201).send(updatedUser);
});

/***---------------------------
 * @desc update user profilePhoto
 * @Route /api/user/profilePhoto/:id
 * @Request put
 * @access only for user logged in himself
-----------------------------*/
const updateUserProfilePhoto = asyncHandler(async(req, res) => {
    if(!req.file){
        return res.status(400).send("no file provided");
     }
    const userId = req.params.id;
    
    const user=await User.findById(userId);
    if(!user) return res.status(404).send("User not found");
    
    user.profilePhoto=req.file.buffer;
    await user.save();
    const newUser=await User.findById(userId);
    
    
    return res.status(201).send(newUser);
});


const getUsers = asyncHandler(async(req,res)=>{
    const users = await User.find({isAdmin:false},{ password: 0 });
    if(!users) return res.status(404).send('No user found');
    return res.status(200).json({users: users});                
});
const getOneUser = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    const user = await User.findOne(
        { _id: id }, 
        { password: 0}  
      );    
    if(!user) return res.status(404).send('No user found');
    return res.status(200).json({user: user});
});
const sendEmail = asyncHandler(async(req,res)=>{
    const formData = req.body;
    await sendMail(formData);
    return res.status(200).send('Email sent successfully!');
});
const storeOTPCode = asyncHandler(async(req,res)=>{
    const email = req.body.email;
    const otpData = {
        email: req.body.email,
        otpCode: req.body.otpCode
    };
    const otpInstance = new OTP(otpData);
    await OTP.deleteMany({ email });
    await otpInstance.save();
    if(otpInstance) return res.status(200).send('OTP stored');
    return res.status(500).send('Internal server error');
    
});
const CompareOTP = asyncHandler(async(req, res) => {
    const sentOTP = req.body.otpCode;
    const foundOTP = await OTP.findOne({ otpCode: sentOTP });
    
    if (!foundOTP) {
        return res.status(400).send('Unable to find corresponding OTP');
    }
    return res.status(200).send("OTP matched successfully");
    
    
});
const changePassword = asyncHandler(async(req,res)=>{
    const otpCode = req.body.otpCode;
    const foundOTP = await OTP.findOne({otpCode: otpCode});
    if (!foundOTP) {
        return res.status(400).send('Unable to find corresponding OTP');
    }
    const email = foundOTP.email;
    const user = await User.findOne({ email: email });
    if(!user) return res.status(400).send('User not found');
    user.password = await bcrypt.hash(req.body.password, 10);
    await user.save();
    return res.status(201).send('Password updated successfully');
});

module.exports={deleteUser,updateUser,updateUserProfilePhoto,getUsers,getOneUser,sendEmail,storeOTPCode,CompareOTP,changePassword};