import React, { useState } from 'react'
import HomeLayouts from '../Layouts/HomeLayouts'
import toast from 'react-hot-toast';
import axiosInstance from '../Helpers/axiosInstance';

const Contact = () => {

	const [userInput, setUserInput] = useState({
		name:'',
		email:"",
		message:""
	})

	function handleInputChange (e) {
		const{name, value} = e.target;
		// console.log(name, value)
		setUserInput({
			...userInput,
			[name]: value
		})
	}

	async function OnFormSubmit (e) {
		e.preventDefault();
		if(!userInput.name || !userInput.email || !userInput.message){
			toast.error("All fields are required")
		}

		// checking email
		if(userInput.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
			toast.error("Invalid Email id")
			return
		}

		if(userInput.message.length < 5) {
			toast.error("message should be atleast of 5 character")
			return
		}

		try {
			const response =await axiosInstance.post('/contact/user', userInput)
			const data = response.data;
						
			if(data.success){
				toast.success("Message sent successfully!")
				setUserInput({
					name:'',
					email:"",
					message:""
				})
			}
		} catch (error) {
			toast.error("operation failed")
		}
	}

	return (
		<HomeLayouts>
			<div className='flex items-center justify-center h-screen '>
				<form 
					noValidate //remove html validation
					onSubmit={OnFormSubmit}
					className='flex flex-col space-y-2 items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-md'>
					<h1 className='text-3xl font-semibold'>
						Contact Form
					</h1>

					<div className='flex flex-col w-full gap-1'>
						<label htmlFor="name" className='text-xl font-semibold'>
							Name
						</label>
						<input 
							className='border px-2 py-1 bg-transparent rounded-sm'
							type="text"
							placeholder='Enter your name'
							id='name'
							name='name'
							onChange={handleInputChange}
							value={userInput.name}
						/>
					</div>
					<div className='flex flex-col w-full gap-1'>
						<label htmlFor="email" className='text-xl font-semibold'>
							Email
						</label>
						<input 
							className='border px-2 py-1 bg-transparent rounded-sm'
							type="email"
							placeholder='Enter your email'
							id='email'
							name='email'
							onChange={handleInputChange}
							value={userInput.email}
						/>
					</div>
					<div className='flex flex-col w-full gap-1'>
						<label htmlFor="message" className='text-xl font-semibold'>
							Message
						</label>
						<textarea 
							className='border px-2 py-1 bg-transparent resize-none rounded-sm h-30'
							placeholder='Enter your message'
							id='message'
							name='message'
							onChange={handleInputChange}
							value={userInput.message}
						/>
					</div>

					<button 
						className='w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'
						type='submit'
					>
						Submit
					</button>
				</form>
			</div>
		</HomeLayouts>
	)
}

export default Contact
