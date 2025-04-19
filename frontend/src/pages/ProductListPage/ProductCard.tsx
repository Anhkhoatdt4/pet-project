import React from 'react'
import {NavLink } from 'react-router-dom';
import SvgFavourite from '~/components/common/SvgFavourite';

interface ProductCardProps {
  id : number,
  title: string;
  description: string;
  price: number;
  discount: number;
  rating: number;
  brand: string;
  thumbnail: string;
  slug: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  price,
  discount,
  rating,
  brand,
  thumbnail,
  slug
}) => {
  return (
    <div className='flex flex-col hover:scale-105 relative gap-2 w-[320px]'>
        <NavLink to={`/product/${slug}`}>
            <img className={`h-[320px] w-[280px] border rounded-lg block cursor-pointer object-cover`} src={thumbnail}
            alt={title} />
        </NavLink>
      <button className='absolute top-2 right-8 pt-2 pr-2' onClick={() => {
        console.log('Favourite clicked')
      }}><SvgFavourite /></button>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col pt-2'>
          <p className='text-[16px] p-1 font-medium'>{title}</p>
          {description && <p className='text-[12px] p-1 text-gray-600'>{description}</p>}
        </div>
        <p className='text-[14px] text-black font-medium p-1 mr-[33px]'>
         ${price.toFixed(2)}
        </p>
      </div>
    </div>
  )
}

export default ProductCard
