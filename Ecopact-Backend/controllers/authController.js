const asyncHandler=require('express-async-handler');
const {validateRegisterUser,validateLoginUser,User}=require('../Models/User')
const bcrypt=require('bcrypt')
const fs=require('fs')
const path=require('path');
const crypto = require("crypto");
const { VerificationTokenModel } = require('../Models/VerificationToken');
const { sendLoginMail } = require('../lib/sendMailLoginVerification');

/***---------------------------
 * @desc Register new user
 * @Route /api/auth/register
 * @Request post
 * @access public
-----------------------------*/
const registerUser= asyncHandler (async (req,res)=>{
    const {error}=validateRegisterUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let user=await User.findOne({email:req.body.email});
    if(user) return res.status(400).send("User already exists");
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(req.body.password,salt);
    user= new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:hashedPassword,
        phoneNumber:req.body.phoneNumber,
        profilePhoto:req.file ? req.file.buffer : fs.readFileSync(path.join(__dirname,'../assets/profilePhoto.jpg')) 
    });
    await user.save();
    //creating new verification token and send it to DB
    const verificationToken= new VerificationTokenModel({
        userId:user._id,
        token:crypto.randomBytes(32).toString("hex")
    })
    await verificationToken.save()
    //making the link
    const link=`http://localhost:5173/users/${user._id}/verify/${verificationToken.token}` 
    
    //putting the link in a html template
    const htmlTemplate=`
        <div className='w-full mx-auto'>
        <div>click on the link below to verify your email</div>
        <a href="${link}" className=' text-blue-500'>Verify your account</a>
        </div>
    `;
    //sending email to the user
    
    await sendLoginMail(user.email,"verify your email",htmlTemplate)
    
    return res.status(201).send("we sent to you an email,please verify your email address");
})


/***---------------------------
 * @desc Login user
 * @Route /api/auth/login
 * @Request post
 * @access public
-----------------------------*/
const userSignIn = asyncHandler(async(req,res)=>{
    const {error} = validateLoginUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user || !(await bcrypt.compare(password,user.password))){
        return res.status(400).send('Invalid email or password');
     }
     if(!user.isAccountVerified){
        let verifyToken=VerificationTokenModel.findOne({
            userId:user._id
        })
        if(!verifyToken){
            verifyToken= new VerificationTokenModel({
                userId:user._id,
                token:crypto.randomBytes(32).toString("hex")
            })
            await verifyToken.save()
            const link=`http://localhost:5173/users/${user._id}/verify/${verifyToken.token}` 
            const htmlTemplate=`
                <div className='w-full mx-auto'>
                <div>click on the link below to verify your email</div>
                <a href="${link}" className=' text-blue-500'>Verify</a>
                </div>
            `;
            await sendLoginMail(user.email,"verify your email",htmlTemplate)
            
            return res.status(201).send("we sent to you an email,please verify your email address");
        }
        res.status(400).send("we sent to you an email,please verify your email address");
    }
     const token=user.generateAuthToken();
     return res.status(201).send({
        _id: user._id,
        isAdmin: user.isAdmin,
        token: token,
        firstName:user.firstName,
        lastName:user.lastName,
        email: user.email,
        profilePhoto: user.profilePhoto,
        phoneNumber: user.phoneNumber,
        isAccountVerified: user.isAccountVerified
     })

})

/**---------------------------------
 * @desc verify user account 
 * @route /api/auth/:userId/verify/:token
 * @resquest get
 * @acess public
 ------------------------------------*/
 const verifyUserAccount=asyncHandler(async (req,res)=>{
    const user=await User.findById(req.params.userId);
    if(!user){
        return res.status(400).send("invalid link");
    }
    const verificationToken= await VerificationTokenModel.findOne({
        userId:user._id,
        token:req.params.token
    })
    
    if(!verificationToken){
        return res.status(400).send("invalid link");
    }
    user.isAccountVerified=true;
    await user.save();
    const result=await VerificationTokenModel.findByIdAndDelete({ _id: verificationToken._id });
    res.status(200).send("Your account is now verified")
})

module.exports={registerUser,userSignIn,verifyUserAccount}