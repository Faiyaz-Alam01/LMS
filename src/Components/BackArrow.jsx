import React from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

	
const BackArrow = ({props}) => {
	console.log(props);
	

	const navigate = useNavigate();

	return (
		<div className='absolute top-4 right-4 border px-2 py-1 cursor-pointer hover:bg-blue-500 flex items-center gap-0.5 rounded-sm' onClick={() => navigate(props)}>
			<IoMdArrowRoundBack />
			<span className='font-medium'>Back</span>
		</div>
	)
}

export default BackArrow
