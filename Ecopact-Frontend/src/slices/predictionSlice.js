import {createSlice} from "@reduxjs/toolkit"

const predictionSlice=createSlice({
    name:'prediction',
    initialState:{
        NH4PredictionAverageRates:0,
        PxOyPredictionAverageRates:0,
        NO3PredictionAverageRates:0,
        NH4PredictionDataPerDate:null,
        PxOyPredictionDataPerDate:null,
        NO3PredictionDataPerDate:null,
        NH4PredictionDataPerMonth:[],
        PxOyPredictionDataPerMonth:[],
        NO3PredictionDataPerMonth:[],
        NH4PredictionDataPerYear:[],
        PxOyPredictionDataPerYear:[],
        NO3PredictionDataPerYear:[],
        recentPredictionNH4Year:null,
        recentPredictionPxOyYear:null,
        recentPredictionNO3Year:null,
        NH4PredictionRecentData:[],
        PxOyPredictionRecentData:[],
        NO3PredictionRecentData:[],
        Arrangements:[]
    },
    reducers:{
        getNH4PredictionAverageRates:(state,action)=>{
            state.NH4PredictionAverageRates=action.payload;
        },
        getPxOyPredictionAverageRates:(state,action)=>{
            state.PxOyPredictionAverageRates=action.payload;
        },
        getNO3PredictionAverageRates:(state,action)=>{
            state.NO3PredictionAverageRates=action.payload;
        },
        getNH4PredictionPerDate:(state,action)=>{
            state.NH4PredictionDataPerDate=action.payload?.data?.dataRate;
        },
        getPxOyPredictionPerDate:(state,action)=>{
            state.PxOyPredictionDataPerDate=action.payload?.data?.dataRate;
        },
        getNO3PredictionPerDate:(state,action)=>{
            state.NO3PredictionDataPerDate=action.payload?.data?.dataRate;
        },
        setRecentNH4PredictionYear:(state,action)=>{
            state.recentPredictionNH4Year=action.payload;
        },
        setRecentPxOyPredictionYear:(state,action)=>{
            state.recentPredictionPxOyYear=action.payload;
        },
        setRecentNO3PredictionYear:(state,action)=>{
            state.recentPredictionNO3Year=action.payload;
        },
        getNH4RecentPredictionData:(state,action)=>{
            state.NH4PredictionRecentData=action.payload;
        },
        getPxOyRecentPredictionData:(state,action)=>{
            state.PxOyPredictionRecentData=action.payload;
        },
        getNO3RecentPredictionData:(state,action)=>{
            state.NO3PredictionRecentData=action.payload;
        },
       
        getNH4PredictionPerMonth:(state,action)=>{
            state.NH4PredictionDataPerMonth=action.payload;
        },
        getPxOyPredictionPerMonth:(state,action)=>{
            state.PxOyPredictionDataPerMonth=action.payload;
        },
        getNO3PredictionPerMonth:(state,action)=>{
            state.NO3PredictionDataPerMonth=action.payload;
        },
        getNH4PredictionPerYear:(state,action)=>{
            state.NH4PredictionDataPerYear=action.payload;
        },
        getPxOyPredictionPerYear:(state,action)=>{
            state.PxOyPredictionDataPerYear=action.payload;
        },
        getNO3PredictionPerYear:(state,action)=>{
            state.NO3PredictionDataPerYear=action.payload;
        },
        getArrangements:(state,action)=>{
            state.Arrangements=action.payload;
        },
    }
})

const predictionActions=predictionSlice.actions;

const predictionReducers=predictionSlice.reducer;
export {predictionActions,predictionReducers}