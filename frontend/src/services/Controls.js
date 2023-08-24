import axios from "axios";
import {
    fetchingUsers,
    fetchingSuccess,
    fetchingFailure,
    loggingSuccess,
    loggingUser,
    loggingFailure,
    fetchingUser,
    fetchingSuccessful,
    fetchFailed
} from "../Redux/fetchingSlice"; 

import {
    isCreating,
    createSuccessful,
    creatingThriftFailed,
    isFetchingThrift,
    ownThrifts,
    memThrifts,
    didNotGetThrift,
    fetchingInvite,
    fetchInviteSuccess,
    fetchInviteFailed,
    isSendingRequest,
    sendingRequestFailed,
    hasSentRequest
} from "../Redux/thriftSlice"

import { 
    fetchingCode,
    fetchingCodeSuccess,
    fetchingCodeFailure,
    settingPassword,
    passwordFailed,
    passwordSuccessful,
    nullifyCode,
    nullifyPassword

 } from "../Redux/forgotPasswordSlice";

let endpoint = "http://localhost:2000"

export const signUpUser = (dispatch, values)=>{
    dispatch(fetchingUsers())
    try {
        axios.post(`${endpoint}/signup`, values).then((res)=>{
        console.log(res.data);
        if (!res.data.status) {
            console.log(res.data.message);
            dispatch(fetchingFailure(res.data.message))
        } else{
            dispatch(fetchingSuccess(res.data))
        }
        }).catch((err)=>{
            console.log(err);
            dispatch(fetchingFailure(err.message))
        })
    } catch (error) {
        console.log(error);
        dispatch(fetchingFailure(error.message))
    }
}

export const loginUser = async(dispatch, values)=>{
    dispatch(loggingUser())
    try {
        axios.post(`${endpoint}/login`, values).then((res)=>{
        console.log(res.data);
        if (!res.data.status) {
            console.log(res.data.message);
            dispatch(loggingFailure(res.data.message))
        } else{
            dispatch(loggingSuccess(res.data))
        }
        }).catch((err)=>{
            console.log(err);
            dispatch(loggingFailure(err.message))
        })
    } catch (error) {
        console.log(error);
        dispatch(loggingFailure(error.message))
    }
}

export const sendCode = async(dispatch, email)=>{
    dispatch(fetchingCode())
    try {
        axios.post(`${endpoint}/sendcode`, email).then((res)=>{
            console.log(res.data);
            if (res.data.status) {
                dispatch(fetchingCodeSuccess(res.data.user))
            } else {
                dispatch(fetchingCodeFailure(res.data.message))
            }
        }).catch((err)=>{
            console.log(err);
            dispatch(fetchingCodeFailure(err.message))
        })
    } catch (error) {
        console.log(error);
        dispatch(fetchingCodeFailure(error.message))
    }
}

export const setNewPassword = async(dispatch, details)=>{
    dispatch(settingPassword())
    try {
        console.log(details);
        axios.post(`${endpoint}/setpassword`, details)
        .then((res)=>{
            console.log(res.data);
            if (!res.data.status) {
                dispatch(passwordFailed(res.data.message))
            } else {
                dispatch(passwordSuccessful(res.data))
            }
        })
        .catch((err)=>{
            console.log(err);
            dispatch(passwordFailed(err.message))
        })
    } catch (error) {
        console.log(error);
        dispatch(passwordFailed(error))
    }
}

export const getUserDetails = async(dispatch, token)=>{
    dispatch(fetchingUser())
    try {
        axios.get(`${endpoint}/dashboard`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept" : "application/json"
        }
      }).then((res)=>{
        console.log(res.data);
        if (!res.data.status) {
            dispatch(fetchFailed(res.data.message))
            localStorage.removeItem("user")
        } else{
            dispatch(fetchingSuccessful(res.data.user))
            localStorage.setItem("user", JSON.stringify(res.data.user))
        }
      }).catch((err)=>{
        console.log(err);
        dispatch(fetchFailed(err.message))
        localStorage.removeItem("user")
    })
    } catch (error) {
        console.log(error);
        dispatch(fetchFailed(error.message))
        localStorage.removeItem("user")
    }
}

export const createThrift = (dispatch, thrift)=>{
    dispatch(isCreating())
    try {
        axios.post(`${endpoint}/thrifts/createthrift`, thrift)
        .then((res)=>{
            console.log(res.data);
            if (!res.data.status) {
                dispatch(creatingThriftFailed(res.data.message))
            }else {
                dispatch(createSuccessful(res.data.id))
                // navigate(`/dashboard/groups/${id}`)
            }
        }).catch((err)=>{
            console.log(err);
            dispatch(creatingThriftFailed(err.message))
        })
    } catch (error) {
        console.log(error);
        dispatch(creatingThriftFailed(error.message))
    }
}

export const getGroups = async(dispatch, userId)=>{
    dispatch(isFetchingThrift())
    try {
        axios.get(`${endpoint}/thrifts`, {
            headers: {
                "Authorization": `Bearer ${userId}`,
                "Content-Type": "application/json",
                "Accept" : "application/json"
            }
        }).then((res)=>{
            // 
            if (!res.data.status) {
                dispatch(didNotGetThrift(res.data.message))
            } else {
                console.log(res.data);
                let ownedGroups = res.data.ownedGroups
                let sharedGroups = res.data.userGroups
                dispatch(ownThrifts(ownedGroups))
                dispatch(memThrifts(sharedGroups))
            }
        }).catch((err)=>{
            dispatch(didNotGetThrift(err.message))
        })
    } catch (error) {
        console.log(error);
        dispatch(didNotGetThrift(error.message))
    }
}

export const getInvitedGroup = async(dispatch, id)=>{
    dispatch(fetchingInvite())
    try {
        axios.post(`${endpoint}/thrifts/invitegroup`, {id}).then((res)=>{
            console.log(res.data);
            if (!res.data.status) {
                dispatch(fetchInviteFailed(res.data.message))
            } else {
                dispatch(fetchInviteSuccess(res.data.thrift))
            }
        }).catch((err)=>{
            console.log(err);
            dispatch(fetchInviteFailed(err.message))
        })
    } catch (error) {
        console.log(error.message);
        dispatch(fetchInviteFailed(error.message))
    }
}

export const joinGroup = async(dispatch, id, userId)=>{
    let ids = {
    userId,
    thriftId: id

    }
    try {
        dispatch(isSendingRequest())
        // console.log(dispatch, id, userId);
        axios.post(`${endpoint}/thrifts/validategroup`, ids).then((res)=>{
            if (!res.data.status) {
                console.log(res.data);
                dispatch(sendingRequestFailed(res.data.message))
            } else {
                console.log(res.data);
                dispatch(hasSentRequest(res.data.message))
            }
        }).catch((err)=>{
            console.log(err.message);
            dispatch(sendingRequestFailed(err.message))
        })
    } catch (error) {
        console.log(error);
        dispatch(sendingRequestFailed(error.message))
    }
}

export const logOut = (dispatch, navigate)=>{
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    // window.location.reload()
    dispatch(nullifyCode())
    dispatch(nullifyPassword())
    navigate("/")
}