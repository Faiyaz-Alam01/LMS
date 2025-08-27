import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const RequireAuth = ({allowRoles}) => {

	const { isLoggedIn , role} = useSelector((state)=> state.auth || {})

	if(!isLoggedIn){
		return <Navigate to="/login" />
	}

	return allowRoles.includes(role) ? (
		<Outlet />
	) : (
		<Navigate to="/denied" />
	);
}

export default RequireAuth
