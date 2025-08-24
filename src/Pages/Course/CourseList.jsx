import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses } from '../../Redux/Slices/CourseSlice';
import HomeLayouts from '../../Layouts/HomeLayouts';
import CourseCard from '../../Components/CourseCard';
import axiosInstance from '../../Helpers/axiosInstance';
import toast from 'react-hot-toast';

const CourseList = () => {

	const dispatch = useDispatch();
	const[course, setCourse] = useState([])
	
	// async function loadCourses(){
	// 	await dispatch(getAllCourses())
	// }

	async function loadCourses (){
		try {
			const res = await axiosInstance.get('/course/getAllCourses')
			const data = res.data
			if(!data.success){
				toast.error("Failed to get the courses")
				return
			}
			setCourse(data);

		} catch (error) {
			toast.error(error?.response?.data?.message)
		}
	}

	useEffect(()=> {
		loadCourses();
	},[])

	return (
		<HomeLayouts>
			<div className='min-h-[90vh] pt-12 pl-20 text-white'>
				<h1 className='text-center text-3xl font-semibold m-5' >
					Explore the courses made by 
					<span className='font-bold text-yellow-500 pl-2'>
						Industry expert
					</span>
				</h1>

				{course && course?.data?.length > 0 ? (
					<div className='mt-20 mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 p-10'>
					{course.data.map((course, index) => (
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
