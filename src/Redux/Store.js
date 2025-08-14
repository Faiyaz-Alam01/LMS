import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './Slices/AuthSlice'
import courseSliceReducer from './Slices/CourseSlice'

export const store = configureStore({
    reducer: {
      auth : authSliceReducer,
      course: courseSliceReducer
    },
    devTools: true
})

