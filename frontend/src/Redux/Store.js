import { configureStore } from "@reduxjs/toolkit";
import fetchingSlice from "./fetchingSlice";
import thriftSlice from "./thriftSlice";
import forgotPasswordSlice from "./forgotPasswordSlice";

export const store = configureStore({
    reducer:{
        fetchingSlice,
        thriftSlice,
        forgotPasswordSlice
    }
})