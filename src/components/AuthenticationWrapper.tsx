import React from 'react'
import { Outlet } from 'react-router-dom'
import AuthNavigation from './AuthNavigation/AuthNavigation'

const AuthenticationWrapper = () => {
  return (
    <div>
        <AuthNavigation />
        <Outlet />
    </div>
  )
}

export default AuthenticationWrapper
