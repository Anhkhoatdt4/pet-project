import React from 'react'
import GoogleLogo from '~/assets/logo/Google.png';

const GoogleSignIn = () => {
  return (
   <button className='flex justify-center items-center border w-full rounded border-gray-600 h-[48px] hover:bg-slate-50'>
        <img src={GoogleLogo} className='' alt='Google-icon'/>
        <p className='px-2 text-gray-500'>Sign up with your Google account</p>
    </button>
  )
}

export default GoogleSignIn
