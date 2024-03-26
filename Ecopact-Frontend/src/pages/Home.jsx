import Aos from 'aos';
import 'aos/dist/aos.css'
import { FaAnglesDown } from "react-icons/fa6";
import { MdOutlineMonitorHeart } from "react-icons/md";
import { RiComputerLine } from "react-icons/ri";
import { CgPerformance } from "react-icons/cg";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect } from 'react';
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
const Home = () => {
  const user = useSelector(state=>state.auth.user);
  useEffect(() =>{
    Aos.init({duration: 500});
  },[])
  return (
    <div>
      <div className='first relative'>
      <Navbar/>
      <section className='flex px-10 mt-2 py-8 items-center justify-center'>
        <div className='w-1/2 max-lg:text-center max-lg:min-w-full'>
          <h1 className='text-5xl font-bold pb-5 text-blue-950 max-sm:text-xl max-md:text-4xl'>AI-powered platform for water resource monitoring in Tunisia</h1>
          <p className='pb-5 text-xl max-md:text-sm max-sm:text-xs'>Leveraging advanced technologies and sophisticated analyses, this platform offers an efficient tool for monitoring and predicting water pollution, contributing to the protection and preservation of this essential resource</p>
          {user ? user?.isAdmin ? <Link to='/AdminDashboard' className='border transition-all cursor-pointer text-blue-900 hover:bg-yellow-500 bg-yellow-400 py-2 px-4 '>Get Started</Link> :   <Link to='/Dashboard' className='border cursor-pointer text-blue-900 transition-all hover:bg-yellow-500 bg-yellow-400 py-2 px-4 '>Get Started</Link> : <Link to='/Login' className='border cursor-pointer text-blue-900 transition-all hover:bg-yellow-500 bg-yellow-400 py-2 px-4 '>Get Started</Link>}
        </div>
        <div className='w-1/2 max-lg:hidden max-lg:mx-0 max-lg:my-auto'> 
          <img className='w-full float-right animate-float' src="../assets/guide-dap.png" alt="" />
        </div>
      </section>
      </div>
      <div className='w-full flex justify-center my-10 cursor-pointer animate-float'>
          <a href='#main-feat'>
          <FaAnglesDown className='text-3xl font-bold text-yellow-400'/>
          </a>
      </div>
      <section className='px-10 mt-2 py-8' id='main-feat'>
        <div className='flex flex-col items-center pb-5'>
          <h2 className='text-3xl max-sm:text-lg font-bold pb-3 text-center text-blue-950'>Main Features</h2>
          <p className='text-center w-4/5 max-sm:text-xs'>Ecopact provides several solutions for water resource monitoring</p>
          <p className='text-center w-4/5 max-sm:text-xs'>Explore prediction tools to anticipate future pollution variations</p>
          <p className='text-center w-4/5 max-sm:text-xs'>Make informed decisions by visualizing data and anticipating pollution trends</p>
        </div>
        <div className='grid grid-cols-3 gap-3 pt-4  max-sm:flex max-sm:flex-wrap'>
          <div className='text-center flex flex-col feat items-center gap-3 ' data-aos="fade-right">
            <MdOutlineMonitorHeart className='text-6xl text-yellow-400 max-sm:text-4xl'/>
            <h3 className='text-lg max-sm:text-sm font-semibold text-blue-950'>Real-time Analysis</h3>
            <ul>
              <li className='text-sm max-sm:text-xs w-11/12'>Constantly analyzes water quality data in real-time</li>
              <li className='text-sm max-sm:text-xs w-11/12'>Provides instant updates and alerts for changes in water pollution levels</li>
            </ul>
          </div>
          <div className=' text-center flex flex-col feat items-center gap-3 ' data-aos="fade-up">
            <RiComputerLine className='text-6xl text-yellow-400 max-sm:text-4xl'/>
            <h3 className='text-lg font-semibold max-sm:text-sm text-blue-950'>Intuitive Interface</h3>
            <ul>
              <li className='text-sm max-sm:text-xs w-11/12'>User-friendly platform for exploring water quality data</li>
              <li className='text-sm max-sm:text-xs w-11/12'>Easy interaction through an ergonomic interface for data interpretation</li>
            </ul>
          </div>
          
          <div className=' text-center flex flex-col feat items-center gap-3 'data-aos="fade-left">
            <CgPerformance className='text-6xl text-yellow-400 max-sm:text-4xl'/>
            <h3 className='text-lg max-sm:text-sm font-semibold text-blue-950'>Accuracy and Reliability</h3>
            <ul>
              <li className='text-sm max-sm:text-xs w-11/12'>Precisely forecasts water pollution trends</li>
              <li className='text-sm max-sm:text-xs w-11/12'>Offers reliable monitoring for accurate pollution prediction</li>
            </ul>
          </div>   
        </div>
      </section>
      <Footer/>
    </div>
  )
}

export default Home