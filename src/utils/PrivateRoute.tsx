import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

interface Props {
	children: JSX.Element | React.ReactNode
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
	const router = useRouter()
	useEffect(() => {
		const token = sessionStorage.getItem('token')
		if (!token) {
			router.replace('/user/login');
		}
	},[router])

  	return children
}


export default PrivateRoute
