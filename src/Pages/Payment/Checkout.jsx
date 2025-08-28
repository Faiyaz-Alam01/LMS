import { handler } from '@tailwindcss/line-clamp';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getRazorPayId, purchageCourseBundle, verifyUserPayment } from '../../Redux/Slices/RazorpaySlice';
import HomeLayouts from '../../Layouts/HomeLayouts';
import {BiRupee} from 'react-icons/bi'

const Checkout = () => {
 
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const razorpayKey = useSelector((state) => state?.razorpay?.key)
	const subscription_id = useSelector((state) => state?.razorpay?.subscription_id)
	const isPaymentVerified = useSelector((state) => state?.razorpay?.isPaymentVerified)
	const userData = useSelector((state) => state?.auth?.user);
	const paymentdetails = {
		razorpay_payment_id: "",
		razorpay_subscription_id: "",
		razorpay_signature: ""
	}

	async function handleSubscription(e){
		e.preventDefault();
		if(!razorpayKey || !subscription_id) {
			toast.error("Something went wrong");
			return
		}
		const options = {
			key: razorpayKey,
			subscription_id: subscription_id,
			name: "Coursify Pvt. Ltd.",
			description: "Subscription",
			theme : {
				color: '#F37254' //for popup them 
			},
			prefill:{
				email: userData.email,
				name: userData.fullName
			},
			handler: async function (response) {
				paymentdetails.razorpay_payment_id = response.razorpay_payment_id;
				paymentdetails.razorpay_signature= response.razorpay_signature;
				paymentdetails.razorpay_subscription_id = response.razorpay_subscription_id;

				toast.success("Payment successfull")

				await dispatch(verifyUserPayment(paymentdetails));
				isPaymentVerified ? navigate("/checkout/success") : navigate("/checkout/fail")
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open();
	}

	async function load() {
		await dispatch(getRazorPayId())
		await dispatch(purchageCourseBundle())
	}

	useEffect(() => {
		load();
	},[])

	return (
		<HomeLayouts>
			<form 
				onSubmit={handleSubscription}
				className='min-h-[90vh] w-full flex justify-center items-center text-white'
			>
				<div className='w-md h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative'>
					<h1 className='text-center bg-yellow-500 absolute top-0 py-4  w-full text-2xl font-bold rounded-tr-lg'>Subscription Bundle</h1>

					<div className='text-center px-4 space-y-5'>
						<p className="text-[17px]">
							This purchage will allow you to access all avilable course of
							our platform for {''}
							<span className='text-yellow-500 font-bold'>
								1 Year duration
							</span>{' '}
								All the existing and new launched courses will be also available 

						</p>

						<p className='flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500'>
							<BiRupee /> <span>499</span>only
						</p>
						<div  className='text-gray-200'>
							<p>100% refund on cancellation</p>
							<p>* Terms and conditions applied *</p>
						</div>
						<button type='submit' className='bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 left-0 w-full text-xl font-bold rounded-bl-lg rounded-br-lg py-3'>
							Buy now
						</button>
					</div>
				</div>
			</form>

		</HomeLayouts>
	)

	

}

export default Checkout
