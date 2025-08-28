import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const RequireAuth = ({allowRoles}) => {

	const { isLoggedIn , user} = useSelector((state)=> state.auth)

	const role = user?.role
	
	return isLoggedIn && allowRoles.find((myRole) => myRole == role) ? (
		<Outlet />
	): isLoggedIn ? (<Navigate to="/denied" />) : (<Navigate to="/login" />)
}

export default RequireAuth
