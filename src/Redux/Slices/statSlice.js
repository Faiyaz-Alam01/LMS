import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
	allUserCount:0,
	subscribedCount:0
};

export const getStatsData = createAsyncThunk('/stats/get', async()=> {
	try {
		const response = axiosInstance.get("/admin/stats/users")
		toast.promise(response, {
			loading: "Getting the stats...",
			success: (data) => {
				return data?.data?.message
			},
			error: "Failed to load data stats"
		});
		return (await response).data;
		
	} catch (error) {
		toast.error(error?.response?.data?.message)
	}
})


const statSlice = createSlice({
	name:"stat",
	initialState,
	reducer:{},
	extraReducers: (builder) => {
		builder.addCase(getStatsData.fulfilled, (state, action) => {
			console.log(action);
			state.allUserCount = action?.payload?.data?.allUserCount;
			state.subscribedCount = action?.payload?.data?.subscribedCount
		})
	}
})

export default statSlice.reducer;