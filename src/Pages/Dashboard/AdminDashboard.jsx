import React, { useEffect } from 'react'
import HomeLayouts from '../../Layouts/HomeLayouts'
import { Chart as ChartJs , ArcElement, Tooltip, Legend, CategoryScale, LinearScale, Title, BarElement} from 'chart.js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteCourse, getAllCourses } from '../../Redux/Slices/CourseSlice'
import { getStatsData } from '../../Redux/Slices/statSlice'
import { getPaymentRecord } from '../../Redux/Slices/RazorpaySlice.js'
import { Bar, Pie } from 'react-chartjs-2'
import {FaEdit, FaUsers} from 'react-icons/fa'
import { FcSalesPerformance } from "react-icons/fc";
import {GiMoneyStack} from 'react-icons/gi'
import { MdDelete } from "react-icons/md";
import { FaRegCirclePlay } from "react-icons/fa6";
import { BsTrash } from 'react-icons/bs'



 
ChartJs.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, Title, BarElement)

const AdminDashboard = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { allUserCount, subscribedCount}= useSelector((state) => state.stat)

	const {allPayments, monthlySaleRecord} = useSelector((state) => state.razorpay)	
	
	

	const userdata = {
		labels: ["Registered User", "Enrolled User"],
		datasets: [
			{
				label: "User Details ",
				data: [allUserCount, subscribedCount], 
				backgroundColor: ['yellow', "green"],
				borderWidth:1,
				borderColor: ["yellow", "green"]
			}
		]
	}

	const  salesData = {
		labels: ["Jan", "Feb", "Mar", "Apr","May","Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		fontColor: "white",
		datasets: [
			{
				label: "Sales / Month",
				data: monthlySaleRecord,
				backgroundColor:['rgb(255,99,132)'],
				borderColor: ["white"],
				borderWidth: 2
			}
		]
	}

	const myCourses= useSelector((state) => state?.course?.courseData);

	async function onCourseDelete (id) {
		if(window.confirm("Are you sure you want to delete the course ? ")) {
			const res = await dispatch(deleteCourse(id));
			console.log(res);
			if(res?.payload?.success){
				await dispatch(getAllCourses());
			}
		}
	}

	useEffect(() => {
		(
			async () => {
				await dispatch(getAllCourses())
				await dispatch(getStatsData())
				await dispatch(getPaymentRecord())
			}
		)()
	},[])

	return (
		<HomeLayouts>
			<div className='min-h-[90vh] pt-5 flex flex-col  flex-wrap gap-10 text-white'>
				<h1 className='text-center text-5xl font-semibold text-yellow-500'>Admin Dashboard</h1>

				<div className='grid grid-cols-2 gap-5 m-auto mx-10'>
					<div className='flex flex-col justify-center items-center gap-10 p-5 shadow-lg rounded-md'>
						<div className='w-80 h-80'>
							<Pie data = {userdata}/>
						</div>
						<div className='grid grid-cols-2 gap-5'>
							<div className='flex  items-center justify-between p-5 gap-5 rounded-md shadow-md '>
								<div className='flex flex-col items-center'>
									<p className='font-semibold'>Register User</p>
									<h3 className='text-4xl font-bold'>{allUserCount}</h3>
								</div>
								<FaUsers className="text-yellow-500 text-5xl" />
							</div>
							<div className='flex  items-center justify-between p-5 gap-5 rounded-md shadow-md '>
								<div className='flex flex-col items-center'>
									<p className='font-semibold'>Enrolled User</p>
									<h3 className='text-4xl font-bold'>{subscribedCount}</h3>
								</div>
								<FaUsers className="text-green-500 text-5xl" />
							</div>
							
						</div>
					</div>

					{/* show data of sales */}

					<div className='flex flex-col items-center gap-10 p-5 shadow-lg rounded-md'>
						<div className='h-80 w-full relative'>
							<Bar data={salesData} className='absolute bottom-0 h-80 w-full'/>
						</div>

						<div className='grid grid-cols-2 gap-5 '>
							<div className='flex  items-center justify-between p-5 gap-5 rounded-md shadow-md '>
								<div className='flex flex-col items-center'>
									<p className='font-semibold'>Subscription Count</p>
									<h3 className='text-4xl font-bold'>{allPayments?.count}</h3>
								</div>
								<FcSalesPerformance className="text-yellow-500 text-5xl" />
							</div>
							
							<div className='flex  items-center justify-between p-5 gap-5 rounded-md shadow-md '>
								<div className='flex flex-col items-center'>
									<p className='font-semibold'>Total Revenue</p>
									<h3 className='text-4xl font-bold'>{allPayments?.count * 499}</h3> 
								</div>
								<GiMoneyStack className="text-green-500 text-5xl" />
							</div>
						</div>
					</div>
				</div>

				<div className='mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10 mb-10'>
					<div className='flex w-full items-center justify-between '>
						<h1 className='text-center text-3xl font-semibold'>
							Course Overview
						</h1>
						<button
							onClick={() => navigate('/course/create')}
							className='w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-200 rounded py-2 px-2 font-semibold text-lg cursor-pointer'
						>Create new Course</button>
					</div>
					{/* create table and show data in the table */}
					<table className='table overflow-x-scroll '>
						<thead>
							<tr className='text-white'>
								<th>S No</th>
								<th>Course Title</th>
								<th>Course Category</th>
								<th>Instructor</th>
								<th>Total Lectures</th>
								<th>Description</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{myCourses && myCourses.length > 0 ? (
							  	myCourses?.map((course, idx) => (
									<tr key={course?._id}>
										<td>{idx+1}</td>
										<td>{course.title}</td>
										<td>{course.category}</td>
										<td>{course.createdBy}</td>
										<td>{course?.numberOfLectures}</td>

										<td className='mx-w-28 overflow-hidden text-ellipsis whitespace-nowrap'>
											<textarea 
												readOnly
												value={course.description}
												className='w-80 h-auto bg-transparent resize-none p-1'
											>
											</textarea>
										</td>
										<td className='flex items-center gap-4'>
											<button onClick={() => navigate('/course/displaylecture', {state: {...course}})}
												className='bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-200 px-3 text-xl py-1 rounded-md '
											>
												<FaRegCirclePlay className=' cursor-pointer' />
											</button>
											<button onClick={() => onCourseDelete(course?._id)}
												className='bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-200 px-3 text-xl py-1 rounded-md '
											>
												<BsTrash/>
											</button>
											<button onClick={() => navigate('/course/edit', {state: {...course}})}
												className='bg-white text-center hover:scale-110 transition-all text-black ease-in-out duration-200 px-3 text-xl py-1 rounded-md '
											>
												<FaEdit className=' cursor-pointer' />
											</button>
										</td>
									</tr>
								)))
								: (
									 <td colSpan="7" className="text-center text-xl font-semibold">No Courses Available</td>
								)
							}
						</tbody>
					</table>
				</div>
			</div>
		</HomeLayouts>
	)
}

export default AdminDashboard
