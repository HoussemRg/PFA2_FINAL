import {createSlice} from "@reduxjs/toolkit"

const popupSlice=createSlice({
    name:'trigger',
    initialState:{
        trigger:false,
    },
    reducers:{
        active:(state,action)=>{
            state.trigger=true;
        },
        inactive:(state)=>{
            state.trigger=false;
        }
    }
})

const popupActions=popupSlice.actions;

const popupReducers=popupSlice.reducer;
export {popupActions,popupReducers}

