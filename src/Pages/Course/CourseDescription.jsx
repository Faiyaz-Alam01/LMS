import React, { useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import HomeLayouts from '../../Layouts/HomeLayouts'
import { useSelector } from 'react-redux'

const CourseDescription = () => {

	const navigate = useNavigate();
	const { state } = useLocation()
	const {user} = useSelector((state) => state.auth )
	
	const role = user?.role
		

	useEffect(()=>{
		// console.log(state);
	},[])
	

	return (
		<HomeLayouts>
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
									Total lectures : 6
								</span>
								{/* {"state?.numberoflectures"} */}
							</p>
							<p className='font-semibold'>
								<span className='text-yellow-500 font-bold'>
									Instructor : 
								</span>
								{state?.instructor}
							</p>
						</div>
						{role === 'ADMIN' || user?.subscription?.status === 'ACTIVE' ? (
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
