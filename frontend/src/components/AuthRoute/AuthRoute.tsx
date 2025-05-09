import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isTokenValid } from '~/utils/jwt-helper';

interface AuthRouteProps {
    children: React.ReactNode
}

const AuthRoute = ( {children} : AuthRouteProps) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isTokenValid()){
          console.log("Token không hợp lệ, chuyển hướng về /v1/login");
            navigate("/v1/login")
        }
    }, [navigate])
  return (
    <div>
      {children}
    </div>
  )
}

export default AuthRoute
