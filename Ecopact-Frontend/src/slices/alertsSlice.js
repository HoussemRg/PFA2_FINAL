import {createSlice} from "@reduxjs/toolkit"

const alertsSlice=createSlice({
    name:'alerts',
    initialState:{
        alertList:[],
        ANPEReportsArray:[],
        clientReportsArray:[],
        report:null,
        clientAlerts:0
    },
    reducers:{
        setAllReportsArray:(state,action)=>{
            state.alertList=action.payload;
        },
        seANPEReportsArray:(state,action)=>{
            state.ANPEReportsArray=action.payload;
        },
        setClientReportsArray:(state,action)=>{
            state.clientReportsArray=action.payload;
        },
        setReport:(state,action)=>{
            state.report=action.payload;
        },
        setClientAlerts:(state,action)=>{
            state.clientAlerts=action.payload.filter(item => !item.isViewed).length;
        }
        
    }
})

const alertsActions=alertsSlice.actions;

const alertsReducers=alertsSlice.reducer;
export {alertsActions,alertsReducers}