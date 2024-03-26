import Navbar from "../components/Navbar";
import { useForm} from 'react-hook-form';
import { Link,  } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import {useDispatch,useSelector} from 'react-redux'
import { loginUser } from "../apiCalls/authApiCall";
import { useState } from "react";
import OTP from "../components/OTP";
import { RxCross2 } from "react-icons/rx";
import TypeEmailWindow from "../components/TypeEmailWindow";
import { popupActions } from "../slices/popupSlice";
import { OTPActions } from "../slices/OTPSlice";
import { ResetActions } from "../slices/resetPasswordSlice";
import Reset from "../components/Reset";


const Login = () => {

  const trigger = useSelector(state=> state.popup.trigger);
  const triggerOTP = useSelector(state=> state.OTP.triggerOTP);
  const triggerReset = useSelector(state=> state.Reset.triggerReset);
  const dispatch = useDispatch();

  const ForgotPass = () =>{
    dispatch(popupActions.active());
  }

  const formShema = yup.object({
    email: yup.string().email("Email format is not valid").required('Email is required'),
    password: yup.string().required('Password is required')
    .min(6, "Password length should be at least 6 characters")
  });
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(formShema)
  });
  const printData = (data) =>{
      dispatch(loginUser({email:data.email,password:data.password}));
      
  };
  return (
    <div className="relative">
      {trigger && (
        <div className="absolute inset-0 z-10 bg-slate-400 opacity-50"></div>
      )}
      <TypeEmailWindow/>
      {triggerOTP && (
        <div className="absolute inset-0 z-10 bg-slate-400 opacity-50"></div>
      )}
      {triggerOTP && <OTP/>}
      {triggerReset && (
        <div className="absolute inset-0 z-10 bg-slate-400 opacity-50"></div>
      )}
      {triggerReset && <Reset/>}
      <Navbar />
      <section className="gl h-screen relative">
        <div className="h-full">
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
              <img
                src="../assets/Statistics-cuate.svg"
                className="w-full"
                alt="Sample image"
              />
            </div>

            <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
              <form onSubmit={handleSubmit(printData)}>
                <div className="flex flex-row items-center justify-center">
                  <p className="mb-0 mr-4 text-lg font-semibold text-center">Sign in </p>
                </div>

                <div className="my-7 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-blue-950 after:mt-0.5 after:flex-1 after:border-t after:border-blue-950">
                  
                </div>

                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput2"
                    placeholder="Email address"
                    name="email"
                    {...register('email', {required: true})}
                  />
                  <label
                    className="pointer-events-none absolute left-3 bottom-4 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                    Email address
                  </label>
                  <p className="text-red-600 text-xs">{errors.email?.message}</p>
                </div>

                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="password"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput22"
                    placeholder="Password"
                    name="password"
                    {...register('password', {required: true})}
                  />
                  <label
                    className="pointer-events-none absolute left-3 bottom-4 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                    Password
                  </label>
                  <p className="text-red-600 text-xs">{errors.password?.message}</p>
                </div>
                <div className="mb-6 flex items-center justify-between">
                  <a href="#!" className="text-blue-950" onClick={ForgotPass}>Forgot password?</a>
                </div>

                <div className="text-center lg:text-left flex flex-col ">
                  <input type="submit" value="Login" className="border rounded px-5 py-2 hover:bg-yellow-400 hover:text-white transition" />
                  <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                    Don't have an account? 

                    <Link to="/Register" className="text-red-500 transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700">
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Login;
