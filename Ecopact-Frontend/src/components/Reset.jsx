import React from "react";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { sendOTPCode } from "../apiCalls/userApiCall";
import { changePassword } from "../apiCalls/userApiCall";
import { toast } from "react-toastify";
import { ResetActions } from "../slices/resetPasswordSlice";

export default function Reset() {
  const triggerOTP = useSelector(state => state.OTP.OTPCode);
  const triggerReset = useSelector(state=>state.OTP.Reset);
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    password: yup.string().required('Password is required').min(6, "Password length should be at least 6 characters"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').min(6, "Password length should be at least 6 characters")
      .required('Confirm Password is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    const { password } = data;
    const otpCode = triggerOTP.otpCode;
    const changeInfos = {otpCode: otpCode, password: password};
    const res = await changePassword(changeInfos);
    if(res){
      toast.success("Password updated successfully");
      dispatch(ResetActions.inactive());
    }
  };

  return (
    <div>
      <div className="reset flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-blue-900 text-xl font-bold leading-tight tracking-tight md:text-2xl ">
            Change Password
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
            <div>
              <label htmlFor="password" className="text-blue-900 block mb-2 text-sm font-medium ">
                New Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                {...register('password')}
              ></input>
              <p className="text-red-600 text-xs italic">{errors.password?.message}</p>
            </div>
            <div>
              <label htmlFor="confirm-password" className="text-blue-900 block mb-2 text-sm font-medium ">
                Confirm password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirm-password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                {...register('confirmPassword')}
              ></input>
              <p className="text-red-600 text-xs italic">{errors.confirmPassword?.message}</p>
            </div>
            <button
              type="submit"
              className="w-full text-blue-900 bg-yellow-400 hover:bg-primary-700 border rounded focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Reset password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
