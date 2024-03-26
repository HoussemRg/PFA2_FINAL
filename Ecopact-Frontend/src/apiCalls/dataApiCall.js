import request from './request';
import { dataActions } from '../slices/dataSlice';
import { toast } from 'react-toastify';



const postFile = (file) => {
    return async (dispatch, getState) => {
        let id;
      try {
        id= toast.loading("Uploading data,Please wait...")
        const res = await request.post('/api/data/add', file, {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            'Content-Type': "multipart/form-data"
          }
        });
        toast.update(id, { render:res.data, type: "success", isLoading: false,autoClose: 1200 });
        
        dispatch(getNH4AverageData());
        dispatch(getPxOyAverageData());
        dispatch(getNO3AverageData());
        dispatch(getRecentData('NH4'));
        dispatch(getRecentData('PxOy'));
        dispatch(getRecentData('NO3'));
        dispatch(getArrangementsNumber());
      } catch (err) {
        toast.update(id,  { render: err?.response?.data, type: "error", isLoading: false, autoClose: 1200 });
      }
    };
  };

const getNH4AverageData=()=>{
    return async (dispatch,getState)=>{
        try{
            
            const res= await request.get(`/api/data/average/NH4`,{
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token, 
                }})
            dispatch(dataActions.getNH4AverageRates(res.data?.averageRate));
        }catch(err){
            //toast.error(err?.response?.data)
        }
    }
}

const getPxOyAverageData=()=>{
    return async (dispatch,getState)=>{
        try{
            
            const res= await request.get(`/api/data/average/PxOy`,{
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token, 
                }})
            dispatch(dataActions.getPxOyAverageRates(res.data?.averageRate));
        }catch(err){
            //toast.error(err?.response?.data)
        }
    }
}

const getNO3AverageData=()=>{
    return async (dispatch,getState)=>{
        try{
            
            const res= await request.get(`/api/data/average/NO3`,{
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token, 
                }})
            dispatch(dataActions.getNO3AverageRates(res.data?.averageRate));
        }catch(err){
            //toast.error(err?.response?.data)
        }
    }
}

const getDataPerDate=(dataType,date)=>{
    return async (dispatch,getState)=>{
        try{
            const res= await request.post(`/api/data/dataPerDate`,{dataType,date},{
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token, 
                }})
            if(dataType==="NH4"){
                dispatch(dataActions.getNH4PerDate(res.data));    
            }else if(dataType==="PxOy"){
                dispatch(dataActions.getPxOyPerDate(res.data));
            }else if(dataType==="NO3"){
                dispatch(dataActions.getNO3PerDate(res.data));
            }
        }catch(err){          
            toast.error(err.response.data,{autoClose:1200})
            if(dataType==="NH4"){
                dispatch(dataActions.getNH4PerDate(null));    
            }else if(dataType==="PxOy"){
                dispatch(dataActions.getPxOyPerDate(null));
            }else if(dataType==="NO3"){
                dispatch(dataActions.getNO3PerDate(null));
            }
        }
    }
}

const getDataPerMonth=(dataType,month,year)=>{
    return async (dispatch,getState)=>{
        try{
           
            const res= await request.post(`/api/data/dataPerMonth`,{dataType,month,year},{
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token, 
                }})
                if(dataType==="NH4"){
                    dispatch(dataActions.getNH4PerMonth(res.data));    
                }else if(dataType==="PxOy"){
                    dispatch(dataActions.getPxOyPerMonth(res.data));
                }else if(dataType==="NO3"){
                    dispatch(dataActions.getNO3PerMonth(res.data));
                }    
        }catch(err){
            toast.error(err.response.data,{autoClose:1200})
        }
    }
}

const getArrangementsNumber=()=>{
    return async (dispatch,getState)=>{
        try{
           
            const res= await request.get(`/api/data/arrangements`,{
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token, 
                }})
               
            dispatch(dataActions.getArrangements(res.data));    
        }catch(err){
           // console.log(err)
        }
    }
}

const getDataPerYear=(dataType,year)=>{
    return async (dispatch,getState)=>{
        try{
           
            const res= await request.post(`/api/data/dataPerYear`,{dataType,year},{
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token, 
                }})
                if(dataType==="NH4"){
                    dispatch(dataActions.getNH4PerYear(res.data));    
                }else if(dataType==="PxOy"){
                    dispatch(dataActions.getPxOyPerYear(res.data));
                }else if(dataType==="NO3"){
                    dispatch(dataActions.getNO3PerYear(res.data));
                }      
            
        }catch(err){
            toast.error(err.response.data,{autoClose:1200})
        }
    }
}

const getRecentData=(dataType)=>{
    return async (dispatch,getState)=>{
        try{
            
            const res= await request.get(`/api/data/recent/${dataType}`,{
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token, 
                }})
                if(dataType==="NH4"){
                    dispatch(dataActions.getNH4RecentData(res.data));    
                }else if(dataType==="PxOy"){
                    dispatch(dataActions.getPxOyRecentData(res.data));
                }else if(dataType==="NO3"){
                    dispatch(dataActions.getNO3RecentData(res.data));
                }    
        }catch(err){
           
            //toast.error(err.response.data)
        }
    }
}


export {getNH4AverageData,getPxOyAverageData,getNO3AverageData,postFile,getDataPerDate,getDataPerMonth,getDataPerYear,getRecentData,getArrangementsNumber}