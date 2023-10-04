import { configureStore } from "@reduxjs/toolkit";

// import logger from 'redux-logger'
import formSlice from "./slices/form.slice";


export const store = configureStore({
    reducer: {
        form: formSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(/*logger*/),
})