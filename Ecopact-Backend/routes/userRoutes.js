const express=require('express');
const { verifyToken, verifyTokenForOnlyUser, verifyTokenForOnlyUserOrAdmin } = require('../middlewares/verifyToken');
const { deleteUser, updateUser, getUsers, getOneUser,sendEmail,storeOTPCode,CompareOTP, changePassword, updateUserProfilePhoto} = require('../controllers/userController');
const { validateId } = require('../middlewares/verifyId');
const sendEmailVerif = require('../lib/sendEmailVerif');
const { updloadUserImage } = require('../middlewares/uploadUserImage');


const userRoutes=express.Router();

// delete user route
userRoutes.delete('/:id',validateId,verifyTokenForOnlyUserOrAdmin,deleteUser)


// api/user/:id
// update user route
userRoutes.put('/:id',validateId,verifyTokenForOnlyUser,updateUser)
userRoutes.put('/profilePhoto/:id',validateId,verifyTokenForOnlyUser,updloadUserImage.single('image'),updateUserProfilePhoto);
userRoutes.get('/',getUsers);
userRoutes.get('/:id',getOneUser);
userRoutes.post('/mail',sendEmail);
userRoutes.post('/storeOTP',sendEmailVerif,storeOTPCode);
userRoutes.post('/matchOTP',CompareOTP);
userRoutes.post('/changePass',changePassword);

module.exports={userRoutes}