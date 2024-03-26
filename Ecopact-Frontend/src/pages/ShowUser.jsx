import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOneUser } from '../apiCalls/userApiCall';
import Navbar from '../components/Navbar';
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import './ShowUser.css';
import Profile from '../assets/profile.png'
import {useSelector} from 'react-redux'
import getImageType from '../utils/getImageType';
const ShowUser = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const userAuthenticated = useSelector(state=>state.auth.user);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getOneUser(id);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
      
    };

    fetchUser();
  }, [id]); 

const navigate = useNavigate();
const navigateToEditPage = ()=>{
  navigate(`/users/edit/${user.user._id}`)
}
const navigateToDeletePage = ()=>{
  navigate(`/users/delete/${user.user._id}`)
}
  return (
    <div>
      <Navbar />
      <div className="container bootdey">
        <div className="row">
          <div className="profile-nav col-md-3">
            <div className="panel">
              <div className="user-heading round">
                <a href="#">
                  <img src={user?.user && user?.user?.profilePhoto?.data ? getImageType(user.user.profilePhoto.data) : Profile} alt="Profile Photo" />
                </a>
                {user.user && (
                  <>
                    <h1 className="font-bold">{user.user.firstName}</h1>
                    <p className="font-bold">{user.user.email}</p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className='flex gap-2'>
            <div className='border bg-white w-1/2 mt-2'>
              <h2 className='text-2xl font-bold m-4'>Bio Graph</h2>
              <div className='flex gap-12 items-center m-6 '>
                {user.user && (
                  <div className='flex flex-col gap-3'>
                    <h2><span className='font-semibold'>First Name</span> : {user.user.firstName}</h2>
                    <h2><span className='font-semibold'>Last Name</span> : {user.user.lastName}</h2>
                    <h2><span className='font-semibold'>Email</span>: {user.user.email}</h2>
                  </div>
                )}
                {user.user && (
                  <div className='flex flex-col gap-3'>
                    <h2><span className='font-semibold'>Phone</span> : {user.user.phoneNumber}</h2>
                    {user.user.isAdmin !== undefined && (
                      <h2><span className='font-semibold'>Admin Privilege</span> : {user.user.isAdmin.toString()}</h2>
                    )}
                    {user.user.isAccountVerified !== undefined && (
                      <h2><span className='font-semibold'>Account Verification</span>: {user.user.isAccountVerified.toString()}</h2>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className='bg-white mt-2 w-1/2 border'>
            {user.user && <p className='m-4'><span className='font-semibold'>Joined on</span> {user.user.createdAt}</p>}
              <div className='flex justify-center gap-3'>
                { id===userAuthenticated._id && <button className='flex items-center hover:bg-blue-900 hover:text-white hover:border-white transition gap-2 border rounded border-blue-900 px-4 py-2 text-blue-900' onClick={navigateToEditPage}><span><FaEdit /></span>Edit</button>}
                <button className='flex items-center hover:bg-red-600 hover:text-white hover:border-white transition gap-2 border rounded border-red-600 px-4 py-2 text-red-600' onClick={navigateToDeletePage}><span><FaTrash /></span>Delete Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowUser;