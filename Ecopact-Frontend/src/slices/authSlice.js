import {createSlice} from "@reduxjs/toolkit"

const authSlice=createSlice({
    name:'auth',
    initialState:{
        user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
        isEmailVerified:false,
    },
    reducers:{
        login:(state,action)=>{
            state.user=action.payload;
        },
        logout:(state)=>{
            state.user=null;
        },
        verifyEmail:(state)=>{
            state.isEmailVerified=true;
        }
    }
})

const authActions=authSlice.actions;

const authReducers=authSlice.reducer;
export {authActions,authReducers}
