import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {

	const navigate = useNavigate();

  return (
	<div className='h-screen w-full flex justify-center items-center flex-col bg-[#1A2238]'>
	  <h1 className='text-9xl font-extrabold text-white tracking-widest'>
		404
	  </h1>
	  <div className='bg-black text-white text-sm rounded px-2 top-1/2 absolute rotate-12'>
		Page not fount ...
	  </div>

	  <button className=''>
		<a className='relative inline-block text-sm font-medium text-red-500 group active:text-yellow-500 focus:outline-none focus:ring '>
			<span onClick={() => navigate('/')} className='relative block px-8  py-3 bg-[#1A2238] border border-current'>
				Go Back
			</span>
		</a>
	  </button>
	</div>
  )
}

export default NotFound
