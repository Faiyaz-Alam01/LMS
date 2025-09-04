import React, { useState } from 'react'
import HomeLayouts from '../Layouts/HomeLayouts'
import {  useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import {userChangePassword } from '../Redux/Slices/AuthSlice.js'
import { FaArrowLeft } from "react-icons/fa";


const ChangePassword = () => {

	const navigate = useNavigate()  
	const dispatch = useDispatch()

	const [ChangePasswordData, setChangePasswordData] = useState({
		email:"",
		old_password:"",
		new_password:"",
		confirm_password:"",

	})

	function handleUserInput(e) {
		const {name, value} =e.target;
		setChangePasswordData({
			...ChangePasswordData,
			[name]: value
		}) 
	}


	async function onChangePassword(e) {
		e.preventDefault();
		if(!ChangePasswordData.email || !ChangePasswordData.old_password || !ChangePasswordData.new_password || !ChangePasswordData.confirm_password) {
			toast.error("Please fill all the details");
			return
		}

		//checking email
		if(!ChangePasswordData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
			toast.error("Invalid Email id")
			return
		}
		//checking password
		if(!ChangePasswordData.new_password.match(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/)) {
			toast.error("Password should be 6-16 character long with atleast a number and special character")
			return
		}

		if(ChangePasswordData.new_password !== ChangePasswordData.confirm_password) {
			toast.error("New Password and Confirm Password do not match");
			return;
		}

		await dispatch(userChangePassword())
		toast.success("Changed password successfully ")
		navigate('/login')
		
	}

	return (
		<HomeLayouts>
			<div className='h-screen flex items-center justify-center'>
				<form noValidate onSubmit={onChangePassword} className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]'>
					<h1 className='text-center text-2xl font-bold'>Change Password</h1>

					<div className='flex flex-col gap-1'>
						<label htmlFor="email" className='font-semibold'>Email</label>
						<input 
							className='bg-transparent px-2 py-1 border'
							type="email" 
							name="email" 
							id="email" 
							placeholder='Enter your email'
							required
							onChange={handleUserInput}
							value={ChangePasswordData.email}
						/>
					</div>
					
					<div className='flex flex-col gap-1'>
						<label htmlFor="old_password" className='font-semibold'>Old Password</label>
						<input 
							className='bg-transparent px-2 py-1 border'
							type="password" 
							name="old_password" 
							id="old_password" 
							placeholder='Enter your old password'
							required
							onChange={handleUserInput}
							value={ChangePasswordData.old_password}
						/>
					</div>

					<div className='flex flex-col gap-1'>
						<label htmlFor="new_password" className='font-semibold'>New Password</label>
						<input 
							className='bg-transparent px-2 py-1 border'
							type="password" 
							name="new_password" 
							id="new_password" 
							placeholder='Enter your new password'
							required
							onChange={handleUserInput}
							value={ChangePasswordData.new_password}
						/>
					</div>

					<div className='flex flex-col gap-1'>
						<label htmlFor="confirm_password" className='font-semibold'>Confirm Password</label>
						<input 
							className='bg-transparent px-2 py-1 border'
							type="password" 
							name="confirm_password" 
							id="confirm_password" 
							placeholder='Enter your confirm password'
							required
							onChange={handleUserInput}
							value={ChangePasswordData.confirm_password}
						/>
					</div>

					<button type='submit' className='mt-2 bg-yellow-600 font-semibold hover:bg-yellow-500 transition-all ease-in-out duration-200 rounded-sm py-2 text-lg'>
						Submit
					</button>

					<p 
						className=" justify-center gap-2 cursor-pointer flex items-center text-blue-500 hover:text-blue-600"
						onClick={() => navigate(-1)}   // back functionality
						>
						<FaArrowLeft /> Back to Profile
					</p>

				</form>
			</div>
		</HomeLayouts>
  )
}

export default ChangePassword
