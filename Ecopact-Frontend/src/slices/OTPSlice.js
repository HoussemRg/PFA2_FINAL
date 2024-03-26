import { createSlice } from "@reduxjs/toolkit";

const OTPSlice = createSlice({
    name: 'triggerOTP',
    initialState: {
        triggerOTP: false,
        OTPCode: {}
    },
    reducers: {
        active: (state, action) => {
            state.triggerOTP = true;
        },
        inactive: (state) => {
            state.triggerOTP = false;
        },
        value: (state, action) => { 
            state.OTPCode = action.payload;
        }
    }
});

const { actions: OTPActions, reducer: OTPReducers } = OTPSlice; // Destructure actions and reducer directly

export { OTPActions, OTPReducers };
