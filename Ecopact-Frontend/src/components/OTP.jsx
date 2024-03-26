import React from "react";
import { sendOTPCode } from "../apiCalls/userApiCall";
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from "react-redux";
import { ResetActions } from "../slices/resetPasswordSlice";
import { OTPActions } from "../slices/OTPSlice";

function OTP() {
  const triggerReset = useSelector(state => state.Reset.triggerReset);
  const triggerOTP = useSelector(state => state.OTP.triggerOTP);
  const dispatch = useDispatch();

  const triggerPasswdWindow = () => {
    dispatch(ResetActions.active());
    dispatch(OTPActions.inactive());
  };

  const { register, handleSubmit } = useForm();
  
  const sendOTP = async (data) => {
    let otpCode = "";
    Object.values(data).forEach((digit) => {
      otpCode += digit;
    });
    const otpObject = { otpCode: otpCode };
    
    const res = await sendOTPCode(otpObject);
    if (res) {
      dispatch(OTPActions.value(otpObject)); 
      triggerPasswdWindow();
    }
  };

  return (
    <div className="otp bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
      <div className="mx-auto flex w-full max-w-md flex-col space-y-16">

        <div className="font-semibold text-3xl">
          <p>Email Verification</p>
        </div>
        <div className="flex flex-row text-sm font-medium text-gray-400">
          <p>We have sent a code to your email</p>
        </div>

        <div>
          <form onSubmit={handleSubmit(sendOTP)}>
            <div className="flex flex-col space-y-16">
              <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                <div className="w-16 h-16 ">
                  <input
                    maxLength="1"
                    className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                    type="text"
                    name="digit1"
                    {...register('digit1', { required: true })}
                  ></input>
                </div>
                <div className="w-16 h-16 ">
                  <input
                    maxLength="1"
                    className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                    type="text"
                    name="digit2"
                    {...register('digit2', { required: true })}
                  ></input>
                </div>
                <div className="w-16 h-16 ">
                  <input
                    maxLength="1"
                    className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                    type="text"
                    name="digit3"
                    {...register('digit3', { required: true })}
                  ></input>
                </div>
                <div className="w-16 h-16 ">
                  <input
                    maxLength="1"
                    className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                    type="text"
                    name="digit4"
                    {...register('digit4', { required: true })}
                  ></input>
                </div>
              </div>

              <div className="flex flex-col space-y-5">
                <div>
                  <button
                    type="submit" className="flex flex-row cursor-pointer items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-yellow-400 border-none text-white text-sm shadow-sm"
                  >
                    Verify Account
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OTP;
