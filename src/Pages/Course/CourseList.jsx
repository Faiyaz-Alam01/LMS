import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses } from '../../Redux/Slices/CourseSlice';
import HomeLayouts from '../../Layouts/HomeLayouts';
import CourseCard from '../../Components/CourseCard';
import { IoMdArrowRoundBack } from "react-icons/io";
import { Navigate, useNavigate } from 'react-router-dom';
import BackArrow from '../../Components/BackArrow';


const CourseList = () => {

	const dispatch = useDispatch();
	
	const {courseData} = useSelector((state) => state.course)
	console.log(courseData);
	

	// async function loadCourses (){
	// 	try {
	// 		const res = await axiosInstance.get('/course/getAllCourses')
	// 		const data = res.data
	// 		if(!data.success){
	// 			toast.error("Failed to get the courses")
	// 			return
	// 		}
	// 		setCourse(data);

	// 	} catch (error) {
	// 		toast.error(error?.response?.data?.message)
	// 	}
	// }

	useEffect(()=> {
		dispatch(getAllCourses())
	},[dispatch])

	return (
		<HomeLayouts className='relative'>
			<BackArrow props={'/'}/>
			<div className='min-h-[90vh] pt-12 pl-20 text-white'>
				<h1 className='text-center text-3xl font-semibold m-5' >
					Explore the courses made by 
					<span className='font-bold text-yellow-500 pl-2'>
						Industry expert
					</span>
				</h1>

				{courseData && courseData?.length > 0 ? (
					<div className='mt-20 mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 p-10'>
					{courseData.map((course, index) => (
						<CourseCard key={index} props={course} />
					))}
					</div>
				) : (
					<p className='text-center text-white'>No courses available</p>
				)}

			</div>
		</HomeLayouts>
	)
}

export default CourseList
