import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    creating: false,
    created: null,
    createFailed: false,
    fetchingThrift: false,
    ownedThrifts: null,
    memberThrifts: null,
    fetchingThriftFailed: false,
    isFetchingInvite: false,
    inviteGroup: null,
    fetchInviteError: false,
    sendingRequest: false,
    requestSent: null,
    requestFailed: false
}

const thriftSlice = createSlice({
    name: "thriftSlice",
    initialState,
    reducers: {
        isCreating:(state)=>{
            state.creating = true;
            state.created = null;
            state.createFailed = false;
            state.fetchingThrift = false;
            state.fetchingThriftFailed = false
        },
        createSuccessful:(state, action)=>{
            state.creating = false;
            state.created = action.payload;
            state.createFailed = false;
            state.fetchingThrift = false;
            state.fetchingThriftFailed = false
        },
        creatingThriftFailed:(state, action)=>{
            state.creating = false;
            state.created = false;
            state.createFailed = action.payload;
            state.fetchingThrift = false;
            state.fetchingThriftFailed = false
        },
        isFetchingThrift:(state)=>{
            state.creating = false;
            state.created = false;
            state.createFailed = false;
            state.fetchingThrift = true;
            state.ownedThrifts = null;
            state.memberThrifts = null;
            state.fetchingThriftFailed = false
        },
        ownThrifts:(state, action)=>{
            state.creating = false;
            state.created = false;
            state.createFailed = false;
            state.fetchingThrift = true;
            state.ownedThrifts = action.payload;
            state.fetchingThriftFailed = false
        },
        memThrifts:(state, action)=>{
            state.creating = false;
            state.created = false;
            state.createFailed = false;
            state.fetchingThrift = true;
            state.memberThrifts = action.payload;
            state.fetchingThriftFailed = false
        },
        didNotGetThrift:(state, action)=>{
            state.creating = false;
            state.created = false;
            state.createFailed = false;
            state.fetchingThrift = false;
            state.ownedThrifts = null;
            state.memberThrifts = null;
            state.fetchingThriftFailed = action.payload
        },
        fetchingInvite:(state)=>{
            state.isFetchingInvite = true;
            state.inviteGroup = null;
            state.fetchInviteError = false
        },
        fetchInviteSuccess:(state, action)=>{
            state.isFetchingInvite = false;
            state.inviteGroup = action.payload;
            state.fetchInviteError = false
        },
        fetchInviteFailed:(state, action)=>{
            state.isFetchingInvite = false;
            state.inviteGroup = null;
            state.fetchInviteError = action.payload
        },
        isSendingRequest:(state)=>{
            state.sendingRequest = true;
            state.requestSent = null;
            state.requestFailed = false
        },
        hasSentRequest:(state, action)=>{
            state.sendingRequest = false;
            state.requestSent = action.payload;
            state.requestFailed = false
        },
        sendingRequestFailed:(state, action)=>{
            state.sendingRequest = false;
            state.requestSent = null;
            state.requestFailed = action.payload
        }
    }
})

export default thriftSlice.reducer
export const {
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
               hasSentRequest,
                sendingRequestFailed
             } = thriftSlice.actions