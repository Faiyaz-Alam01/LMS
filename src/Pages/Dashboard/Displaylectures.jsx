import React, { useEffect, useState } from 'react'
import HomeLayouts from '../../Layouts/HomeLayouts'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCourseLectures, getCourseLectures } from '../../Redux/Slices/LectureSlice.js';

const Displaylectures = () => {

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {state} = useLocation();
	const lectures = state?.lectures
	
	const {role} = useSelector((state) => state?.auth?.data)

	const[currentVideo, setCurrentVideo] = useState(0);
	

	useEffect(()=>{
		if(!state) navigate('/courses');
		dispatch(getCourseLectures(state?._id))
	}, [state, dispatch])

	async function onLectureDelete(courseId, lectureId){	
		const res = await dispatch(deleteCourseLectures({courseId, lectureId}))
		if(res.payload?.success){
			await dispatch(getCourseLectures(courseId))
		}
	}
	
	return (
		<HomeLayouts>
			<div className='flex justify-center items-center min-h-screen gap-10 flex-col py-10 text-2xl'>
				<div className='text-center text-2xl  font-semibold text-yellow-500 '>
					Course Name: {state?.title}
				</div>
				{(lectures && lectures.length > 0) ? 
					(<div className='flex justify-center gap-10 w-full'>
						{/* left section for playing videos and displaying course details to admin  */}
						<div className='space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]'>
							<video 
								src={lectures && lectures[currentVideo]?.videoUrl}
								className="object-fill rounded-tl-lg rounded-tr-lg w-full"
								controls
								disablePictureInPicture
								muted
								controlsList='nodownload'
							>
							</video>
							<div>
								<h1>
									<span className='text-yellow-500 '>
										Title: {" "}
									</span>
									{lectures && lectures[currentVideo]?.title || "This is my lecture" }

								</h1>
								<p>
									<span className='text-yellow-500 line-clamp-4'>
										Description: {" "}
									</span>
									{lectures && lectures[currentVideo]?.description}
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, sunt?
								</p>
							</div>
						</div>

						{/* right section for displaying list of video */}
						<ul className='w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4'>
							<li className='font-semibold text-xl text-yellow-500 flex justify-between items-center'>
								<p>Lectures List</p>
								{role === 'ADMIN' &&(
									<button onClick={() => navigate('/course/addlecture', {state})} className='bg-blue-500 hover:bg-blue-600 cursor-pointer text-white px-2 py-1  rounded-md font-semibold text-sm'>
										Add new lecture
									</button>
								)}
							</li>
							{lectures && 
								lectures.map((lecture, index) => {
									return (
										<li key={lecture._id} className='space-y-2'> 
											<p className='cursor-pointer' onClick={() => setCurrentVideo(index)}>
												<span>
													{" "} Lecture{index+1} : {" "}
												</span>
												{lecture?.title}
											</p>
											{role === 'ADMIN' &&(
												<button onClick={() => onLectureDelete(state._id,lecture._id)} className='bg-accent px-2 py-1  rounded-md font-semibold text-sm'>
													Delete lecture
												</button>
											)}
										</li>
									)
								})
							}
						</ul>
						

					</div>
					):(
					role && role === 'ADMIN' &&(
						<button onClick={() => navigate('/course/addlecture', {state: {...state}})} className='btn-primary px-4 py-2 font-bold bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-md transition-all ease-in-out duration-200 text-sm'>
							Add new lecture
						</button>
					)
				)}
			</div>
		</HomeLayouts>
	)
}

export default Displaylectures
