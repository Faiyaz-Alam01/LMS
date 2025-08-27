import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const CourseCard = ({props}) => {
	console.log(props);
	
	const navigate = useNavigate();	
	// const {course} = useSelector(state => state.course)

	return (
		<div 
		// { state: course }
			onClick={() => navigate('/course/description', {state: props})}
			className='text-white shadow-lg rounded-lg cursor-pointer group overflow-hidden'>
			<div className='overflow-hidden'>
				<img 
					className='h-48 w-full rounded-tl rounded-tr-lg group-hover:scale=[1,2] transition-all ease-in-out duration-300 '
					src={props?.avatar} 
					alt='course thumbnail'
				/>
				<div className='p-3 space-y-1 text-white  '>
					<h2 className='text-yellow-300 line-clamp-2 text-xl font-bold '>
						{props.title}
					</h2>
					<p className='line-clamp-2'>
						{props.description}
					</p>
					<p className='font-semibold'>
						<span className='text-yello-500 font-bold'>Category : </span>
						{props.category}
					</p>
					<p className='font-semibold'>
						<span className='text-yello-500 font-bold'>Total lectures : </span>
						{props?.numberoflectures}
					</p>
					<p className='font-semibold'>
						<span className='text-yello-500 font-bold'>Instructor : </span>
						{props?.createdBy}
					</p>
				</div>
			</div>
		</div>
	)
}

export default CourseCard
