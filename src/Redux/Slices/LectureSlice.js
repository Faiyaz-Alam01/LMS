import { createAsyncThunk } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance"
import toast from "react-hot-toast"

const initialState = {
	lectures: []
}

export const addCourseLectures = createAsyncThunk('/course/lecture/add',async(userData) =>{
	console.log(userData);
	
	try {
		const formData = new FormData();
		formData.append("lecture", userData.lecture);
		formData.append("title", userData.title);
		formData.append("description", userData.description);
		
		const promise = axiosInstance.post(`/course/addLecture/${userData.id}`, formData)
		toast.promise(promise, {
			loading: "adding course lecture",
			success: "Lectures added successfully",
			error:"failed to add the lectures"
		});
		let response = await promise;
		return response.data;
	} catch (error) {
		console.log(error);
		toast.error(error?.response?.data?.message || "failed add lecture")
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


export const deleteCourseLectures = createAsyncThunk('/course/lecture/delete',async(data) =>{
	try {
		const response = axiosInstance.delete(`/courses/${data.courseId}/${data.lectureId}`);
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
			state.lectures.push(action.payload?.lecture); 
			
		})
		
	}
})

export default lectureSlice.reducer 