import React from 'react'
import {BsFacebook, BsInstagram, BsLinkedin, BsTwitterX} from "react-icons/bs"
import { Link } from 'react-router-dom';

const Footer = () => {

	const currentDate = new Date()
	const year = currentDate.getFullYear();
	

	return (
		<>
			<footer className= 'relative left-0 bottom-0 h-[10vh] py-5 flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800 sm:px-20'>
				<section className='text-lg '>
					Copyright {year} | All rights reserved
				</section>
				<section className='flex gap-5 items-center justify-center text-2xl text-white'>
					<Link className='hover:text-blue-500 transition-all ease-in-out duration-300'>
						<BsFacebook />
					</Link>
					<Link className='hover:text-pink-500 transition-all ease-in-out duration-300'>
						<BsInstagram />
					</Link>
					<Link className='hover:text-blue-700 transition-all ease-in-out duration-300'>
						<BsLinkedin />
					</Link>
					<Link className='hover:text-yellow-500 transition-all ease-in-out duration-300'>
						<BsTwitterX />
					</Link>
					
				</section>
			</footer>
		</>
	)
}

export default Footer
