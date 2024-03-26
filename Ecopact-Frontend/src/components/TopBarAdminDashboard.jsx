import { AiFillHome } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { CgLogOut } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../slices/authSlice';
import MenuListComposition from './Boxes/MenuListComposition';
import getImageType from "../utils/getImageType";
import Profile from '../assets/profile.png'


const TopBarAdminDashboard = () => {
    const user = useSelector(state=>state.auth.user);
    const dispatch=useDispatch();
    const nullifyUser = ()=>{
      dispatch(authActions.logout());
      localStorage.removeItem("user");
    }
    
  return (
    <div className='flex justify-end items-center pr-12 h-full text-gray-300 '>
      
      
      <div className='flex justify-around items-center h-full gap-12'>
        <div className={`text-xl h-full flex items-center px-3 hover:bg-blue-800 transition-all  cursor-pointer `}>
            <Link to="/">
              <AiFillHome />
            </Link>
        </div>
        <div
            className={`text-2xl h-full flex items-center px-3 hover:bg-blue-800 transition-all  cursor-pointer `}
            onClick={nullifyUser}
          >
            <Link to="/">
              <CgLogOut />
            </Link>
          </div>
          <div className={`text-xl h-full flex items-center px-1 hover:bg-blue-800 transition-all  cursor-pointer `} >
            <MenuListComposition />
          </div>
       
          
        <div className='flex justify-around items-center gap-3'>
            <img src={user && user?.profilePhoto?.data ? getImageType(user.profilePhoto.data) : Profile} alt="Profile Photo" className={` w-9  my-2 h-9 rounded-full`} />
            {user&&<Link to={`/users/details/${user._id}`} className='font-semibold '>{user?.firstName} {user?.lastName}</Link>}
        </div>
      </div>
    </div>
  )
}

export default TopBarAdminDashboard