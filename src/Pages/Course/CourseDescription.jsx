import React, { useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import HomeLayouts from '../../Layouts/HomeLayouts'
import { useSelector } from 'react-redux'
import BackArrow from '../../Components/BackArrow'

const CourseDescription = () => {

	const navigate = useNavigate();
	const { state } = useLocation()
	const {data} = useSelector((state) => state.auth )
	
	const role = data?.role
		

	useEffect(()=>{
		console.log(state);
	},[])
	

	return (
		<HomeLayouts>
			<BackArrow props = {-1}/>
			<div className='min-h-screen pt-12 flex px-20 items-center justify-center text-white'>
				<div className='flex flex-row p-4 bg-red-400 gap-10 py-10 relative'>
					<div className='space-y-5 '>
						<img 
							className='w-56 h-32'
							src={state?.avatar} 
							alt="thumbnail" 
						/>
						<div className='text-2xl'>
							<p className='font-semibold'>
								<span className='text-yellow-500 font-bold'>
									Total lectures : {state?.numberOfLectures || 0}
								</span>
								{/* {""} */}
							</p>
							<p className='font-semibold'>
								<span className='text-yellow-500 font-bold'>
									Instructor : {state?.createdBy}
								</span>
							</p>
						</div>
						{role === 'ADMIN' || data?.subscription?.status === 'active' ? (
								<button onClick={() => navigate('/course/displaylecture', {state: {...state}})} className='bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300'>
									Watch lectures
								</button>
							) : (
								<button onClick={() => navigate('/checkout')} className='bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300'>
									Subscribe 
								</button> 
							) 
						}
					</div>

					<div className='space-y-2 text-xl '>
						<h1 className='text-3xl font-bold text-yellow-500 mb-5'>
							{state?.title}
						</h1>
						<p>
							Course description
						</p>
							<p>{state?.description}</p>
					</div>
				</div>
			</div>
		</HomeLayouts>
	)
}

export default CourseDescription
