import { toast } from 'react-toastify';
import request from './request';
import {useDispatch} from 'react-redux'
import { authActions } from '../slices/authSlice';

const getAllUsers=async()=>{
    try{
        const res = await request.get('/api/user');
        return res;
    }catch(err){
        console.log(err);
    }
}
const getOneUser=async(id)=>{
    try{
        const res = await request.get(`/api/user/${id}`);
        return res;
    }catch(err){
        console.log(err);
    }
}
const DelUser = async (id, user) => {
    try {
        const res = await request.delete(`/api/user/${id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        return res; 
    } catch (err) {
        console.log(err);
    }
};

const UpdateUser = async (updated, id) => {
    try {
        const res = await request.put(`/api/user/${id}`, updated.newUser, {
            headers: {
                'Authorization': `Bearer ${updated.token}`
            }
        });
        let user= JSON.parse(localStorage.getItem("user"));
        user.firstName=res.data.firstName;
        user.lastName=res.data.lastName;
        user.email=res.data.email;
        user.phoneNumber=res.data.phoneNumber;
        localStorage.setItem("user",JSON.stringify(user))
        return res;
    } catch (err) {
        throw err; 
    }
};

const updateProfilePhoto=(id,file)=>{
    return async (dispatch,getState)=>{
        try{
            const res = await request.put(`/api/user/profilePhoto/${id}`, file, {
                headers: {
                  Authorization: "Bearer " + getState().auth.user.token,
                  'Content-Type': "multipart/form-data"
                }
            }
        )
            dispatch(authActions.login(res.data))
            let user= JSON.parse(localStorage.getItem("user"));
            user.profilePhoto=res.data.profilePhoto;
            localStorage.setItem("user",JSON.stringify(user))
            toast.success("profile photo updated successfully",{autoClose:1200})
        }catch(err){
            toast.error(err.response.data,{autoClose:1200})
        }
    }
}

const SendEmail = async(data) => {
    try {
        const res = await request.post('/api/user/mail',data);
        return res;
    } catch (err) {
        throw err;
    }
};

const SendVerifEmail = async(data) => {
    try {
        const res = await request.post('/api/user/storeOTP',data);
        if(res){
            toast.success("Verification code sent",{autoClose:1200});
        }else{
            toast.error("Error while sending code",{autoClose:1200});
        }
    } catch (err) {
        throw err;
    }
};
const sendOTPCode = async(data) => {
    try {
        const res = await request.post('/api/user/matchOTP',data);
        return res;
        
    } catch (err) {
        toast.error("OTP code does not match",{autoClose:1200});
        throw err;
    
    }
};
const changePassword = async(data) => {
    try {
        const res = await request.post('/api/user/changePass',data);
        return res;
        
    } catch (err) {
        toast.error("Error while changing password",{autoClose:1200});
        throw err;
    
    }
};

export {getAllUsers,getOneUser,DelUser,UpdateUser,updateProfilePhoto,SendEmail,SendVerifEmail,sendOTPCode,changePassword};