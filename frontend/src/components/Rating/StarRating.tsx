import { useMemo } from 'react'
import SvgStarIcon from '../common/SvgStarIcon'
import { SvgEmptyStar } from '../common/SvgEmptyStar';

const StarRating = ({ rating }: { rating: number }) => {
  const ratingStars = useMemo(() => {
    return Array.from({ length: Math.floor(Number(rating)) }, (_, index) => (
      <SvgStarIcon key={index} />
    ));
  }, [rating]);

  const emptyStars = useMemo(() => {
    return Array.from({ length: 5 - Math.floor(Number(rating)) }, (_, index) => (
      <SvgEmptyStar key={`empty-${index}`} />
    ));
  }, [rating]);

  return (
    <>
    <div className='flex items-center gap-1'>
      {ratingStars}
      {emptyStars}
    </div>
    </>
  )
};

export default StarRating;
