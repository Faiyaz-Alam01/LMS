import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HomeLayouts from '../../Layouts/HomeLayouts';
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Profile = () => {

	const userdata = useSelector((state) => state?.auth?.data);

	return (
		<HomeLayouts>
			<div className='min-h-[90vh] flex items-center justify-center'>
				<div className='my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-md shadow-[0_0_10px_black]'>
					<img 
						src={userdata?.avatar?.secure_url || <FaRegUserCircle /> } 
						className='size-22 rounded-full m-auto border border-black'
					/>
					<h3 className='text-xl font-semibold text-center capitalize'>
						{userdata?.fullName || "Faiyaz"}
					</h3>
					<div className='grid grid-cols-2'>
						<p>Email</p><p>{userdata?.email}</p>
						
						<p>Role</p><p>{userdata?.role}</p>
						
						<p>Subscription :</p>
						<p>{userdata?.subscription?.status === "active"? "action": "inactive"}</p>

					</div>

					<div className='flex justify-center items-center gap-2'>
						<Link 
							to={'/changepassword'}
							className='w-1/2 bg-yellow-600 px-2 py-1 text-center rounded-md hover:bg-yellow-500 transition-all ease-in-out duration-200'>
							<button>Change Password</button>
						</Link>
						<Link 
							to={'/user/edit'}
							className='w-1/2 bg-yellow-600 px-2 py-1 text-center rounded-md hover:bg-yellow-500 transition-all ease-in-out duration-200'>
							<button>Edit Profile</button>
						</Link>
					</div>
					{/* {/* .status === "active" && * change during backend setup/} */}
					{userdata?.subscription?.status !== "active" && (
						<button className='py-1 font-medium w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-200'>
							Cancle Subscription
						</button>
					)}
				</div>
			</div>
		</HomeLayouts>
	)
	}

export default Profile
