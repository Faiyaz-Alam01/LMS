import {createSlice} from '@reduxjs/toolkit'

const initialState = {
	isLoggedIn : localStorage.getItem('isLoggedIn') || false,
	role: localStorage.getItem('isLoggedIn') || "",
	data:localStorage.getItem('data') || {}
};

const authSlice = createSlice ({
	name:"auth",
	initialState,
	reducers:{},
})

// export const {} = authSlice.actions
export default authSlice.reducer