import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isFetching: false,
    signedUser: null,
    fetchingFailed: false,

    isLogging: false,
    loggedUser: null,
    loginFailed: false,
    
    isFetchingUser: false,
    currentUser: null,
    fetchingUserFailed: false
}

const fetchingSlice = createSlice({
    name: "signedUser",
    initialState,
    reducers:{
        fetchingUsers:(state)=>{
            state.isFetching = true;
            state.signedUser = null;
            state.fetchingFailed = false;
            state.isLogging = false;
            state.loggedUser = null;
            state.loginFailed = false;
            state.isFetchingUser = false;
            state.currentUser = null;
            state.fetchingUserFailed = false
        },
        fetchingSuccess:(state, action)=>{
            state.isFetching = false;
            state.signedUser = action.payload;
            state.fetchingFailed = false
            state.isLogging = false;
            state.loggedUser = null;
            state.loginFailed = false;
            state.isFetchingUser = false;
            state.currentUser = null;
            state.fetchingUserFailed = false
        },
        fetchingFailure: (state, action)=>{
            state.isFetching = false;
            state.signedUser = null;
            state.fetchingFailed = action.payload
            state.isLogging = false;
            state.loggedUser = null;
            state.loginFailed = false;
            state.isFetchingUser = false;
            state.currentUser = null;
            state.fetchingUserFailed = false
        },
        loggingUser:(state)=>{
            state.isLogging = true;
            state.loggedUser = null;
            state.loginFailed = false;
            state.isFetching = false;
            state.signedUser = null;
            state.fetchingFailed = false;
            state.isFetchingUser = false;
            state.currentUser = null;
            state.fetchingUserFailed = false;
        },
        loggingSuccess:(state, action)=>{
            state.isLogging = false;
            state.loggedUser = action.payload;
            state.loginFailed = false;
            state.isFetching = false;
            state.signedUser = null;
            state.fetchingFailed = false;
            state.isFetchingUser = false;
            state.currentUser = null;
            state.fetchingUserFailed = false;
        },
        loggingFailure: (state, action)=>{
            state.isLogging = false;
            state.loggedUser = null;
            state.loginFailed = action.payload;
            state.isFetching = false;
            state.signedUser = null;
            state.fetchingFailed = false;
            state.isFetchingUser = false;
            state.currentUser = null;
            state.fetchingUserFailed = false;
        },
        fetchingUser: (state)=>{
            state.isFetchingUser = true;
            state.currentUser = null;
            state.fetchingUserFailed = false;
            state.isFetching = false;
            state.signedUser = null;
            state.fetchingFailed = false;
            state.isLogging = false;
            state.loggedUser = null;
            state.loginFailed = false;
        },
        fetchingSuccessful: (state, action)=>{
            state.isFetchingUser = false;
            state.currentUser = action.payload;
            state.fetchingUserFailed = false;
            state.isFetching = false;
            state.signedUser = null;
            state.fetchingFailed = false;
            state.isLogging = false;
            state.loggedUser = null;
            state.loginFailed = false;
        },
        fetchFailed: (state,action)=>{
            state.isFetchingUser = false;
            state.currentUser = null;
            state.fetchingUserFailed = action.payload;
            state.isFetching = false;
            state.signedUser = null;
            state.fetchingFailed = false;
            state.isLogging = false;
            state.loggedUser = null;
            state.loginFailed = false;
        }
    }
})
export default fetchingSlice.reducer
export const { fetchingUsers, fetchingSuccess, fetchingFailure, loggingUser, loggingSuccess, loggingFailure, fetchingUser, fetchingSuccessful, fetchFailed } = fetchingSlice.actions