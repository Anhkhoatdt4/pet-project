import React, { useState } from 'react'
import ReactRangeSliderInput from 'react-range-slider-input'
import 'react-range-slider-input/dist/style.css';
import './PriceFilter.css'

const PriceFilter = () => {
    
    const [range,setRange] = useState({min: 0, max: 400});

  return (
    <div className='flex mt-3 gap-3 flex-col'>
        <p className='text-[16px] text-black'>Price</p>
        <ReactRangeSliderInput min ={0} max = {400} defaultValue={[range.min , range.max]} onInput={ (values) => {
            setRange({min: values[0], max: values[1]})
        }} 
        className={'custom-range-slider'}
        />

        <div className='flex justify-between'>
            <input type="text" value={`$ ${range.min}`} className='max-w-[50%] border rounded-lg w-[25%] mt-4 p-2 bg-white text-black items-center'/>
            <input type="text" value={`$ ${range.max}`} className='max-w-[50%] border rounded-lg w-[25%] mt-4 p-2 bg-white text-black'/>
        </div>
    </div>
  )
}

export default PriceFilter
