import React from 'react'
import HomeLayouts from '../Layouts/HomeLayouts'
import aboutmain from '../assets/aboutmain.jpg'
import CaresolSlide from '../Components/CarouselSlide'

const AboutUs = () => {

	const celebtities = [
		{
			title: "Nelson Mandela",
			des: "I learned that courage was not the absence of fear, but the triumph over it",
			image: "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp",
			slideNumber: 1
		},
		{
			title: "APJ Abul Kalam",
			des: "Dream is not that which you see while sleeping, it is something that does not let you sleep.",
			image: "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp",
			slideNumber: 2
		},
		{
			title: "Nelson Mandela",
			des: "I learned that courage was not the absence of fear, but the triumph over it",
			image: "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp",
			slideNumber: 3
		},
		{
			title: "Bill Gates",
			des: "Only through focus can you do world-class things, no matter how capable you are",
			image: "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp",
			slideNumber: 4
		},
		{
			title: "Nelson Mandela",
			des: "I learned that courage was not the absence of fear, but the triumph over it",
			image: "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp",
			slideNumber: 5
		}

	]

	return (
		<HomeLayouts>
			<div className="pl-20 pt-20 flex flex-col text-white">
				<div className="flex items-center gap-5 mx-10">
					<section className="w-1/2 space-y-10">
						<h1 className='text-5xl text-yellow-500 font-semibold'>
							Affortable and Quality education
						</h1>
						<p className='text-xl text-gray-300'>
							Our goal is to provide the affortable and quality education to the world.
							We are providing the platform for the aspiring teachers and students to share skills,
							creativity and knowledge to each other to empower and contribute in the growth and wellness of mankind. 
						</p>
					</section>

					<div className='w-1/2 h-[50vh]'>
						<img 
							id='test'
							style={{
								filter : "drop-shadow(0px 10px 10px rgb(0,0,0))"
							}}
							className='drop-shadow-2xl rounded-4xl h-full '
							
							src={aboutmain}
						/>
					</div>
				</div>

				<div className="carousel m-auto w-md my-20">
					
					<div className='carousel w-full m-auto my-16'>
							{celebtities && celebtities.map(celebrity => 
								(<CaresolSlide {...celebrity} key={celebrity.slideNumber} totalSlide={celebtities.length} />)
							)}
					</div>
					


				</div>
			</div>
		</HomeLayouts>
	)
}

export default AboutUs
