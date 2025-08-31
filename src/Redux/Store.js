import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './Slices/AuthSlice'
import courseSliceReducer from './Slices/CourseSlice'
import razorpaySliceReducer from './Slices/RazorpaySlice'
import lectureSliceReducer from './Slices/LectureSlice'
import sessionStorage from "redux-persist/es/storage/session";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({
    auth : authSliceReducer,
    course: courseSliceReducer,
    razorpay : razorpaySliceReducer,
    lecture: lectureSliceReducer
})

const persistConfig = {
    key: 'root',
    storage: sessionStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
	middleware: (getDefaultMiddleware) => 
	    getDefaultMiddleware({serializableCheck: false})
})

export const persistor = persistStore(store)


