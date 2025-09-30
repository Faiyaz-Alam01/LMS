import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import HomeLayouts from '../../Layouts/HomeLayouts';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { addCourseLectures } from '../../Redux/Slices/LectureSlice.js';

const AddLecture = () => {

	const {state: courseDetails} = useLocation();	
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if(!courseDetails){
			navigate('/course')
		}
	},[courseDetails])

	const[userInput, setUserInput] = useState({
		id: courseDetails?._id,
		lecture: undefined,
		title: "",
		description: "",
		videoSrc: ""
	}) 

	function handleInputChange (e) {
		const{name, value} = e.target
		setUserInput({
			...userInput,
			[name]: value
		})
	}

	function handleVideo(e) {
		const video = e.target.files[0]
		const source = window.URL.createObjectURL(video)
		setUserInput({
			...userInput,
			lecture: video,
			videoSrc: source
		})
	}

	async function onFormSubmit(e) {
		e.preventDefault();

		if(!userInput.lecture || !userInput.title || !userInput.description){
			toast.error("All fields are required")
			return
		}
	
		const res = await dispatch(addCourseLectures(userInput))
		console.log(res);
		if(res?.payload?.success) {
			navigate(-1)
			setUserInput({
				id: courseDetails?._id,
				lecture: undefined,
				title: "",
				description: "",
				videoSrc: ""
			})
		}
	}

	return (
		<HomeLayouts>
			<div className='min-h-[90vh] text-white flex flex-col justify-center items-center gap-10 mx-16'>
				<div className='flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-md rounded-md'>
					<header className='flex items-center justify-center relative'>
						<button 
							onClick={() => navigate(-1)}
							className='text-xl absolute top-0 left-2 text-green-500'
						>
							<AiOutlineArrowLeft />
						</button>
						<h1 className='text-2xl text-yellow-500 font-bold '>
							Add new lecture
						</h1>
					</header>
					<form 
						onSubmit={onFormSubmit}
						className='px-4 space-y-3'
					>
						<div className='flex flex-col gap-1 mt-1'>
							<label htmlFor="title">Title </label>
							<input 
								type="text"
								name="title" 
								id="title"
								placeholder='enter the title of lecture'
								onChange={handleInputChange}
								value={userInput.title}
								className='border bg-transparent px-2 py-1' 
							/>
						</div>
						<div className='flex flex-col gap-1 '>
							<label htmlFor="description">Description </label>
							<textarea 
								type='text'
								name="description" 
								id="description"
								placeholder='enter the Description of lecture'
								onChange={handleInputChange}
								value={userInput.description}
								className='border bg-transparent px-2 h-24 py-1 resize-none overflow-y-scroll' 
							/>
						</div>
						{userInput.videoSrc ? (
							<video
								muted
								src={userInput?.videoSrc}
								controls
								disablePictureInPicture
								controlsList='nodownload'
								className='object-fill rounded-tl-lg rounded-tr-lg w-full'
							>

							</video>
						):(
							<div className='h-48 my-5 border flex items-center justify-center cursor-pointer' >
								<label htmlFor="lecture" className='font-semibold text-xl cursor-pointer'>Choose your video</label>
								<input 
									type="file" 
									className='hidden ' 
									id='lecture' 
									name='lecture' 
									onChange={handleVideo} 
									accept='video/mp4 video/x-mp4 '
								/>
							</div>
						)}

						<button
							type='submit'
							className='btn btn-primary py-1 font-semibold text-xl w-full mb-2'
						>
							Add new lecture
						</button>
					</form>
				</div>
			</div>
		</HomeLayouts>
	)
}

export default AddLecture
