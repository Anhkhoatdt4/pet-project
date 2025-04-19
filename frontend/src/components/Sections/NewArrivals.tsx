import React from "react";
import SeactionHeading from "./SectionHeading/SectionHeading";
import Dresses from "~/assets/img/dresses.jpg";
import Tshirt from "~/assets/img/tshirts.jpg";
import Jeans from "~/assets/img/jeans.jpg";
import Jacket from "~/assets/img/jacket.jpg";
import Card from "../Card/Card";
import Sundress from "~/assets/img/sundress.jpg";
import Hat from "~/assets/img/hat.jpg";
import Jogger from "~/assets/img/jogger.jpg";
import Carousel from "react-multi-carousel";
import { responsive } from "~/utils/Section.constants";
import '~/components/Sections/NewArrivals.css'

const items = [
  {
    title: "T-shirt",
    imagePath: Tshirt,
  },
  {
    title: "Dresses",
    imagePath: Dresses,
  },
  {
    title: "Jeans",
    imagePath: Jeans,
  },
  {
    title: "Jacket",
    imagePath: Jacket,
  },
  {
    title: "Sundress",
    imagePath: Sundress,
  },
  {
    title: "Hat",
    imagePath: Hat,
  },
  {
    title: "Jogger",
    imagePath: Jogger,
  },
];

const NewArrivals = () => {
  return (
    <>
    <div className="px-5 py-6"> 
      <SeactionHeading title={'New Arrivals'}/>
      <Carousel
          responsive={responsive}
          autoPlay={false}
          swipeable={true}
          draggable={false}
          showDots={false}
          infinite={false}
          partialVisible={false}
          // itemClass='react-slider-custom-item'
          className='px-8'
        >
          {items && items?.map((item,index)=> <Card key={item?.title +index} title={item.title} imagePath={item.imagePath}/>)}

        </Carousel>
      </div>
    </>
  )
}

export default NewArrivals
