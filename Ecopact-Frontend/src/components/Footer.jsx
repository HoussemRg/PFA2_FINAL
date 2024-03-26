import { FaFacebookF } from "react-icons/fa";
import { TiSocialLinkedin } from "react-icons/ti";
import { IoLogoTwitter } from "react-icons/io5";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";
import { FaPhoneVolume } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
const Footer = () => {
    const user = useSelector(state=>state.auth.user);
  return (
    <footer>
        <div className='w-full cont px-10 py-16 bg-slate-800 '>
            <div className='box flex flex-col gap-6 w-full'>
                <h1 className='text-4xl font-bold text-white cursor-pointer'>ECOPACT</h1>
                <div className='flex gap-4'>
                    <a className='social hover:text-blue-600 transition'><FaFacebookF/></a>
                    <a className='social hover:text-blue-700 transition'><IoLogoTwitter/></a>
                    <a className='social hover:text-blue-400 transition'><TiSocialLinkedin/></a>
                </div>
                <div className='text-white'>
                Ecopact provides several solutions for water resource monitoring.</div>
            </div>
            <ul className='box flex flex-col gap-5 max-sm:flex max-sm:flex-wrap'>
                <div className='flex gap-2 items-center hover:translate-x-3 cursor-pointer transition '>
                    <FaAngleDoubleRight className='text-yellow-600 text-xl'/>
                    <Link to="/"><li className='text-white text-sm border-b w-32'>Home</li></Link>
                </div>
                { !user && <div className='flex gap-2 items-center hover:translate-x-3 cursor-pointer transition'>
                   <FaAngleDoubleRight className='text-yellow-600 text-xl'/>
                   <Link to="/Register"><li className='text-white text-sm border-b w-32'>Register</li></Link>
                </div>}
                {!user && <div className='flex gap-2 items-center hover:translate-x-3 cursor-pointer transition'>
                   <FaAngleDoubleRight className='text-yellow-600 text-xl'/>  
                   <Link to="/Login"><li className='text-white text-sm border-b w-32'>Login</li></Link>
                </div>}
                <div className='flex gap-2 items-center hover:translate-x-3 cursor-pointer transition'>
                   <FaAngleDoubleRight className='text-yellow-600 text-xl'/> 
                   <Link to="/Contact"><li className='text-white text-sm border-b w-32'>Contact</li></Link>
                </div>
            </ul>
            <div className='box flex flex-col gap-6'>
                <div className='flex gap-2 items-center'>
                    <FaMapMarkerAlt className='text-yellow-600 text-2xl'/>
                    <h3 className='text-white'>Tunis,Cité Essalem, Street 7051</h3>
                </div>
                <div className='flex gap-2 items-center '>
                    <IoTimeSharp className='text-yellow-600 text-2xl'/>
                    <h3 className='text-white'>Business Hours: 24/24</h3>
                </div>
                <div className='flex gap-2 items-center'>
                    <FaPhoneVolume className='text-yellow-600 text-2xl'/>
                    <h3 className='text-white'>+216 71 233 600</h3>
                </div>
            </div>
            <div className='grid grid-cols-4 my-auto'>
                <img className='w-20 im' src='../assets/images.jpeg'/>
                <img className='w-20 im' src='../assets/man-is-standing-front-computer-screen-that-says-data-analytics-it_894855-2456.avif'/>
                <img className='w-20 im' src='../assets/flat-illustration-data-analysis_579677-870.avif'/>
                <img className='w-20 im' src='../assets/statistics-data-analysis-financial-administration-circular-diagram-with-colorful-segments-business-pie-chart-statistics-audit-consulting_335657-764.avif'/>
            </div>
        </div>
        <div className='bg-red w-full h-20 bg-slate-900 text-white flex justify-center items-center max-sm:text-sm'>Copyright 2024 © all rights reserved-<p className='font-bold'> ECOPACT</p></div>
    </footer>
  )
}

export default Footer
