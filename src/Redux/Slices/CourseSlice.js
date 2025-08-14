import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstance"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
	courseData: []
}

export const getAllCourses = createAsyncThunk("course/get", async() => {
	try {
		const res = axiosInstance.get("/coutses");
		toast.promise(res, {
			loading: "loading course data...",
			success: "Courses loaded successfully",
			error: "Failed to get the courses"
		});
		return (await res).data.courses
	} catch (error) {
		toast.error(error?.response?.data?.message)
	}
}) 

const courseSlice = createSlice({
	name:"course",
	initialState,
	reducers: {

	},
	extraReducers :(builder) => {
		builder
			.addCase(getAllCourses.fulfilled, (state, action) => {
				if(action.payload) {
					state.courseData = [...action.payload];
				}
			})
	}

})

export default courseSlice.reducer;
