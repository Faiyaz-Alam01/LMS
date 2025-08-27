import React, { useEffect } from 'react'
import HomeLayouts from '../../Layouts/HomeLayouts'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';

const Displaylectures = () => {

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {state} = useLocation();

	useEffect(()=>{
		console.log(state);
		
	}, [])
	
	return (
		<HomeLayouts>
			<div className='flex justify-center items-center min-h-screen '>
				<div className='border flex gap-2 w-md h-auto p-4'>
					<div>
						<video src="C:\Users\ASUS\Downloads\videoplayback(1).mp4"></video>
						<h1>Video</h1>
					</div>
					<div>
						courese Details
						<ul>
							<li>Hello</li>
						</ul>
					</div>
				</div>
			</div>
		</HomeLayouts>
	)
}

export default Displaylectures
