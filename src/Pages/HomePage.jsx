import { Link } from 'react-router-dom'
import HomeLayouts from '../Layouts/HomeLayouts'
import homepage from '../assets/imge1.jpg'
const HomePage = () => {
  return (
	<HomeLayouts >
		<div className='pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]'>
			<div className="w-1/2 space-y-6 ">
				<h1 className='text-5xl font-semibold'>
					FindOut Best
					<span className='text-yellow-500 font-bold'>
						Online Courses
					</span>
				</h1>
				<p className='text-xl text-gray-200'>
					We have a large library of courses taught by highly skilled and qualified faculty at Altus
				</p>

				<div className="space-x-6">
					<Link to={'/courses'}>
						<button className='bg-yellow-500 px-5 py-3 rounded-md font-semibold cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-200'>
							Explore courses
						</button>
					</Link>
					<Link to={'/contact'}>
						<button className='border border-yellow-500 px-5 py-3 rounded-md font-semibold cursor-pointer hover:bg-yellow-500 transition-all ease-in-out duration-200'>
							Contact Us
						</button>
					</Link>
				</div>
				
			</div>
			<div className="w-1/2 flex items-center justify-center">
				<img 
					className='rounded-md'
					src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg" 
					alt="" 
				/>
			</div>
		</div>
	</HomeLayouts>
  )
}

export default HomePage
