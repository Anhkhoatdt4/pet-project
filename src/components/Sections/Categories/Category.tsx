import React from 'react'
import SectionHeading from '../SectionHeading/SectionHeading'
import Card from '~/components/Card/Card';

interface CategoryProps {
  title: string;
  data: { imagePath: string; title: string; description: string; actionArrow?: boolean | string; }[];
}

export const Category : React.FC<CategoryProps> = ({title, data}) => {
  return (
      <><SectionHeading title={title} /><div className='px-5 flex justify-around mr-4'>
      {data && data?.map((item, index) => <Card key={index} imagePath={item.imagePath} title={item.title} description={item.description} actionArrow={true} height={'300'} />
      )}
    </div></>
  )
}

export default Category
