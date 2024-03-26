import { Table } from 'flowbite-react';
import { useParams} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { useEffect } from 'react';
import {  getClientReportList, getSingleReport, viewAlert } from '../../apiCalls/alertsApiCall';
import TopBar from '../../components/TopBar';
import ANPE from '../../assets/ANPE.png';
const ClientThresholdExceededReport = () => {
    const dispatch=useDispatch();
    const {report}=useSelector(state=> state.alerts);
    const {user}=useSelector(state=> state.auth);
    const {id}=useParams()
    useEffect(()=>{
        dispatch(getSingleReport(id))
        dispatch(viewAlert(id))
        dispatch(getClientReportList(user?._id));
    },[id])
  return (
    <div className="flex flex-col gap-12 ">
      <div className="top w-full h-[50px] bg-blue-950">
        <TopBar />
      </div>
      <div className="flex flex-col gap-12 w-11/12 mx-auto ">
      <div className='flex justify-center items-center'>
        <div className='text-blue-900 font-bold text-xl'>Threshold exceeded in {" " +report?.fileName}</div>
       
      </div>
      <div className='w-full'>
        <div className='flex items-center gap-2 my-4'>
            <img className=' h-8 w-8 rounded-full' src={ANPE} alt="ANPE" />
            <div className='font-bold text-lg' >ANPE</div>
        </div>
      <span className=''>Dear customer</span>,
      <div>
        We have recently observed that the waste threshold in the aquatic region where you have recently disposed of your waste has been exceeded.
        It is crucial to emphasize the importance of your contribution to preserving our environment.
        Therefore, we urge you to be more vigilant during your future deposits in this particular region.

        We are continuously striving to maintain the quality of our water and to protect our precious natural resources.
        Your cooperation in this endeavor is essential to ensure a sustainable and healthy future for all.
      </div>
      <p className=''>
        Thank you for your attention and understanding.
      </p>



      </div>
      <div className='flex justify-start items-center'>
        <div className='text-gray-700 flex flex-col gap-3  '>
            <div><span className=' font-bold '>User :</span> {" " +report?.user.firstName}{" "}{report?.user.lastName}</div>
            <div><span className=' font-bold'>Report :</span> {" " +report?.fileName}</div>
            <div><span className=' font-bold'>Arranged on : </span>{report?.createdAt && new Date(report.createdAt).toISOString().split('T')[0]}</div>
            <div><span className=' font-bold'>number of values :</span> {" "+report?.data.length}</div>
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

export default ClientThresholdExceededReport