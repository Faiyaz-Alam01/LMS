import { useState } from 'react'
import HomeLayouts from '../Layouts/HomeLayouts'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axiosInstance from '../Helpers/axiosInstance'

const ForgotPassword = () => {

	const navigate = useNavigate()  


	const [loginData, setloginData] = useState({
		email:"",
	})

	function handleUserInput(e) {
		const {name, value} =e.target;
		setloginData({
			...loginData,
			[name]: value
		}) 
	}


	async function onLogin(e) {
		e.preventDefault();
		if(!loginData.email ) {
			toast.error("Please fill all the details");
			return
		}

		//checking email
		if(!loginData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
			toast.error("Invalid Email id")
			return
		}
		//checking password
		// if(!loginData.password.match(/^[a-zA-Z0-9!@#$%^&*]{6,16}$/)) {
		// 	toast.error("Password should be 6-16 character long with atleast a number and special character")
		// 	return
		// }


		try {
			const res = await axiosInstance.post("/user/forget-password", loginData)
			const data = res.data;		
			if(data.success){	
				toast.success("Password reset link send successfully on your gmail account")
				setloginData({email:""});
				navigate('/login')
			}


		} catch (error) {
  			toast.error(error?.response?.data?.message || error.message || "Something went wrong");
		}
	}

	return (
		<HomeLayouts>
			<div className='h-screen flex items-center justify-center'>
				<form noValidate onSubmit={onLogin} className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]'>
					<h1 className='text-center text-2xl font-bold'>Forget Password</h1>

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
							value={loginData.email}
						/>
					</div>
					
					{/* <div className='flex flex-col gap-1'>
						<label htmlFor="password" className='font-semibold'>New Password</label>
						<input 
							className='bg-transparent px-2 py-1 border'
							type="password" 
							name="password" 
							id="password" 
							placeholder='Enter your new password'
							required
							onChange={handleUserInput}
							value={loginData.password}
						/>
					</div> */}

					<button type='submit' className='mt-2 font-semibold bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-200 rounded-sm py-2 text-lg'>
						Submit
					</button>

					<p className="text-center"> 
						<Link to={'/login'} className='pl-1 text-blue-500 hover:text-blue-600'>Back to login</Link>
					</p>

				</form>
			</div>
		</HomeLayouts>
  )
}

export default ForgotPassword

