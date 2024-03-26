import { Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { getAllUsers } from '../../apiCalls/userApiCall';
import {Link} from 'react-router-dom'
import Profile from '../../assets/profile.png'
import TopBarAdminDashboard from '../../components/TopBarAdminDashboard';
import getImageType from '../../utils/getImageType';
//import getImageType from '../../utils/getImageType';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await getAllUsers();
          setUsers(response.data.users);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      };
  
      fetchUsers();
  }, []);
  
  
  return (
    <div className="flex flex-col gap-9">
      <div className="top w-full h-[50px] bg-blue-950">
        <TopBarAdminDashboard />
      </div>
      
      <div className='text-blue-900 font-bold text-2xl w-full flex justify-center items-center '><p className='mx-auto'>Admin Dashboard</p></div>
      <div className="overflow-x-auto w-5/6 mx-auto border border-gray-300">
        <Table hoverable className=''>
          <Table.Head className='text-blue-900 text-center border '>
            <Table.HeadCell>#id</Table.HeadCell>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>
              <span className="">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y border text-center">
            {users.map((user,index) => (
              <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index+1}
                </Table.Cell>
                <Table.Cell>
                  <div className='flex items-center gap-4 justify-center'>
                     <img src={user && user?.profilePhoto?.data ? getImageType(user.profilePhoto.data) : Profile} alt="photo" className='h-8 w-8 rounded-full' />
                    
                    <div>{user.firstName+' '+user.lastName}</div>
                  </div>
                </Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>
                  <div className='flex justify-around '>
                    <p className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                      <Link to={`/users/details/${user._id}`}>
                      View
                      </Link>
                    </p>
                    
                    <p className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    <Link to={`/users/delete/${user._id}`}>
                      Delete
                    </Link>
                    </p>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default AdminDashboard;