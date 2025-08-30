import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './Slices/AuthSlice'
import courseSliceReducer from './Slices/CourseSlice'
import razorpaySliceReducer from './Slices/RazorpaySlice'
import lectureSliceReducer from './Slices/LectureSlice'
import sessionStorage from "redux-persist/es/storage/session";

const rootReducer = combineReducers({
	  reducer: {
      auth : authSliceReducer,
      course: courseSliceReducer,
      razorpay : razorpaySliceReducer,
      lecture: lectureSliceReducer
    },
    devTools: true
})

const persistConfig = {
    key: 'root',
    storage: sessionStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
	  middleware: (getDefaultMiddleware) => 
	     getDefaultMiddleware({serializableCheck: false})
})

export const persistor = persistStore(store)


