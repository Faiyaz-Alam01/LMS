import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstance"

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

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

	}

})

export default courseSlice.reducer;
