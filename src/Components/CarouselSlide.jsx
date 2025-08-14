import React from 'react'

const CaresolSlide = ({image, title, des, slideNumber, totalSlide}) => {

	return (
		<div id={`slide${slideNumber}`} className="carousel-item relative w-full">
			<div className='flex flex-col items-center text-center justify-center gap-4 px-[15%]'>
				<img
					src={image}
					className="size-40 rounded-full border-2 border-gray-400" 
				/>
				<p className='text-xl text-gray-200'>{`${des}`}</p>
				<h3 className='text-2xl font-semibold'>{title}</h3>
				<div className="absolute px-4 left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
					<a href={`#slide${(slideNumber == 1 ? totalSlide : (slideNumber-1)) }`} className="btn btn-circle bg-blue-800">❮</a>
					<a href={`#slide${(slideNumber) % totalSlide + 1}`} className="btn btn-circle bg-blue-800">❯</a>
				</div>
			</div>
		</div>
	)
}

export default CaresolSlide
