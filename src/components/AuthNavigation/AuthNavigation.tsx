import React from 'react'
import { RiFindReplaceFill } from "react-icons/ri";
import loginLogo from '~/assets/logo/login_logo.jpg'
import { NavLink } from 'react-router-dom';

const AuthNavigation = () => {
  return (
    <nav className='flex items-center bg-white d px-10 py-3 justify-between border-blue-100 border-b-2 pr-[60px]'>
        <div className='flex items-center'>
            <img src={loginLogo} className='w-[50px] h-[50px] rounded-full bg-cover'/>
        </div>

        <div className='flex items-center gap-6'>
            <div className='flex items-center  border px-3 py-1 rounded-full text-sm text-gray-600 bg-gray-100'>
                <RiFindReplaceFill />
                <input type='text' className='px-3 outline-none bg-transparent text-sm w-20' placeholder='Search'/>
            </div>
            <select className='text-sm border rounded-full px-3 py-1 font-semibold bg-transparent outline-none text-black bg-gray-100'>
                <option value="en">English</option>
                <option value="vn">Vietnamese</option>
            </select>
            <NavLink
            to="/v1/login"
            className={({ isActive }) =>
              isActive
                ? 'bg-black text-white px-5 py-1.5 rounded-md text-sm font-bold hover:text-red-600 transition-all duration-300'
                : 'text-black border border-black hover:bg-slate-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-1 focus:outline-none'
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/v1/register"
            className={({ isActive }) =>
              isActive
                ? 'bg-black text-white px-5 py-1.5 rounded-md text-sm font-bold hover:text-red-600 transition-all duration-300'
                : 'text-black border border-black hover:bg-slate-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-1 focus:outline-none'
            }
          >
            Register
          </NavLink>
        </div>
    </nav>
  )
}

export default AuthNavigation
