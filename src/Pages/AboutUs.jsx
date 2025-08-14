import React from 'react'
import HomeLayouts from '../Layouts/HomeLayouts'
import aboutmain from '../assets/aboutmain.jpg'

const AboutUs = () => {
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

			<div className="carousel m-auto w-1/2 my-20">
				<div id="slide1" className="carousel-item  relative w-full">
					<div className='flex flex-col items-center justify-center gap-4 px-[15%]'>
						<img
							src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
							className="size-40 rounded-full border-2 border-gray-400" 
						/>
						<p className='text-xl text-gray-200'>{`I learned that courage was not the absence of fear, but the triumph over it`}</p>
						<h3 className='text-2xl font-semibold'>Nelson Mandela </h3>
						<div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
							<a href="#slide5" className="btn btn-circle bg-blue-800">❮</a>
							<a href="#slide2" className="btn btn-circle bg-blue-800">❯</a>
						</div>
					</div>
				</div>
				<div id="slide2" className="carousel-item relative w-full">
					<div className='flex flex-col items-center justify-center gap-4 px-[15%]'>
						<img
							src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
							className="size-40 rounded-full border-2 border-gray-400" 
						/>
						<p className='text-xl text-gray-200'>{`Only through focus can you do world-class things, no matter how capable you are`}</p>
						<h3 className='text-2xl font-semibold'>Bill Gates</h3>
						<div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
							<a href="#slide1" className="btn btn-circle bg-blue-800">❮</a>
							<a href="#slide3" className="btn btn-circle bg-blue-800">❯</a>
						</div>
					</div>
				</div>
				<div id="slide3" className="carousel-item relative w-full">
					<div className='flex flex-col items-center justify-center gap-4 px-[15%]'>
						<img
							src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
							className="size-40 rounded-full border-2 border-gray-400" 
						/>
						<p className='text-xl text-gray-200'>{`Dream is not that which you see while sleeping, it is something that does not let you sleep.`}</p>
						<h3 className='text-2xl font-semibold'>APJ Abdul Kalam</h3>
						<div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
							<a href="#slide2" className="btn btn-circle bg-blue-800">❮</a>
							<a href="#slide4" className="btn btn-circle bg-blue-800">❯</a>
						</div>
					</div>
				</div>
				<div id="slide4" className="carousel-item relative w-full">
					<div className='flex flex-col items-center justify-center gap-4 px-[15%]'>
						<img
							src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
							className="size-40 rounded-full border-2 border-gray-400" 
						/>
						<p className='text-xl text-gray-200'>{`Only through focus can you do world-class things, no matter how capable you are`}</p>
						<h3 className='text-2xl font-semibold'>Bill Gates</h3>
						<div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
							<a href="#slide3" className="btn btn-circle bg-blue-800">❮</a>
							<a href="#slide5" className="btn btn-circle bg-blue-800">❯</a>
						</div>
					</div>
				</div>
				<div id="slide5" className="carousel-item relative w-full">
					<div className='flex flex-col items-center justify-center gap-4 px-[15%]'>
						<img
							src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
							className="size-40 rounded-full border-2 border-gray-400" 
						/>
						<p className='text-xl text-gray-200'>{`Only through focus can you do world-class things, no matter how capable you are`}</p>
						<h3 className='text-2xl font-semibold'>Bill Gates</h3>
						<div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
							<a href="#slide4" className="btn btn-circle bg-blue-800">❮</a>
							<a href="#slide1" className="btn btn-circle bg-blue-800">❯</a>
						</div>
					</div>
				</div>

			</div>
		</div>
	</HomeLayouts>
  )
}

export default AboutUs
