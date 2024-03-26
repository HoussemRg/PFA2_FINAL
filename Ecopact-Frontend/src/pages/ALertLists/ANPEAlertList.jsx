import TopBarAdminDashboard from '../../components/TopBarAdminDashboard';
import { Table } from 'flowbite-react';
import { useEffect } from 'react';
import {Link} from 'react-router-dom'
import Profile from '../../assets/profile.png'
import {useSelector,useDispatch} from 'react-redux'
import { getANPEReportList, getAllReportList, sendAlert } from '../../apiCalls/alertsApiCall';
import { FaCheck } from "react-icons/fa";
import getImageType from '../../utils/getImageType';


const ANPEAlertList = () => {
    const dispatch=useDispatch();
    const {alertList}=useSelector(state=> state.alerts);
    const sendAlertToClient=(id)=>{
        dispatch(sendAlert(id));
        dispatch(getANPEReportList());
        dispatch(getAllReportList());
    }
    useEffect(()=>{
        dispatch(getAllReportList());
    },[]);
  return (
    <div className="flex flex-col gap-9">
      <div className="top w-full h-[50px] bg-blue-950">
        <TopBarAdminDashboard />
      </div>
      
      <div className='text-blue-900 font-bold text-2xl w-full flex justify-center items-center '><p className='mx-auto'>Alert List</p></div>
      <div className="overflow-x-auto w-5/6 mx-auto border border-gray-300">
        <Table hoverable className=''>
          <Table.Head className='text-blue-900 text-center border '>
            <Table.HeadCell>#id</Table.HeadCell>
            <Table.HeadCell>Client</Table.HeadCell>
            <Table.HeadCell>Report</Table.HeadCell>
            <Table.HeadCell>Created At</Table.HeadCell>
            <Table.HeadCell>
              <span className="">Send Alert</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y border text-center">
            {alertList.map((item,index) => (
              <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index+1}
                </Table.Cell>
                <Table.Cell>
                  
                  <Link to={`/users/details/${item.user._id}`}>
                  <div className='flex items-center gap-4 justify-center'>
                  <img className=' h-8 w-8 rounded-full' src={item.user && item.user?.profilePhoto?.data ? getImageType(item.user.profilePhoto.data) : Profile} alt="Profile Photo" />   
                    <div>{item.user.firstName+' '+item.user.lastName}</div>
                </div>
                 </Link>
                  
                </Table.Cell>
                <Table.Cell><Link to={`/alerts/report/${item._id}`}>{item.fileName}</Link> </Table.Cell>
                <Table.Cell>{new Date(item?.createdAt).toISOString().split('T')[0]}</Table.Cell>
                <Table.Cell>
                  <div className='flex items-center justify-center'>
                    {item.isChecked? <div className='  text-green-600 '><FaCheck /></div> : <div  className='bg-red-600 hover:bg-red-500 cursor-pointer rounded-md text-sm p-1 text-white' onClick={()=>sendAlertToClient(item._id)}>Send Alert</div>}
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

export default ANPEAlertList