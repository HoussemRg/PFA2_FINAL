import { Table } from 'flowbite-react';

import { useParams} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { useEffect } from 'react';
import { getANPEReportList, getSingleReport, sendAlert } from '../../apiCalls/alertsApiCall';
import TopBarAdminDashboard from '../../components/TopBarAdminDashboard';

const ThresholdExceededReport = () => {
    const dispatch=useDispatch();
    const {report}=useSelector(state=> state.alerts);
    const {id}=useParams()
    useEffect(()=>{
        dispatch(getSingleReport(id))
    },[id])
    const sendAlertToClient=(id)=>{
        dispatch(sendAlert(id));
        dispatch(getANPEReportList());
        dispatch(getSingleReport(id))
    }
  return (
    <div className="flex flex-col gap-12 ">
      <div className="top w-full h-[50px] bg-blue-950">
        <TopBarAdminDashboard />
      </div>
      <div className="flex flex-col gap-12 w-11/12 mx-auto ">
      <div className='flex justify-between items-center'>
        <div className='text-blue-900 font-bold text-xl'>Values that have exceeded the threshold in {" " +report?.fileName}</div>
        {report?.isChecked ? <div className=' p-1 disabled bg-green-600  text-white rounded-md' >Alert sent</div>  :   <div className='text-lg p-2 cursor-pointer bg-orange-600 hover:bg-orange-500 text-white rounded-md' onClick={()=> sendAlertToClient(report?._id)}>Send Warning Alert</div>}
      </div>
      <div className='flex justify-around items-center'>
        <div className='text-gray-700 flex flex-col gap-3  '>
            <div><span className=' font-bold '>User :</span> {" " +report?.user.firstName}{" "}{report?.user.lastName}</div>
            <div><span className=' font-bold'>Report :</span> {" " +report?.fileName}</div>
            <div><span className=' font-bold'>Arranged on : </span>{report?.createdAt && new Date(report.createdAt).toISOString().split('T')[0]}</div>
            <div><span className=' font-bold'>number of values :</span> {" "+report?.data.length}</div>
        </div>
        <div className='text-gray-700 flex flex-col gap-3  '>
            <div><span className=' font-bold'>NH4 threshold :</span> {" "}1</div>
            <div><span className=' font-bold'>PxOy threshold :</span> {" "}1</div>
            <div><span className=' font-bold'>NO3 threshold :</span>{" " }50</div>
           
        </div>
      </div>
      <div className="overflow-x-auto w-5/6 mx-auto border border-gray-300">
        <Table hoverable className=''>
          <Table.Head className='text-blue-900 text-center border '>
            <Table.HeadCell>#id</Table.HeadCell>
            <Table.HeadCell>date</Table.HeadCell>
            <Table.HeadCell>Item</Table.HeadCell>
            <Table.HeadCell>Rate</Table.HeadCell>
            
          </Table.Head>
          <Table.Body className="divide-y border text-center">
            {report?.data.map((item,index) => (
              <Table.Row key={index+1} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index+1}
                </Table.Cell>
                <Table.Cell>{new Date(item?.date).toISOString().split('T')[0]}</Table.Cell>
                <Table.Cell>{item?.data.dataName}</Table.Cell>
                <Table.Cell>{item?.data.dataRate}</Table.Cell>
                
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      </div>
    </div>
  )
}

export default ThresholdExceededReport