import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../Helpers/axiosInstance';

const ResetPassword = () => {

	const{token} = useParams();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		password:"",
		confirmPassword:"",
	})

	const handleChange= (e) => {
		const {name, value} = e.target;
		setFormData({
			...formData,
			[name]: value
		}) 
	}
		
	async function handleSubmit (e) {
		e.preventDefault();
		if(!formData.password || !formData.confirmPassword){
			toast.error("Please fill all the details")
			return
		}

		if(!formData.password.match(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/)) {
			toast.error("Password must be 6–16 characters and only include letters, numbers, and !@#$%^&*")
			return
		}

		if(formData.password !== formData.confirmPassword){
			toast.error("Mismatch password ")
			return
		}

		try {
			const res = await axiosInstance.post(`/user/reset-password/${token}`,{
				password : formData.password
			})

			const data = res.data
			if(data.success){
				toast.success(data.message || "Password reset successfully!");
      			navigate("/login"); 
			}
			
		} catch (error) {
			toast.error( error?.response?.data?.message || "Something went wrong")
		}
	}



	return (
		<div className='flex justify-center items-center min-h-screen'>
			<form 
				onSubmit={handleSubmit}
				className='w-md flex flex-col justify-center gap-3 rounded-lg p-4 text-white shadow-[0_0_10px_black]'>
				<h2 className='text-center text-2xl font-bold '>Reset Password</h2>
				<div className='flex flex-col gap-1'>
					<label htmlFor="password">Password</label>
					<input 
						type="password" 
						name="password" 
						id="password" 
						placeholder='New password'
						className='bg-transparent border px-2 py-1'
						onChange={handleChange}
						value={formData.password}
					/>
				</div>
				<div className='flex flex-col gap-2'>
					<label htmlFor="confirmPassword">Confirm Password</label>
					<input 
						type="password" 
						name="confirmPassword" 
						id="confirmPassword" 
						placeholder='Confirm password'
						className='bg-transparent border px-2 py-1'
						onChange={handleChange}
						value={formData.confirmPassword}
					/>
				</div>
				<button type='submit' className='text-center font-medium mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-200 rounded-sm py-2 text-lg'>Submit</button>
			</form>
		</div>
	)
}

export default ResetPassword
