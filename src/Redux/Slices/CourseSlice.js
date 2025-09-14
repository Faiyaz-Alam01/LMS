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

export const getCourseLectures = createAsyncThunk('/course/lecture/get',async(cid) =>{  //course id
	try {
		const response = axiosInstance.get(`/course/${cid}`)
		toast.promise(response, {
			loading: "fatching course lecture",
			success: "Lectures fetched successfully",
			error:"failed to load the lectures"
		});
		return (await response).data;
	} catch (error) {
		toast.error(error?.response?.data?.message || "Lecture Not found")
	}
})

export const addCourseLectures = createAsyncThunk('/course/lecture/add',async(data) =>{
	try {
		const formData = new FormData();
		formData.append("lecture", data.lecture);
		formData.append("title", data.title);
		formData.append("description", data.description);
		
		const response = axiosInstance.post(`/course/addLecture/${data.id}`, formData)
		toast.promise(response, {
			loading: "adding course lecture",
			success: "Lectures added successfully",
			error:"failed to add the lectures"
		});
		const data = await response.data
		console.log(data);
		
		return data
	} catch (error) {
		toast.error(error?.response?.data?.message)
	}
})

export const deleteCourseLectures = createAsyncThunk('/course/lecture/delete',async(data) =>{
	try {

		const response = axiosInstance.delete(`/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`);
		toast.promise(response, {
			loading: "deleting course lecture",
			success: "Lectures deleted successfully",
			error:"failed to delete the lectures"
		});
		return (await response).data;
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
			.addCase(deleteCourse.fulfilled, (state, action) => {
				state.courseData = [];
			})

			.addCase(getCourseLectures.fulfilled, (state, action) => {
				console.log(action.payload);
				state.lectures = action?.payload?.lectures;
			})
			.addCase(addCourseLectures.fulfilled, (state, action) =>{
				console.log(action.payload);
				state.lectures = action?.payload?.course?.lectures;
			})
	}

})

export default courseSlice.reducer;
