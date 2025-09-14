import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { updateCourse } from '../../Redux/Slices/CourseSlice';
import HomeLayouts from '../../Layouts/HomeLayouts';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { getUserData } from '../../Redux/Slices/AuthSlice';

const EditCourse = () => {

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {state} = useLocation();
	console.log(state?._id);
	
	const courseId = state?._id
	const [userInput, setUserInput] = useState({
		title: state.title,
		description:state.description,
		category: state.category,
		createdBy: state.createdBy,
		avatar:state.avatar,
	})

	function handleImageUpload(e){
		e.preventDefault();
		const uploadImage = e.target.files[0];
		if(uploadImage){
			const fileReader = new FileReader();
			fileReader.readAsDataURL(uploadImage)
			fileReader.addEventListener("load", function () {
				setUserInput({
					...userInput,
					avatar: uploadImage,
				})
			})
		}
		
	}

	function handleUserInput (e) {
		e.preventDefault();
		const {name, value} = e.target;
		setUserInput({
			...userInput,
			[name]: value
		})
	}

	async function onFormSubmit(e) {
		e.preventDefault();
		if(!userInput.title || !userInput.description || !userInput.category || !userInput.createdBy || !userInput.avatar){
			toast.error("All fields are required")
			return 
		}

		const formData = new FormData();
		formData.append("title", userInput?.title);
		formData.append("description", userInput?.description);
		formData.append("category", userInput?.category);
		formData.append("createdBy", userInput?.createdBy);
		formData.append("avatar", userInput?.avatar);


		const response = dispatch(updateCourse(courseId, formData));
		await dispatch(getUserData());
		if(response.success){
			navigate('/courses');
			setUserInput({
				title: "",
				description:"",
				category: "",
				createdBy: "",
				avatar:"",
			})
		}
	}
	return (
		<HomeLayouts>
			<div className='flex justify-center items-center h-screen'>
				<form
					noValidate
					onSubmit={onFormSubmit}
					className='flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative'
				>
					<Link to={-1} className='flex items-center gap-2  hover:text-blue-600'>
						<AiOutlineArrowLeft />
						<span>Back</span>
					</Link>

					<h1 className='text-center text-2xl font-bold'>
						Edit Course
					</h1>

					<main className='grid grid-cols-2 gap-x-10'>
						<div className='gap-y-6'>
							<div>
								<label htmlFor="image_uploads" className='cursor-pointer'>
									{state ? (
										<img 
											src={userInput.avatar} 
											className='w-full h-44 m-auto border'
										/>
									): (
										<div className='w-full h-44 flex justify-center items-center border'>
											<h1>Upload your course avatar</h1>
										</div>
									)}
								</label>
								<input 
									className='hidden'
									type="file" 
									name="image_uploads" 
									id="image_uploads" 
									accept='.jpg, .png, .jpeg'
									onChange={handleImageUpload}
								/>
							</div>

							<div className='flex flex-col gap-1'>
									<label htmlFor="title" className='text-lg font-semibold '>
										Course Title
									</label>
									<input 
										type="text" 
										name="title" 
										id="title" 
										required
										placeholder='Enter course title'
										className='border px-2 bg-transparent py-1'
										value={userInput.title}
										onChange={handleUserInput}
									/>
							</div>
						</div>
						<div className='flex flex-col gap-1'>
							<div className='flex flex-col gap-1'>
								<label htmlFor="createdBy" className='text-lg font-semibold '>
									Course Instructor
								</label>
								<input 
									type="text" 
									name="createdBy" 
									id="createdBy" 
									required
									placeholder='Enter course instructor'
									className='border px-2 bg-transparent py-1'
									value={userInput.createdBy}
									onChange={handleUserInput}
								/>
							</div>

							<div className='flex flex-col gap-1'>
								<label htmlFor="category" className='text-lg font-semibold '>
									Course Category
								</label>
								<select
									name="category"
									id="category"
									required
									className='border px-2 bg-neutral-900 py-1'
									value={userInput.category}
									onChange={handleUserInput}
								>
									<option value="">Select course category</option>
									<option value="Web Development">Web Development</option>
									<option value="Data Science">Data Science</option>
									<option value="AI">AI</option>
									<option value="Programming">Programming</option>
								</select>
							</div>

							<div className='flex flex-col gap-1'>
								<label htmlFor="description" className='text-lg font-semibold '>
									Course description
								</label>
								<textarea
									type="text" 
									name="description" 
									id="description" 
									required
									placeholder='Enter course description'
									className='border px-2 h-24 overflow-y-scroll bg-transparent resize-none py-1'
									value={userInput.description}
									onChange={handleUserInput}
								/>
							</div>
						</div>
					</main>

					<button 
						type='submit'
						className='w-full bg-yellow-600 hover:bg-yellow-500 py-1 rounded-sm text-lg font-semibold transition-all ease-in-out duration-200'
					>
						Submit
					</button>

				</form>
			</div>
		</HomeLayouts>
	)
}

export default EditCourse
