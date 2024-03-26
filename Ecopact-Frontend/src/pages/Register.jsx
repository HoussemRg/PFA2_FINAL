import Navbar from "../components/Navbar";
import { useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { registerUser } from "../apiCalls/authApiCall";
const Register = () => {
  
  const formShema = yup.object({
    firstName: yup.string().required('Enter your first name'),
    lastName: yup.string().required('Enter your last name'),
    phoneNumber: yup.string().required('Enter your phone number'),
    email: yup.string().email("Email format is not valid").required('Email is required'),
    password: yup.string().required('Password is required')
    .min(6, "Password length should be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
  });
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(formShema)
  });
  const onSubmit = (data)=>{
    
    const formData= new FormData();
    if(data.profilePhoto.length!=0){
      formData.append('firstName',data.firstName)
      formData.append('lastName',data.lastName)
      formData.append('email',data.email)
      formData.append('password',data.password)
      formData.append('phoneNumber',data.phoneNumber)
      formData.append('image',data.profilePhoto[0])
      
    }else{
      formData.append('firstName',data.firstName)
      formData.append('lastName',data.lastName)
      formData.append('email',data.email)
      formData.append('password',data.password)
      formData.append('phoneNumber',data.phoneNumber)
      
    }
    
    registerUser(formData); 
    
  };
  
  return (
    <div>
      <Navbar />
      <section className="gl h-screen">
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-row items-center justify-center">
                  <p className="mb-0 mr-4 text-lg font-semibold text-center">Sign Up</p>
                </div>

                <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-blue-950 after:mt-0.5 after:flex-1 after:border-t after:border-blue-950">
                  
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[1.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput2"
                    placeholder="First name"
                    name="fname"
                    {...register('firstName', {required: true})}
                    
                  />
                  <label
                    className="pointer-events-none absolute left-3 bottom-4 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                    First Name
                  </label>
                  <p className="text-red-600 text-xs">{errors.fname?.message}</p>
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[1.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput2"
                    placeholder="Last name"
                    name="lname"
                    {...register('lastName', {required: true})}
                  />
                  <label
                    className="pointer-events-none absolute left-3 bottom-4 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                    Last Name
                  </label>
                  <p className="text-red-600 text-xs">{errors.lname?.message}</p>
                </div>

                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[1.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
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
                    type="text"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[1.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput2"
                    placeholder="Phone num"
                    name="phone"
                    {...register('phoneNumber', {required: true})}
                  />
                  <label
                    className="pointer-events-none absolute left-3 bottom-4 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                    Phone number
                  </label>
                  <p className="text-red-600 text-xs">{errors.phone?.message}</p>
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="password"
                    className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[1.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput22"
                    placeholder="Password"
                    name="password"
                    {...register('password', {required: true})}
                  />
                  <label
                    className="pointer-events-none absolute left-3 top-1 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                    Password
                  </label>
                  <p className="text-red-600 text-xs">{errors.password?.message}</p>
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                  <input
                    type="file"
                    className="peer img block min-h-[auto] w-full rounded border-0 bg-transparent px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput22"
                    name="profilePhoto"
                    {...register('profilePhoto')}

                  />
                  <label
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                  
                  </label>
                  
                </div>
                <div className="text-center lg:text-left flex flex-col ">
                  <button className="border rounded px-5 py-2 hover:bg-yellow-400 hover:text-white transition">Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

}

export default Register