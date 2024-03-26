import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../slices/authSlice";
import { dataActions } from '../slices/dataSlice';
import LOGO from '../assets/LOGO.png'
const Navbar = () => {
  const user = useSelector(state=>state.auth.user);
  const dispatch = useDispatch();
  const nullifyUser = ()=>{
    dispatch(dataActions.getNH4AverageRates(0))
    dispatch(dataActions.getPxOyAverageRates(0))
    dispatch(dataActions.getNO3AverageRates(0))
    dispatch(dataActions.getNH4PerDate(null))
    dispatch(dataActions.getPxOyPerDate(null))
    dispatch(dataActions.getNO3PerDate(null))
    dispatch(dataActions.getNH4PerMonth([]))
    dispatch(dataActions.getPxOyPerMonth([]))
    dispatch(dataActions.getNO3PerMonth([]))
    dispatch(dataActions.getNH4PerYear([]))
    dispatch(dataActions.getPxOyPerYear([]))
    dispatch(dataActions.getNO3PerYear([]))
    dispatch(dataActions.setRecentNH4Year(null))
    dispatch(dataActions.setRecentPxOyYear(null))
    dispatch(dataActions.setRecentNO3Year(null))
    dispatch(dataActions.getNH4RecentData([]))
    dispatch(dataActions.getPxOyRecentData([]))
    dispatch(dataActions.getNO3RecentData([]))
    dispatch(dataActions.getArrangements([]))
    dispatch(authActions.logout());
    localStorage.removeItem("user");
    
  }
  return (
    <nav className="max-sm:flex-col max-sm:gap-6 bg-white flex justify-between items-center px-9 py-5 h-20 ">
      <Link to='/' className="flex items-center  gap-3 text-2xl px-3 cursor-pointer">
        <img src={LOGO} alt="logo" className="rounded-md h-16 w-24" />
      </Link>
      
      <ul
        className={`flex gap-5 text-blue-950 px-10`}
      >
        <li
          className={`font-semibold cursor-pointer max-lg:pb-3 max-lg:hover:border-b border-yellow-400 hover:text-yellow-400 transition-all active:text-yellow-400`}
        >
          <Link to="/">Home</Link>
        </li>
        {!user && <li
          className={`font-semibold cursor-pointer max-lg:pb-3 max-lg:hover:border-b border-yellow-400 hover:text-yellow-400 transition-all active:text-yellow-400`}
        >
          <Link to="/Register">Register</Link>
          
        </li>}
        {!user && <li 
          className={`font-semibold cursor-pointer max-lg:pb-3 max-lg:hover:border-b border-yellow-400 hover:text-yellow-400 transition-all active:text-yellow-400`}
        >
          <Link to="/Login">Login</Link>
          
        </li>}
        { user && !user?.isAdmin && <li
          className={`font-semibold cursor-pointer max-lg:pb-3 max-lg:hover:border-b border-yellow-400 hover:text-yellow-400 transition-all active:text-yellow-400`}
        >
          <Link to="/Dashboard">Dashboard</Link>
          
        </li>}
        { user && user?.isAdmin && <li
          className={`font-semibold cursor-pointer max-lg:pb-3 max-lg:hover:border-b border-yellow-400 hover:text-yellow-400 transition-all active:text-yellow-400`}
        >
          <Link to="/Admin">Admin Dashboard</Link>
          
        </li>}
        { user && <li
          className={`font-semibold cursor-pointer max-lg:pb-3 max-lg:hover:border-b border-yellow-400 hover:text-yellow-400 transition-all active:text-yellow-400`}
        onClick={nullifyUser}>
          Logout
          
        </li>}
        { !user?.isAdmin && <li
          className={`font-semibold cursor-pointer max-lg:pb-3 max-lg:hover:border-b border-yellow-400 hover:text-yellow-400 transition-all active:text-yellow-400`}
        >
          <Link to="/Contact">Contact</Link>
        </li>}
      </ul>
    </nav>
  );
}

export default Navbar;