import React from 'react'
import { IoMenu } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../Helpers/axiosInstance';
import { removeUser } from '../Redux/Slices/AuthSlice';
import toast from 'react-hot-toast';
// import { logout } from '../Redux/Slices/AuthSlice';



const HomeLayouts = ({children}) => {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	 const {isLoggedIn, user} = useSelector((state) => state.auth)
	//  console.log(isLoggedIn, user)


	//for displaying the options acc to role
	const admin = useSelector((state)=> state?.auth?.role)

	function changeWidth (){
		const drawerSide = document.getElementsByClassName("drawer-side")
		drawerSide[0].style.width = "auto";
	}

	function hideDrawer (){
		const element = document.getElementsByClassName("drawer-toggle")
		element[0].checked = false;

		const drawerSide = document.getElementsByClassName("drawer-side")
		drawerSide[0].style.width = "auto";
	}

	async function handleLogout (e) {
		e.preventDefault();

		try {
			const response = await axiosInstance.post('/user/logout')
			const data = response.data;
			if(data.success){
				dispatch(removeUser());
				navigate("/")
				toast.success("Logout successfully")
			}

		} catch (error) {
			toast.error(error?.response?.data?.message || "error in handle logout")
		}
	}
	return (
		<div className='min-h-[90vh]'>
			<div className='drawer absolute left-0 z-10 w-fit'>
				<input id="my-drawer-2" type="checkbox" className='drawer-toggle' />
				<div className="drawer-content">
					<label htmlFor="my-drawer-2" className="cursor-pointer relative ">
						<IoMenu 
							onClick={changeWidth}
							size={"32px"} 
							className='font-bold text-white m-4'
						/>
					</label>
				</div>

				<div className='drawer-side w-0'>
					<label htmlFor="my-drawer" className='drawer-overlay'></label>
					<ul className="menu bg-base-100 text-base-content h-[100vh]  w-48 p-4 relative sm:w-80">
						<li className='w-fit absolute right-2 z-50'>
							<button onClick={hideDrawer}>
								<AiFillCloseCircle size={24}/>
							</button>
						</li>	

						{/* {isLoggedIn && role === 'admin' &&  */}
							{/* <li>
								<Link to={'/admin/dashboard'}>Admin DashBoard</Link>
							</li>		 */}
						{/* } */}

						
							
						<li>
							<Link to={'/'}>Home</Link>
						</li>	
						<li>
							<Link to={'/courses'}>All Courses</Link>
						</li>

						{/* {isLoggedIn && role === 'admin' && } */}
						<li>
							<Link to={'/course/create'}>Create Course</Link>
						</li>				
						<li>
							<Link to={'/contact'}>Contact Us</Link>
						</li>
						<li>
							<Link to={'/about'}>About Us</Link>
						</li>

						{!isLoggedIn && (
							<li className='my-2 w-[90%]'>
								<div className="flex items-center justify-center">
									<button className='border bg-blue-500 hover:bg-blue-600 px-4 py-1 font-semibold rounded-md w-full'>
										<Link to={'/login'}>Login</Link>
									</button>
									<button className='border border-amber-400 hover:bg-amber-500 px-4 py-1 font-semibold rounded-md w-full'>
										<Link to={'/signup'}>Signup</Link>
									</button>
								</div>
							</li>
						)}

						{isLoggedIn && (
							<li className='my-2 w-[90%]'>
								<div className="w-full flex items-center justify-center">
									<button className=' z-10 px-4 py-1 font-semibold rounded-md w-full'>
										<Link to={'/user/profile'}>Profile</Link>
									</button>
									<button onClick={handleLogout} className='bg-red-500 text-white hover:bg-red-600  px-4 py-1 font-semibold rounded-md w-full'>
										<Link>Logout</Link>
									</button>
								</div>
							</li>
						)}
					</ul>
				</div>
			</div>

			{children}

			<Footer />
		</div>
	)
}

export default HomeLayouts
