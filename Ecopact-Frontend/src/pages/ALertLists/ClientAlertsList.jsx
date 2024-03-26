import TopBar from "../../components/TopBar"
import { Table } from 'flowbite-react';
import { useEffect } from 'react';
import {Link} from 'react-router-dom'
import ANPE from '../../assets/ANPE.png'
import { IoAlertCircle } from "react-icons/io5";

import {useSelector,useDispatch} from 'react-redux'
import { getClientReportList } from "../../apiCalls/alertsApiCall";
const ClientAlertsList = () => {
    const dispatch=useDispatch();
    const {clientReportsArray}=useSelector(state=> state.alerts);
    const {user}=useSelector(state=> state.auth)
    useEffect(()=>{
        dispatch(getClientReportList(user?._id));
    },[user?._id]);
  return (
    <div className="flex w-full">
        <div className="flex flex-col gap-8 w-full">
          <div className="top w-full h-[50px]">
            <TopBar/>
          </div>
          <div className=" w-11/12 h-full flex flex-col  gap-5 mx-auto mb-12 ">
            <div className='text-blue-900 font-bold text-2xl w-full flex justify-center items-center '><p className='mx-auto'>Alert List</p></div>
                <div className="overflow-x-auto w-5/6 mx-auto border border-gray-300">
                    <Table hoverable className=''>
                    <Table.Head className='text-blue-900 text-center border '>
                        <Table.HeadCell>#id</Table.HeadCell>
                        <Table.HeadCell>Sender</Table.HeadCell>
                        <Table.HeadCell>Report</Table.HeadCell>
                        <Table.HeadCell>Sent At</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y border text-center">
                        {clientReportsArray.map((item,index) => (
                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {index+1}
                            </Table.Cell>
                            <Table.Cell>
                                <div className='flex items-center gap-4 justify-center'>
                                    <img src={ANPE} alt="photo" className='h-8 w-8 rounded-full' />
                                    <div>ANPE</div>
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                    <Link to={`/alerts/client/report/${item._id}`}>
                                        <div className="flex justify-center items-center gap-3">
                                            <div>{item.fileName}</div>
                                            {!item.isViewed && <div className="text-red-500"><IoAlertCircle /></div>}
                                        </div>
                                    </Link> 
                            </Table.Cell>
                            <Table.Cell>{new Date(item?.updatedAt).toISOString().split('T')[0]}</Table.Cell>
                        </Table.Row>
                        ))}
                    </Table.Body>
                    </Table>
                </div>
            
            </div>
        </div>
    </div>
  )
}

export default ClientAlertsList