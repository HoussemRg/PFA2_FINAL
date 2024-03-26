import { Button, Label} from 'flowbite-react';
import { useParams,useNavigate } from 'react-router-dom';
import { useForm} from 'react-hook-form';
import { toast } from 'react-toastify';
import { UpdateUser } from '../apiCalls/userApiCall';
import {useSelector,useDispatch} from 'react-redux'
import getImageType from '../utils/getImageType';
import Profile from '../assets/profile.png'
import { authActions } from '../slices/authSlice';
import {updateProfilePhoto} from '../apiCalls/userApiCall'
import { FaEdit } from "react-icons/fa";

function UpdateForm() {
  const user = useSelector(state=>state.auth.user);
  const dispatch=useDispatch();
  const { id } = useParams();
  const { register, handleSubmit } = useForm({
    defaultValues:{
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || ''

    }
  });
  const { register: registerProfilePhoto, handleSubmit: handleSubmitProfilePhoto } = useForm();
  
  const updateUerProfilePhoto=(data)=>{
    
    if (data && data.image && data.image[0]) {
      const formData = new FormData();
      formData.append("image", data.image[0]);
      
      dispatch(updateProfilePhoto(user?._id, formData));
      user?.isAdmin ? navigate('/Admin') : navigate('/Dashboard');
  } else {
      toast.error("File data is missing");
  }
  }

  const navigate=useNavigate()
  
  const UpUser = async(NewUser)=>{
    try{
        const response = await UpdateUser(NewUser,id);
        
        if (response && response.data) {
            toast.success('User Updated successfully',{autoClose:1200});
            const newUser={
              ...user,
              firstName:response.data.firstName,
              lastName:response.data.lastName,
              email:response.data.email,
              password:response.data.password,
              phoneNumber:response.data.phoneNumber,
            }
            
            
            dispatch(authActions.login(newUser))
            user?.isAdmin ? navigate('/Admin') : navigate('/Dashboard');
        } else {
            toast.error('Failed to update user',{autoClose:1200});
        }
    } catch (error) {
        
        if (error.response && error.response.data) {
            toast.error(error.response.data); 
        } else {
            toast.error('An error occurred while updating user');
        }
    }
  }


  const onSubmit = (data) => {
        
    UpUser({newUser:data,token:user.token});
  };
  const userProfile = user || {}; 

  return (
    <div className='flex justify-center items-center mt-14'>
      <div className='w-1/4 mr-24 rounded-full flex items-center justify-center flex-col gap-8'>
        <img className=' w-72 h-72 rounded-full  ' src={user && user?.profilePhoto?.data ? getImageType(user.profilePhoto.data) : Profile}  alt="" />
        <form onSubmit={handleSubmitProfilePhoto(updateUerProfilePhoto)} className='flex flex-col items-center gap-2'>
          <div className='flex gap-2 items-center'>
            <label htmlFor="file" className='text-3xl text-blue-950'><FaEdit /></label>
            <input type="file" name='image' id='file' {...registerProfilePhoto("image")} />
          </div>
          
          <Button type="submit"  className=' mt-12 bg-yellow-600 transition hover:bg-yellow-800' >Edit profile photo</Button>
        </form>
      </div>
      <form className="flex max-w-md flex-col gap-4 for w-2/3" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="fname" value="First Name" />
          </div>
          <input id="fname"{...register('firstName')} name="firstName" className='border rounded border-blue-900 w-full px-4 py-2' placeholder={userProfile.firstName} />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="lname" value="Last Name" />
          </div>
          <input id="lname" name='lastName' {...register('lastName')}  className='border rounded border-blue-900 w-full px-4 py-2' placeholder={userProfile.lastName}  />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="phone" value="Phone Number" />
          </div>
          <input id="phone" name='phoneNumber'  {...register('phoneNumber')} className='border rounded border-blue-900 w-full px-4 py-2' placeholder={userProfile.phoneNumber} />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
          </div>
          <input id="email" name='email'  {...register('email')} className='border rounded border-blue-900 w-full px-4 py-2' placeholder={userProfile.email} />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Password" />
          </div>
          <input id="password" name='password' {...register('password')} className='border rounded border-blue-900 w-full px-4 py-2' type='password' />
        </div>
        <Button type="submit" className='bg-yellow-600 transition hover:bg-yellow-800'>Modify Account</Button>
      </form>
    </div>
  );
}

export default UpdateForm;