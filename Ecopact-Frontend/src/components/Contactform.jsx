import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { useForm } from 'react-hook-form';
import { SendEmail } from "../apiCalls/userApiCall";
import { toast } from "react-toastify";
import { IoLinkSharp } from "react-icons/io5";

const Contactform = () => {
  const SendM = async(data) =>{
    const res = await SendEmail(data);
    if(res.data){
      toast.success("Email sent successfully",{autoClose:1200});
    }else{
      toast.error("Error while sending email",{autoClose:1200});
      
    }
  }
  const { register, handleSubmit } = useForm();
  const onSubmit = (data, event) => {
    event.preventDefault();
    SendM(data);
  };


  return (
    <div className="flex justify-center items-center">
      <div>
        <div className="text-center mb-5 mt-4">
          <h3 className="text-blue-950 text-xl">Contact us</h3>
          <h2 className="text-2xl font-semibold text-yellow-400">Get In Touch</h2>
        </div>
        <div className="flex max-lg:flex-col">
          <div className="flex flex-col justify-center max-lg:w-full gap-8 w-1/3 px-9">
            <div className="flex items-center gap-2">
                <div className="border p-3 text-xl rounded-full">
                   <FaPhone />
                </div>
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p>+216 71 233 600</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="border p-3 text-xl rounded-full">
                <IoLinkSharp />
              </div>
              <div>
                <h3 className="font-semibold">Website</h3>
                <p>https://anpe.nat.tn</p>
              </div>
            </div>
            <div className="flex items-center gap-2 ">
              <div className="border p-3 text-xl rounded-full">
                <MdEmail />
              </div>
              <div>
                <h3 className="font-semibold">Address</h3>
                <p>Tunisia</p>
              </div>
            </div>
            <div></div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-2/3 max-lg:w-full">
            <div className="w-full flex">
              <input type="text" name="firstName" placeholder="First Name..." {...register('firstName', {required: true})} className="outline-none w-1/2 border focus:border-yellow-400 border-slate-400 transition p-3 m-1"/>
              <input type="text" name="lastName"  placeholder="Last Name..." {...register('lastName', {required: true})} className="outline-none border w-1/2 focus:border-yellow-400 border-slate-400 transition p-3  m-1"/>
            </div>
            <div className="w-full flex">
              <input type="text" name="subject" placeholder="Subject..." {...register('subject', {required: true})} className="outline-none w-1/2 border focus:border-yellow-400 border-slate-400 transition p-3 m-1"/>
              <input type="text" name="email" placeholder="Email..." {...register('email', {required: true})} className="outline-none border w-1/2 focus:border-yellow-400 border-slate-400 transition p-3 m-1"/>
            </div>
            <textarea name="text" {...register('text', {required: true})} id="" cols="30" rows="10"  className="outline-none border-slate-400 focus:border-yellow-400 transition border p-3 m-1 "></textarea>
            <button type="submit" className="bg-yellow-400 transition py-1 hover:bg-yellow-600">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contactform;