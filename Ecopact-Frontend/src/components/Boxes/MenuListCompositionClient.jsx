import {useEffect,useState} from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MdNotificationsActive } from "react-icons/md";
import {useSelector,useDispatch} from 'react-redux'
import {  getClientReportList } from '../../apiCalls/alertsApiCall';
import { Link } from 'react-router-dom';
import ANPE from '../../assets/ANPE.png';
const MenuListCompositionClient = () => {
    const dispatch=useDispatch();
    const {user}=useSelector(state=> state.auth)
    const {clientReportsArray}=useSelector(state=> state.alerts);
    const [anchorEl, setAnchorEl] = useState(null);
    const {clientAlerts}=useSelector(state=> state.alerts);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    useEffect(()=>{
        dispatch(getClientReportList(user?._id));
    },[user?._id,clientAlerts])
    
    return (
      <div className='relative'>
        {clientAlerts!==0 && <p className='absolute rounded-full w-4 h-4 flex justify-center items-center text-[10px] text-gray-300 bg-red-500   top-1 right-3 z-10 '>{clientAlerts}</p>}
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <div className=' text-2xl text-gray-300 '><MdNotificationsActive /></div>
        </Button>
        <Menu
          id="basic-menu"
          style={{marginTop:"10px"}}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          
        >
            <div className='overflow-y-auto h-44 px-2 '>
                
                {clientReportsArray.length===0 ? <div className='w-full flex justify-center items-center text-orange-800 mt-8'><p>No alerts yet</p></div>: 
                clientReportsArray.slice(0,8).map((item,index)=> 
                 (
                 <Link to={`/alerts/client/report/${item?._id}`}  key={index+1}><MenuItem  style={{ borderBottom: '1px solid #717171',width:'100%',background:!item?.isViewed && 'pink' ,marginBottom:'10px' }}  onClick={handleClose}>
                    <div className='w-44 flex items-center gap-4 '>
                        <img className=' h-8 w-8 rounded-full' src={ANPE} alt="ANPE" />
                        <div className='flex flex-col items-start gap-1'>
                            <div className=' text-xs font-bold text-red-700 text-wrap '> Warning Threshold exceeded</div>
                            <p className='text-xs text-wrap '>ANPE </p>
                            <div className='w-full flex flex-col gap-1 items-start'>
                              <p className='text-xs'>{item.fileName}</p>
                              <p className='text-xs text-green-900'>{new Date(item?.updatedAt).toISOString().split('T')[0]}</p>
                            </div>
                        </div>
                    </div>
                </MenuItem>
                </Link>
                 )
                 )
                }
            </div>
            <Link to="/alerts/client/alertList" className='text-sm flex cursor-pointer hover:text-blue-800 justify-center pt-2 px-4 mx-2  w-full'> See all exceedances </Link> 
        </Menu>
      </div>
    );
}

export default MenuListCompositionClient