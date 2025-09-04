import React from 'react'
import {  useNavigate } from 'react-router-dom'

const Denied = () => {
	const navigate = useNavigate();
	return (
		<main className='h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]'>
			<h1 className='text-9xl font-extrabold text-white tracking-widest'>
				403
			</h1>
			<div className='bg-black text-white px-2 rounded rotate-12 absolute '>
				Access denied
			</div>
			<button 
				onClick={() => {
					if (window.history.state && window.history.state.idx > 0) {
						navigate(-1); // pichla page hai to uspe le jao
					} else {
						navigate("/"); // warna home pe le jao
					}
				}}
			 	className='mt-5'>
				<span className= 'relative block hover:bg-blue-950 px-8 py-3 border border-current'>
					Go Back
				</span>
			</button>
		</main>
	)
}

export default Denied
