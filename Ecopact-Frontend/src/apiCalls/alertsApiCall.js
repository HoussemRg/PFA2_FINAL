import request from './request';
import { alertsActions } from '../slices/alertsSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const getAllReportList=()=>{
    return async (dispatch,getState)=>{
        try{
            const res=await request.get('/api/alerts/',{
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token, 
                }
            });
            dispatch(alertsActions.setAllReportsArray(res.data));
            
        }catch(err){
            console.log(err)
        }
    }
}
const getANPEReportList=()=>{
    return async (dispatch,getState)=>{
        try{
            const res=await request.get('/api/alerts/ANPE',{
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token, 
                }
            });
            dispatch(alertsActions.seANPEReportsArray(res.data));
            
        }catch(err){
            console.log(err)
        }
    }
}
const getClientReportList=(id)=>{
    return async (dispatch,getState)=>{
        try{
            const res=await request.get(`/api/alerts/client/${id}`,{
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token, 
                }
            });
            dispatch(alertsActions.setClientReportsArray(res.data));
            dispatch(alertsActions.setClientAlerts(res.data));
        }catch(err){
            console.log(err)
        }
    }
}
const getSingleReport=(id)=>{
    return async (dispatch,getState)=>{
        try{
            
            const res=await request.get(`/api/alerts/report/${id}`,{
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token, 
                }
            });
            
            dispatch(alertsActions.setReport(res.data));
            
        }catch(err){
            console.log(err)
        }
    }
}

const sendAlert=(id)=>{
    return async (dispatch,getState)=>{
        try{
            const res=await request.put(`/api/alerts/ANPE/${id}`,{},{
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token, 
                }
            });
            dispatch(alertsActions.setReport(res.data));
            dispatch(getANPEReportList());
            toast.success("Alert Sended",{autoClose:1200})
        }catch(err){
            console.log(err)
            
        }
    }
}
const viewAlert=(id)=>{
    return async (dispatch,getState)=>{
        try{
            const res=await request.put(`/api/alerts/report/${id}`,{},{
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token, 
                }
            });
            
            dispatch(alertsActions.setClientAlerts(res.data));
        }catch(err){
            console.log(err)
            
        }
    }
}

export {getANPEReportList,getSingleReport,sendAlert,getClientReportList,viewAlert,getAllReportList}