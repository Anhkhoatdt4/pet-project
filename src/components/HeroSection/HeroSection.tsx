import React from 'react'
import video from '~/assets/video/video_frame.mp4'

const HeroSection = () => {
  return (
    <div className='relative w-full h-screen'>
        {/* Video */}
        <video src={video} autoPlay loop muted className='absolute w-full h-full object-cover'></video>

        <div className='absolute top-0 right-0 bottom-0 left-12 flex items-center text-white bg-black/5'>
          <main className='px-10 lg:px-24 z-10'>
            <div className='text-left'>
              <h2 className='text-2xl hover:text-red-800 font-bold'>T-shirt / Tops</h2>
            </div>
            <p className='ml-2 mt-3 text-gray-300 sm:mt-4 sm:max-w-xl text-4xl font-bold'>Summer Glow - Autumn Breeze</p>
            <p className='mt-3 text-white sm:mt-4 sm:max-w-xl text-2xl hover:text-red-300'>Airy / Bold / Snug</p>
            <button className='mt-5'>
              <a href="" className='px-8 py-2 mt-5 text-white bg-black/5 border-2 border-white hover:bg-orange-300 hover:text-black'>Shop Now</a>
            </button>
          </main>
        </div>

    </div>
  )
}

export default HeroSection
