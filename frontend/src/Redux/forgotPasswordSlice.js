import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isFetchingCode: false,
    code: null,
    fetchingCodeFailed: false,

    isSettingPassword: false,
    setPassword: null,
    settingPasswordFailed: false

    // isLogging: false,
    // loggedUser: null,
    // loginFailed: false,
    
    // isFetchingUser: false,
    // currentUser: null,
    // fetchingUserFailed: false
}

const forgotPasswordSlice = createSlice({
    name: "forgotPassword",
    initialState,
    reducers:{
        fetchingCode:(state)=>{
            state.isFetchingCode = true;
            state.code = null;
            state.fetchingCodeFailed = false
        },
        fetchingCodeSuccess:(state, action)=>{
            state.isFetchingCode = false;
            state.code = action.payload;
            state.fetchingCodeFailed = false
        },
        fetchingCodeFailure: (state, action)=>{
            state.isFetchingCode = false;
            state.code = null;
            state.fetchingCodeFailed = action.payload
        },
        nullifyCode: (state)=>{
            state.isFetchingCode = false;
            state.code = null;
            state.fetchingCodeFailed = false
        },
        
        settingPassword:(state)=>{
            state.isSettingPassword = true;
            state.setPassword = null;
            state.settingPasswordFailed = false
        },
        passwordSuccessful:(state, action)=>{
            state.isSettingPassword = false;
            state.setPassword = action.payload;
            state.settingPasswordFailed = false  
        },
        passwordFailed: (state, action)=>{
            state.isSettingPassword = false;
            state.setPassword = null;
            state.settingPasswordFailed = action.payload
        },
        nullifyPassword: (state)=>{
            state.isSettingPassword = false;
            state.setPassword = null;
            state.settingPasswordFailed = false
        }
        // fetchingUser: (state)=>{

        // },
        // fetchingSuccessful: (state, action)=>{

        // },
        // fetchFailed: (state,action)=>{

        // }
    }
})
export default forgotPasswordSlice.reducer
export const { 
    fetchingCode, 
    fetchingCodeSuccess, 
    fetchingCodeFailure, 
    nullifyCode,
    settingPassword, 
    passwordSuccessful, 
    passwordFailed, 
    nullifyPassword
} = forgotPasswordSlice.actions