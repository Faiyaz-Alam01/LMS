import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstance"
import { data } from "react-router-dom"
import { createSlice, createAsyncThunk }  from "@reduxjs/toolkit"

const initialState = {
	key:'',
	subscription_id:"",
	isPaymentVerified : false,
	allPayments:{},
	monthlySaleRecord: {},
	finalMonths: {}
}

export const getRazorPayId = createAsyncThunk("/razorpay/getid", async() => {
	try {
		const response = await axiosInstance.get('/payments/razorpay-key');
		return response.data;
	} catch (error) {
		toast.error(error.response?.data?.message)
	}
})

export const purchageCourseBundle = createAsyncThunk("/purchageCourse", async() => {
	try {
		const response = await axiosInstance.post('/payments/subscribe');		
		return response.data;
	} catch (error) {
		toast.error(error.response?.data?.message )
	}
})

export const verifyUserPayment = createAsyncThunk("/payments/verify", async(data) => {
	try {
		const response = await axiosInstance.post('/payments/verify', {
			razorpay_payment_id: data.razorpay_payment_id,
			razorpay_subscription_id: data.razorpay_subscription_id,
			razorpay_signature: data.razorpay_signature
		});
		return response.data;
	} catch (error) {
		toast.error(error?.response?.data?.message)
	}
})

export const getPaymentRecord = createAsyncThunk("/payments/record", async() => {
	try {
		const response = axiosInstance.get('/payments?count=10');
		toast.promise(response,{
			loading:"Getting the payment records",
			success: (data)=> {
				return data?.message
			},
			error: "Failed to get payment records",
		})
		return (await response).data;
	} catch (error) {
		toast.error("Operation Failed")
	}
})

export const canclecourseBundle = createAsyncThunk("/payments/cancel", async() => {
	try {
		const response = axiosInstance.post('/payments/unSubscribe');
		
		toast.promise(response,{
			loading:"Unsubscribing the bundle",
			success: (res)=> {
				return res.data?.message || "Cancellation completed"
			},
			error: "Failed to Unsubscribe"
		});
		return (await response).data;
	} catch (error) {
		toast.error(error.response?.data?.message)
	}
})

const razorpaySlice = createSlice({
	name: "razorpay",
	initialState,
	reducers: {},
	extraReducers: ( builder ) =>{
		builder
		.addCase(getRazorPayId.fulfilled, (state, action) => {
			state.key = action?.payload?.data?.key;
		})
		.addCase(purchageCourseBundle.fulfilled , (state, action) => {
			state.subscription_id = action?.payload?.subscription_id
		})
		.addCase(verifyUserPayment.fulfilled , (state, action) => {
			toast.success(action?.payload?.message)
			state.isPaymentVerified = action?.payload?.success;
		})
		.addCase(verifyUserPayment.rejected , (state, action) => {
			toast.success(action?.payload?.message)
			state.isPaymentVerified = action?.payload?.success;
		})
		.addCase(getPaymentRecord.fulfilled , (state, action) => {			
			state.allPayments = action?.payload?.data?.allPayments;
			state.monthlySaleRecord = action?.payload?.monthlySaleRecord;
			state.finalMonths = action?.payload?.finalMonths
		})

	}
})

export default razorpaySlice.reducer