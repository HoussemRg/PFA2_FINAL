import request from './request';
import { predictionActions } from '../slices/predictionSlice';
import { toast } from 'react-toastify';
import { dataActions } from '../slices/dataSlice';


const postPredictionFile = (file) => {
    return async (dispatch, getState) => {
        let id;
      try {
        id= toast.loading("Uploading data,Please wait...")
        const res = await request.post('/api/prediction/addPrediction', file, {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            'Content-Type': "multipart/form-data"
          }
        });
        toast.update(id, { render:res.data, type: "success", isLoading: false,autoClose: 1200 });
        dispatch(getNH4AveragePredictionData());
        dispatch(getPxOyAveragePredictionData());
        dispatch(getNO3AveragePredictionData());
        dispatch(getRecentPredictionData('NH4'));
        dispatch(getRecentPredictionData('PxOy'));
        dispatch(getRecentPredictionData('NO3'));
        dispatch(getArrangementsNumber());
      } catch (err) {
        //console.log(err?.response?.data)
        
        toast.update(id,  { render: err?.response?.data, type: "error", isLoading: false, autoClose: 1200 });
        
      }
    };
  };

const getNH4AveragePredictionData=()=>{
    return async (dispatch,getState)=>{
        try{
            
            const res= await request.get(`/api/prediction/averageprediction/NH4`,{
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token, 
                }})
            dispatch(predictionActions.getNH4PredictionAverageRates(res.data?.averageRate));
        }catch(err){
            //toast.error(err?.response?.data)
            //console.log(err?.response?.data)
        }
    }
}

const getPxOyAveragePredictionData=()=>{
    return async (dispatch,getState)=>{
        try{
            
            const res= await request.get(`/api/prediction/averageprediction/PxOy`,{
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token, 
                }})
            dispatch(predictionActions.getPxOyPredictionAverageRates(res.data?.averageRate));
        }catch(err){
            //toast.error(err?.response?.data)
            //console.log(err?.response?.data)
        }
    }
}

const getNO3AveragePredictionData=()=>{
    return async (dispatch,getState)=>{
        try{
            
            const res= await request.get(`/api/prediction/averageprediction/NO3`,{
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token, 
                }})
            dispatch(predictionActions.getNO3PredictionAverageRates(res.data?.averageRate));
        }catch(err){
            //toast.error(err?.response?.data)
            //console.log(err?.response?.data)
        }
    }
}

const getPredictionDataPerDate=(dataType,date)=>{
    return async (dispatch,getState)=>{
        try{
            const res= await request.post(`/api/prediction/predictiondataPerDate`,{dataType,date},{
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token, 
                }})
            if(dataType==="NH4"){
                dispatch(predictionActions.getNH4PredictionPerDate(res.data));    
            }else if(dataType==="PxOy"){
                dispatch(predictionActions.getPxOyPredictionPerDate(res.data));
            }else if(dataType==="NO3"){
                dispatch(predictionActions.getNO3PredictionPerDate(res.data));
            }
        }catch(err){          
            toast.error(err.response.data,{autoClose:1200})
            if(dataType==="NH4"){
                dispatch(predictionActions.getNH4PredictionPerDate(null));    
            }else if(dataType==="PxOy"){
                dispatch(dataActions.getPxOyPredictionPerDate(null));
            }else if(dataType==="NO3"){
                dispatch(predictionActions.getNO3PredictionPerDate(null));
            }
        }
    }
}

const getPredictionDataPerMonth=(dataType,month,year)=>{
    return async (dispatch,getState)=>{
        try{
           
            const res= await request.post(`/api/prediction/predictiondataPerMonth`,{dataType,month,year},{
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token, 
                }})
                if(dataType==="NH4"){
                    dispatch(predictionActions.getNH4PredictionPerMonth(res.data));    
                }else if(dataType==="PxOy"){
                    dispatch(predictionActions.getPxOyPredictionPerMonth(res.data));
                }else if(dataType==="NO3"){
                    dispatch(predictionActions.getNO3PredictionPerMonth(res.data));
                }    
                
        }catch(err){
            toast.error(err.response.data,{autoClose:1200})
        }
    }
}

const getArrangementsNumber=()=>{
    return async (dispatch,getState)=>{
        try{
           
            const res= await request.get(`/api/prediction/arrangements`,{
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token, 
                }})
                
               
            dispatch(predictionActions.getArrangements(res.data));    
        }catch(err){
           // console.log(err)
        }
    }
}

const getPredictionDataPerYear=(dataType,year)=>{
    return async (dispatch,getState)=>{
        try{
           
            const res= await request.post(`/api/prediction/predictiondataPerYear`,{dataType,year},{
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token, 
                }})
                if(dataType==="NH4"){
                    dispatch(predictionActions.getNH4PredictionPerYear(res.data));    
                }else if(dataType==="PxOy"){
                    dispatch(predictionActions.getPxOyPredictionPerYear(res.data));
                }else if(dataType==="NO3"){
                    dispatch(predictionActions.getNO3PredictionPerYear(res.data));
                }    
            
            
        }catch(err){
            toast.error(err.response.data,{autoClose:1200})
        }
    }
}

const getRecentPredictionData=(dataType)=>{
    return async (dispatch,getState)=>{
        try{
            
            const res= await request.get(`/api/prediction/recentprediction/${dataType}`,{
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token, 
                }})
                if(dataType==="NH4"){
                    dispatch(predictionActions.getNH4RecentPredictionData(res.data));    
                }else if(dataType==="PxOy"){
                    dispatch(predictionActions.getPxOyRecentPredictionData(res.data));
                }else if(dataType==="NO3"){
                    dispatch(predictionActions.getNO3RecentPredictionData(res.data));
                }    
        }catch(err){
           
            //toast.error(err.response.data)
        }
    }
}


export {getNH4AveragePredictionData,getPxOyAveragePredictionData,getNO3AveragePredictionData,postPredictionFile,getPredictionDataPerDate,getPredictionDataPerMonth,getPredictionDataPerYear,getArrangementsNumber}