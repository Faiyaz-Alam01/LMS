import React, { useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import HomeLayouts from '../../Layouts/HomeLayouts'
import { useSelector } from 'react-redux'

const CourseDescription = () => {

	const navigate = useNavigate();
	// const locator = useLocation()
	const { state} = useLocation()
	const { role , data} = useSelector((state) => state.auth)

	useEffect(()=>{
		// console.log(locator);
		
	},[])

	return (
		<HomeLayouts>
			<div className='min-h-screen pt-12 flex flex-col px-20 items-center justify-center text-white'>
				<div className='grid grid-cols-2 gap-10 py-10 relative'>
					<div className='space-y-5'>
						<img 
							className='w-full h-64'
							src={state?.thumbnain?.secure_url} 
							alt="thumbnail" 
						/>
						<div className='flex items-center justify-between text-xl'>
							<p className='font-semibold'>
								<span className='text-yellow-500 font-bold'>
									Total lectures : 
								</span>
								{state?.numberoflectures}
							</p>
							<p className='font-semibold'>
								<span className='text-yellow-500 font-bold'>
									Instructor
								</span>
								{state?.instructor}
							</p>
						</div>
						{role === 'admin' || data.subscription?.status === 'ACTIVE' ? (
								<button className='bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300'>
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
						<h1 className='text-3xl font-bold text-yellow-500 mb-5 text-center'>
							{state?.title}
						</h1>
						<p>
							Course description
						</p>
						<p>{state?.CourseDescription}</p>


					</div>
				</div>
			</div>
		</HomeLayouts>
	)
}

export default CourseDescription
