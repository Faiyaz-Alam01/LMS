import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const RequireAuth = () => {

	const { isLoggedIn , role} = useSelector((state)= state.auth)
	
	return isLoggedIn && allowRoles.find((myRole) => myRole == role) ? (
		<Outlet />
	): isLoggedIn ? (<Navigate to="/denied" />) : (<Navigate to="/login" />)
}

export default RequireAuth
