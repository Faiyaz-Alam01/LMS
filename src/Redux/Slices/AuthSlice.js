import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const initialState = {
	// isLoggedIn : localStorage.getItem('isLoggedIn') || false,
	// role: localStorage.getItem('admin') || "",
	// data: {}
	isLoggedIn: false,
	role: "",
	user:null

};



// export const createAccount = createAsyncThunk("/auth/signup", async(data) => {
	
// })

// export const login = createAsyncThunk("/auth/login", async(data) => {
// 	try {
// 		const res = axiosInstance.post("user/login",data);

// 		toast.promise(res, {
// 			loading: "Wait! authentication in process...",
// 			success: (data) => {
// 				return data?.data?.message;
// 			},
// 			error: "failed to login"
// 		});
// 		return (await res).data;
// 	} catch (error) {
// 		toast.error(error?.response?.data?.message)
// 	}
// })

// export const logout = createAsyncThunk("/auth/logout", async() => {
// 	try {
// 		const res = axiosInstance.post("user/logout");

// 		toast.promise(res, {
// 			loading: "Wait! logout in process...",
// 			success: (data) => {
// 				return data?.data?.message;
// 			},
// 			error: "failed to logout"
// 		});
// 		return (await res).data;
// 	} catch (error) {
// 		toast.error(error?.response?.data?.message)
// 	}
// })

// export const updateProfile = createAsyncThunk("/user/update/profile", async(data) => {
// 	try {
// 		const res = axiosInstance.put(`user/update/${data[0]}`, data[1]);

// 		toast.promise(res, {
// 			loading: "Wait! Profile update in process...",
// 			success: (data) => {
// 				return data?.data?.message;
// 			},
// 			error: "failed to update profile"
// 		});
// 		return (await res).data;
// 	} catch (error) {
// 		toast.error(error?.response?.data?.message)
// 	}
// })

// export const getUserData = createAsyncThunk("/user/details", async() => {
// 	try {
// 		const res = axiosInstance.get(`user/me`);
// 		return (await res).data;
// 	} catch (error) {
// 		toast.error(error?.message)
// 	}
// })


const authSlice = createSlice ({
	name:"auth",
	initialState,
	reducers:{
		setUser: (state, action)=> {
			const payload = action.payload
			state.isLoggedIn= true
			state.user = payload
			state.role = 'user'
		},
		removeUser : (state) => {
			state.isLoggedIn= false
			state.user = null
		}
  	},
	// extraReducers: (builder) => {
	// 	builder
	// 	.addCase(login.fulfilled, (state, action) => {
	// 		localStorage.setItem("data", JSON.stringify(action?.payload?.user))
	// 		localStorage.setItem('isLoggedIn', true)
	// 		localStorage.setItem('role', action?.payload?.user?.role)

	// 		state.isLoggedIn = true,
	// 		state.data= action?.payload?.user,
	// 		state.role = action?.payload?.user?.role
	// 	})
	// 	.addCase(logout.fulfilled, (state) => {
	// 		localStorage.clear();
	// 		state.data={};
	// 		state.isLoggedIn = false;
	// 		state.role = ""
	// 	})
	// 	.addCase(getUserData.fulfilled, (state, action) => {
	// 		localStorage.setItem("data", JSON.stringify(action?.payload?.user))
	// 		localStorage.setItem('isLoggedIn', true)
	// 		localStorage.setItem('role', action?.payload?.user?.role)

	// 		state.isLoggedIn = true,
	// 		state.data= action?.payload?.user,
	// 		state.role = action?.payload?.user?.role
	// 	})
	// }
})

export const {setUser, removeUser} = authSlice.actions
export default authSlice.reducer