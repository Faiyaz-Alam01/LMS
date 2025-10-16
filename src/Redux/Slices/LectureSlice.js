import { createAsyncThunk } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance"
import toast from "react-hot-toast"

const initialState = {
	lectures:[]
}

export const addCourseLectures = createAsyncThunk('/course/lecture/add',async(userData) =>{
	try {
		const formData = new FormData();
		formData.append("lecture", userData.lecture);
		formData.append("title", userData.title);
		formData.append("description", userData.description);
		
		const response = axiosInstance.post(`/course/addLecture/${userData.id}`, formData)
		toast.promise(response, {
			loading: "adding course lecture",
			success: "Lectures added successfully",
			error:"failed to add the lectures"
		});
		return (await response).data;
	} catch (error) {
		console.log(error);
		toast.error(error?.response?.data?.message || "failed add lecture")
	}
})

export const getCourseLectures = createAsyncThunk('/course/lecture/get',async(cid) =>{  //course id	
	try {
		const response = axiosInstance.get(`/course/get-lectures/${cid}`)
		toast.promise(response, {
			loading: "fatching course lecture",
			success: "Lectures fetched successfully",
			error:"failed to load the lectures"
		});
		return (await response).data;
	} catch (error) {
		toast.error(error?.response?.data?.message || "Lecture Not found")
		console.log(error);
		
	}
})


export const deleteCourseLectures = createAsyncThunk('/course/lecture/delete',async(data) =>{
	console.log(data);
	
	try {
		const response = axiosInstance.delete(`/course/deleteLecture/${data.courseId}/${data.lectureId}`);
		toast.promise(response, {
			loading: "deleting course lecture",
			success: "Lectures deleted successfully",
			error:"failed to delete the lectures"
		});
		return (await response).data;
	} catch (error) {
		console.log(error);
		toast.error(error?.response?.data?.message)
	}
})



const lectureSlice =createSlice({
	name:"lecture",
	initialState,
	reducers:{},
	extraReducers:(builder) =>{
		builder
		.addCase(addCourseLectures.fulfilled,(state, action) => {
			console.log(action);
			state.lectures=action.payload?.message.lectures; 
		})
		.addCase(getCourseLectures.fulfilled, (state, action) => {
			console.log(action.payload);
			
			state.lectures = action.payload;
		});
		
	}
})

export default lectureSlice.reducer 