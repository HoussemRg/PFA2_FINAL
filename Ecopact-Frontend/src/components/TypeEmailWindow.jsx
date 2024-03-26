import React from 'react';
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { popupActions } from '../slices/popupSlice';
import { useForm} from 'react-hook-form';
import { SendVerifEmail } from '../apiCalls/userApiCall';
import { OTPActions } from '../slices/OTPSlice';

const TypeEmailWindow = () => {

  const trigger = useSelector(state=> state.popup.trigger);
  const triggerOTP = useSelector(state=> state.OTP.triggerOTP);
  const dispatch = useDispatch();

  const cancelOp = () =>{
    dispatch(popupActions.inactive())    
    };
    const { register, handleSubmit } = useForm();  
    const onSubmit = (data)=>{
        SendVerifEmail(data);
        dispatch(popupActions.inactive());
        dispatch(OTPActions.active());
    }
  return (trigger) ? (

    <div style={{ width: '500px', height: '250px' }}  className='bg-white popUp z-10 absolute mx-auto my-auto border rounded'>
      <form onSubmit={handleSubmit(onSubmit)} className='translate-y-4'>
        <div className='flex flex-col gap-4 '>
          <div className='flex justify-between'>
          <label
            htmlFor="email"
            className="font-semibold mt-5 text-lg ml-6 text-blue-900"
          >
            Write your Email :
          </label>
          <div onClick={cancelOp} className='text-xl font-semibold mr-5 bg-red-600 text-white p-1 cursor-pointer h-1/2'>
          <RxCross2/>
          </div>
          </div>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Your Email..."
            className='mx-6 my-2 p-3 border rounded focus:none'
            {...register('email', {required: true})}
          ></input>
        </div>
        <button
          className=" border p-3 mx-auto translate-x-40 bg-yellow-400 rounded mt-3"
        >
          Send Verification code
        </button>
      </form>
    </div>
  ) : "";
};

export default TypeEmailWindow;
