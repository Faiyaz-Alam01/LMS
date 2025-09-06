import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HomeLayouts from '../../Layouts/HomeLayouts';
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { canclecourseBundle } from '../../Redux/Slices/RazorpaySlice';
import toast from 'react-hot-toast';
import { getUserData } from '../../Redux/Slices/AuthSlice';


const Profile = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();

  	const {data} = useSelector((state)=> state.auth)
	const userData = data

	async function handleCancellation(){
		toast("Initiating cancellation...")
		const res = await dispatch(canclecourseBundle())

		await dispatch(getUserData());
		if(res.payload?.success){
			navigate('/')
		}

	}
	return (
		<HomeLayouts>
			<div className='min-h-[90vh] flex items-center justify-center'>
				<div className='my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-md shadow-[0_0_10px_black]'>
					<img 
						src={userData?.avatar || <FaRegUserCircle/> } 
						className='w-22 h-22 text-center rounded-full m-auto border border-black'
					/>
					<h3 className='text-xl font-semibold text-center capitalize'>
						{userData?.fullName || "Faiyaz"}
					</h3>
					<div className='grid grid-cols-2 gap-y-2'>
						<p>Email</p><p>{userData?.email}</p>
						
						<p>Role</p><p>{userData?.role}</p>
						
						<p>Subscription :</p>
						<p>{userData?.subscription?.status === "active"? "action": "inactive"}</p>

					</div>

					<div className='flex justify-center items-center gap-2'>
						<Link 
							to={'/user/changepassword'}
							className='w-1/2 bg-yellow-600 px-2 py-1 text-center rounded-md hover:bg-yellow-500 transition-all ease-in-out duration-200'>
							<button>Change Password</button>
						</Link>
						<Link 
							to={'/user/edit'}
							className='w-1/2 bg-yellow-600 px-2 py-1 text-center rounded-md hover:bg-yellow-500 transition-all ease-in-out duration-200'>
							<button>Edit Profile</button>
						</Link>
					</div>
					
					{ userData?.subscription?.status === "active" && ( 
						<button onClick={handleCancellation} className='py-1 mb-4 font-medium w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-200'>
							Cancle Subscription
						</button>
					)}
				</div>
			</div>
		</HomeLayouts>
	)
	}

export default Profile
