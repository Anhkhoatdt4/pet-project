import React from 'react'

interface SectionHeadingProps {
  title: string;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title, className }: { title: string; className?: string }) => {
  return (
    <div className={`flex flex-wrap px-10 my-5 items-center gap-2 ml-6 ${className}`}>
      <div className='border rounded border-1 bg-black w-2 h-10'></div>
      <p className='text-2xl text-blue-700 font-medium'>{title}</p>
    </div>
  )
}

export default SectionHeading
