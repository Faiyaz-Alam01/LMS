import React, { useState } from 'react'
import HomeLayouts from '../Layouts/HomeLayouts'
import { BsPersonCircle } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import axiosInstance from '../Helpers/axiosInstance'
// import { createAccount } from '../Redux/Slices/AuthSlice'

const SignUp = () => {

	const [previewImage, setPreviewImage] = useState("")
	const dispatch = useDispatch()
	const navigate = useNavigate()  

	const [signupData, setSignUpData] = useState({
		fullName:"",
		email:"",
		password:"",
		avatar: ""
	})

	function handleUserInput(e) {
		const {name, value} =e.target;
		setSignUpData({
			...signupData,
			[name]: value
		}) 
	}

	function getImage (event) {
		event.preventDefault();
		//getting the emage
		const uploadImage = event.target.files[0];
		
		if(uploadImage) {
			setSignUpData({
				...signupData,
				avatar: uploadImage
			});

			const fileReader = new FileReader();
			fileReader.readAsDataURL(uploadImage);
			fileReader.addEventListener('load', function () {
				console.log(this.result);
				
				setPreviewImage(this.result);
			})
		}

	}

	async function createNewAccount(e) {
		e.preventDefault();
		if(!signupData.email || !signupData.password ||!signupData.fullName || !signupData.avatar) {
			toast.error("Please fill all the details");
			return
		}

		//checking name field length
		if(signupData.fullName.length < 5) {
			toast.error("Name should be atleast of 5 character")
			return
		}
		//checking email
		if(!signupData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
			toast.error("Invalid Email id")
			return
		}
		// //checking password
		if(!signupData.password.match(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/)) {
			toast.error("Password should be 6-16 character long with atleast a number and special character")
			return
		}

		const formData = new FormData();
		formData.append("fullName", signupData.fullName)
		formData.append("email", signupData.email)
		formData.append("password", signupData.password)
		formData.append("avatar", signupData.avatar)

		console.log(formData);
		//dispatch create account action
		try {
			
			const res = await toast.promise( axiosInstance.post("/user/register",formData),
				{
					loading: "Wait! creating your account",
					success: (res) => res.data?.message || "register successful",
					error: "creating failed",
				}
			)
			
			const data = res.data;		
			console.log(data);
			
			if(data.success){
				
				dispatch(setUser(data.data.user))
				navigate('/')
				setSignUpData({
					fullName:"",
					email:"",
					password:"",
					avatar: ""
				});
				setPreviewImage('')
			}

		} catch (error) {
  			toast.error(error.response?.data?.message || error.message || "Something went wrong");
		}

	}

	return (
		<HomeLayouts>
			<div className='h-screen flex items-center justify-center'>
				<form noValidate onSubmit={createNewAccount} className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]'>
					<h1 className='text-center text-2xl font-bold'>Registration Page</h1>

					<label htmlFor="image_uploads" className='cursor-pointer'>
						{previewImage ? (
							<img src={previewImage} alt="" className='size-20 rounded-full m-auto'/>
						) : (
							<BsPersonCircle className='size-20 rounded-full m-auto'/>
						)
						}
					</label>
					<input
						onChange={getImage} 
						className='hidden'
						type='file'
						id='image_uploads'
						aceept=".jpg, .jpeg, .png, .svg"
						name='image_uploads'
					/>

					<div className='flex flex-col gap-1'>
						<label htmlFor="fullName" className='font-semibold'>Name</label>
						<input 
							className='bg-transparent px-2 py-1 border'
							type="text" 
							name="fullName" 
							id="fullName" 
							placeholder='Enter your name'
							required
							onChange={handleUserInput}
							value={signupData.fullName}
						/>
					</div>

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
							value={signupData.email}
						/>
					</div>
					
					<div className='flex flex-col gap-1'>
						<label htmlFor="password" className='font-semibold'>Password</label>
						<input 
							className='bg-transparent px-2 py-1 border'
							type="password" 
							name="password" 
							id="password" 
							placeholder='Enter your password'
							required
							onChange={handleUserInput}
							value={signupData.password}
						/>
					</div>

					<button type='submit' className='mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-200 rounded-sm py-2 text-lg'>
						Create an account
					</button>

					<p className="text-center">
						Already have an account ? 
						<Link to={'/login'} className='pl-1 text-blue-500 hover:text-blue-600'>Login</Link>
					</p>
				</form>
			</div>
		</HomeLayouts>
  )
}

export default SignUp
