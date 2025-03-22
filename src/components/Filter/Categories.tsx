import React from 'react'
import content from '~/data/content.json';
const Categories = ({types} : {types : Array<{ code: string, name: string }>}) => {
  return (
    <div className='space-y-2 mt-2'>
        {
            types.map(type => {
                return (
                    <div className = "flex items-center gap-1">
                        <input type='checkbox' name={type.code} className='border border-black rounded-lg w-6 h-4 checked:bg-black bg-white appearance-none  checked:accent-black '/>
                        <label htmlFor={type.code} className='text-gray-600 px-4 text-[14px] py-[2px] font-medium '>{type?.name}</label>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Categories
