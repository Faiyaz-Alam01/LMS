import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { getUserData, updateProfile } from '../Redux/Slices/AuthSlice';
import { Link, useNavigate } from 'react-router-dom';
import HomeLayouts from '../Layouts/HomeLayouts';
import { AiFillAlipayCircle, AiOutlineArrowLeft } from 'react-icons/ai';
import { BsPersonCircle } from 'react-icons/bs';

const EditProfile = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [data, setData] = useState({
		previewImage:"",
		fullName: "",
		avatar: undefined,
		userId: useSelector((state) => state?.auth?.data?._id)
	});

	function handleImageUpload (event) {
		event.preventDefault();
		const uploadImage = event.target.files[0];
		
		if(uploadImage) {

			const fileReader = new FileReader();
			fileReader.readAsDataURL(uploadImage);
			fileReader.addEventListener('load', function () {
				setData({
					...data,
					previewImage: this.result,
					avatar: uploadImage
				});
			})
		}

	}

	function handleInputChange (e) {
		const {name, value} = e.target
		setData({
			...data,
			[name]:value,
		})
	}


	async function onFormSubmit(e) {
		e.preventDefault();
		if(!data?.fullName || !data?.avatar){
			toast.error("All fields are required");
			return;
		}

		if(data.fullName.length < 5) {
			toast.error("name cant be of less than 5 character")
			return
		};

		const formData = new FormData();
		formData.append("fullName", data.fullName)
		formData.append("avatar", data.avatar);

		// await dispatch(updateProfile([data.userId, formData]))

		// await dispatch(getUserData());

		navigate('/user/profile')
	}
	
	return (
		<HomeLayouts>
			<div className='flex justify-center items-center h-screen'>
				<form
					onSubmit={onFormSubmit}
					className='flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-md min-h-[26rem] shadow-[0_0_10px_black]'
				>
					
					<h1 className='text-center text-2xl font-semibold'>Edit Profile</h1>
					<label 
						htmlFor="image_uploads"
						className='cursor-pointer'
					>
						{data?.previewImage ? (
							<img 
								src={data?.previewImage} 
								alt="previewImage" 
								className='size-28 rounded-full border m-auto'
							/>
						): (
							<BsPersonCircle className='size-28 rounded-full m-auto'/>
						)}
					</label>
					<input 
						onChange={handleImageUpload}
						type="file" 
						name="image_uploads" 
						id="image_uploads" 
						className='hidden'
						required
						accept = ".jpg, .png, .svg, .jpeg"
					
					/>

					<div className='flex flex-col gap-1'>
						<label htmlFor="fullName" className='text-lg font-semibold '>Name</label>
						<input 
							required
							type='text'
							name='fullName'
							id='fullName'
							placeholder='Enter your name'
							className='bg-transparent px-2 py-1 border'
							value={data.fullName}
							onChange={handleInputChange}
						/>
					</div>
					
					<button type='submit' className='w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out rounded-sm duration-300 py-2 text-lg '>
						Update Profile
					</button>

					<Link to={'/user/profile'}>
						<p className='link text-accent cursor-pointer flex items-center justify-center w-full gap-2'>
							<AiOutlineArrowLeft /> Go back to profile
						</p>
					</Link>

				</form>
			</div> 
		</HomeLayouts>
	)
}

export default EditProfile
