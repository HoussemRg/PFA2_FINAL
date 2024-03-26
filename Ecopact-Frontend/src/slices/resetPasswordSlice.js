import {createSlice} from "@reduxjs/toolkit"

const ResetSlice=createSlice({
    name:'triggerReset',
    initialState:{
        triggerReset:false,
    },
    reducers:{
        active:(state,action)=>{
            state.triggerReset=true;
        },
        inactive:(state)=>{
            state.triggerReset=false;
        }
    }
})

const ResetActions=ResetSlice.actions;

const ResetReducers=ResetSlice.reducer;
export {ResetActions,ResetReducers}

