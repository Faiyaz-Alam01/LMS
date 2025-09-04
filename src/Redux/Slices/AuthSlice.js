import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
import axiosInstance from '../../Helpers/axiosInstance';

const initialState = {
	isLoggedIn : false,
	data: {}
};



export const createAccount = createAsyncThunk("/auth/signup", async(data) => {
	try {
		const res = axiosInstance.post("user/register",data);

		toast.promise(res, {
			loading: "Please wait! Registration in process...",
			success: (data) => {
				return data?.data?.message || "User created successfully";
			},
			error: "Failed to create account"
		});
		return (await res).data;
	} catch (error) {
		toast.error(error?.response?.data?.message || "Registration failed")
	}
})

export const login = createAsyncThunk("/auth/login", async(data) => {
	try {
		const res = axiosInstance.post("user/login",data);
		console.log(res);
		
		toast.promise(res, {
			loading: "Wait! authentication in process...",
			success: (res) => {
				return res?.data?.message;
			},
			error: "failed to login"
		});
		return (await res).data;
	} catch (error) {
		toast.error(error?.response?.data?.message || error.message);
	}
})

export const logout = createAsyncThunk("/auth/logout", async() => {
	try {
		// keep promise for toast
		const res = axiosInstance.post("user/logout");		

		// show toast while promise resolves
		toast.promise(res, {
			loading: "Wait! logout in process...",
			success: (data) => {
				return data?.data?.message;
			},
			error: "failed to logout"
		});
		return (await res).data;
	} catch (error) {
		console.log(error);
		toast.error(error?.response?.data?.message || "Logout failed")
	}
})

export const updateProfile = createAsyncThunk("/user/update/profile", async({userId, formData}) => {
	try {
		const res = axiosInstance.post(`user/update-profile/${userId}`, formData);

		toast.promise(res, {
			loading: "Wait! Profile update in process...",
			success: (data) => {
				return data?.data?.message || "Profile updated successfully";
			},
			error: "failed to update profile"
		});
		return (await res).data;
	} catch (error) {
		toast.error(error?.response?.data?.message)
	}
})

export const getUserData = createAsyncThunk("/user/details", async() => {
	try {
		const res = axiosInstance.get(`user/get-user`);
		return (await res).data;
	} catch (error) {
		toast.error(error?.message)
	}
})

export const userChangePassword = createAsyncThunk('/user/changePassword', async() => {
	try {
		const res = axiosInstance.post("/user/change-password", ChangePasswordData)
		
		toast.promise(res, {
			loading: "Wait! authentication in process...",
			success: (data) => {
				return data?.data?.message;
			},
			error: "failed to login"
		});
		return (await res).data;
		} catch (error) {
			const errMsg = error.response?.data?.message || "Something went wrong"
  			toast.error(errMsg)
		}

})

const authSlice = createSlice ({
	name:"auth",
	initialState,
	reducers:{},
	extraReducers: (builder) => {
		builder
		.addCase(login.fulfilled, (state, action) => {
			state.isLoggedIn = true,
			state.data= action?.payload?.data?.user
		})
		.addCase(logout.fulfilled, (state) => {
			state.data={};
			state.isLoggedIn = false
		})
		.addCase(getUserData.fulfilled, (state, action) => {
			console.log(action.payload);
			state.isLoggedIn = true,
			state.data= action?.payload?.data?.user
		})
	}
})

export default authSlice.reducer