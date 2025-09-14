import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstance"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
	courseData: []
}

export const getAllCourses = createAsyncThunk("/course/get", async() => {
	try {
		const res = axiosInstance.get("/course/getAllCourses");
		toast.promise(res, {
			loading: "loading course data...",
			success: "Courses loaded successfully",
			error: "Failed to get the courses"
		});
		return (await res).data.data
	} catch (error) {
		toast.error(error?.response?.data?.message)
	}
}) 

export const createNewCourse = createAsyncThunk("/course/create", async(data) => {
	try {
		const formData = new FormData();
		formData.append("title", data?.title);
		formData.append("description", data?.description);
		formData.append("category", data?.category);
		formData.append("createdBy", data?.createdBy);
		formData.append("avatar", data?.avatar);

		const res = axiosInstance.post("/course/create" , formData);

		toast.promise(res, {
			loading: "loading.. create course...",
			success:(res)=>{
				return res?.data?.message || "Courses created successfully";
			},
			error: "Failed to create the courses"
		});
		return (await res).data
	} catch (error) {
		toast.error(error?.response?.data?.message || error.message)
	}
}) 

export const deleteCourse = createAsyncThunk("/course/delete", async(id) => {
	try {
		const res = axiosInstance.delete(`/course/${id}`);
		toast.promise(res, {
			loading: "deleting course data...",
			success: "Courses deleted successfully",
			error: "Failed to delete the courses"
		});
		return (await res).data.data
	} catch (error) {
		toast.error(error?.response?.data?.message)
	}
}) 

export const updateCourse = createAsyncThunk("/course/update", async(courseId,formData) => {
	try {

		const response = axiosInstance.put(`/course/update/${courseId}`, formData);
		toast.promise(response, {
			loading:"Updating course data",
			success:(res) => {
				return res.data?.message || "Course updated successfully"
			},
			error:"Failed to update the course"
		})

		const data = await response
		return data;
	} catch (error) {
		toast.error(error?.response?.data?.message || "Failed to update course")	
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
			.addCase(deleteCourse.fulfilled, (state, action) => {
				state.courseData = [];
			})
	}

})

export default courseSlice.reducer;
