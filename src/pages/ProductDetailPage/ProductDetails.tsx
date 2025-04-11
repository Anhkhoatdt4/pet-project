import { useState, useEffect, useMemo, useCallback } from "react";
import _ from "lodash";
import { Link, useLoaderData } from "react-router-dom";
import CumbTrail from "~/components/CumbTraill/CumbTrail";
import SizeFilter from "~/components/Filter/SizeFilter";
import StarRating from "~/components/Rating/StarRating";
import content from "~/data/content.json";
import ProductColor from "../ProductListPage/ProductColor";
import { CartIcon, SvgCloth, SvgShipping, SvgReturn, SvgCreditCard } from "~/components/common";
import SectionHeading from "~/components/Sections/SectionHeading/SectionHeading";
import ProductCard from "../ProductListPage/ProductCard";
import Reviewer from "~/components/Review/Reviewer";
import { useSelector } from "react-redux";
import { getAllProducts } from "~/api/fetchProducts";

const extraSections = [
  {
    icon:<SvgCreditCard />,
    label:'Secure payment'
  },
  {
    icon:<SvgCloth />,
    label:'Size & Fit'
  },
  {
    icon:<SvgShipping />,
    label:'Free shipping'
  },
  {
    icon:<SvgReturn />,
    label:'Free Shipping & Returns'
  }
]

const ProductDetails = () => {
  const product = useLoaderData() as any;
  console.log("product " , product.name , product?.categoryId );
  
  const [similarProduct, setSimilarProduct] = useState([]);
  const categories = useSelector((state: { categoryState: { categories: any[] } }) => state?.categoryState?.categories);
  const [image, setImage] = useState<string | undefined>();

  const productCategory = useMemo(() => {
    return categories?.find((category) => category?.id === product?.categoryId);
  }, [product]);

  const [cumbTrail, setCumbTrail] = useState<{ title: string; path: string }[]>(
    []
  );

  const colors = useMemo(()=>{
    const colorSet = _.uniq(_.map(product?.variants,'color'));
    return colorSet

  },[product]);

  const sizes = useMemo(() => {
    const SizeSet= _.uniq(_.map(product?.variants,'size'));
    return SizeSet
  },[product])
  useEffect(() => {
    getAllProducts(product?.categoryId, product?.categoryTypeId).then((res) => {
      const excludedProduct = res.result?.filter((item : any)=> item?.id !== product?.id);
      console.log("Products fetched successfully:", excludedProduct);
      setSimilarProduct(excludedProduct);
    }).catch((error) => {
      console.error("Error fetching products:", error);
    })
  }, [product?.categoryId, product?.categoryTypeId, product?.id]);


  useEffect(() => {
    console.log("component rerender");
    
    setImage(product?.thumbnail);
    setCumbTrail([]);
    const arrayLink: { title: string; path: string }[] = [
      { title: "Shop", path: "/" },
      {
        title: productCategory?.name as string,
        path: productCategory?.name as string,
      },
    ];
    const productType = productCategory?.categoryTypes?.find((item : any) => item?.id === product?.categoryTypeId);
    if (productType) {
      arrayLink.push({
        title: productType?.name,
        path: productType?.name
      })
    }
    setCumbTrail(arrayLink);
  }, [productCategory, product]);

    const addItemToCart = useCallback(()=>{
    },[]);

  return (
    <>
     <div className="flex flex-col md:flex-row m-10 ml-[80px] items-start gap-10">
      <div className="w-full lg:w-[65%] md:w-[40%] flex ml-[60px]">
        <div className="flex flex-col md:flex-row lg:ml-[70px] gap-4">
          <div className=" sm:w-[80%] md:w-[25%] sm:ml-8 flex justify-center items-center">
            <div className="flex sm:flex-row md:flex-col gap-2 md:gap-5 sm:gap-7">
              {product?.productResources?.map(
                (item : any, index: number) => (
                  <button
                    key={index}
                    className="rounded-lg w-fit p-1"
                    onClick={() => setImage(item?.url)}
                  >
                    <img
                      src={item?.url}
                      className="h-[75px] w-[70px] bg-cover object-cover bg-center rounded-lg border-blue-900"
                      alt={"sample-" + index}
                    />
                  </button>
                )
              )}
            </div>
          </div>
          <div className="w-full md:w-[80%] lg:w-[95%] flex justify-start ">
            <img
              src={image}
              alt={product?.name}
              className="h-full w-full object-cover cursor-pointer border rounded-lg max-h-[500px]"
            />
          </div>
        </div>
      </div>

      <div className="w-full md:w-[50%] flex flex-col justify-start lg:mr-[240px] gap-2">
        <CumbTrail links={cumbTrail} />
        <p className="text-3xl pt-2">{product?.name}</p>
        <StarRating rating={product.rating} />
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 justify-start mt-1">
            <p className="text-[15px] font-bold">Select size</p>
            <Link
              className="text-sm text-gray-500 hover:text-gray-900"
              to={
                "https://www.grivetoutdoors.com/pages/clothing-size-chart?srsltid=AfmBOoraFjGowclCex87ROrZ8XpdHxxO4RhK-1fz672lzCsBwgLXsNbd"
              }
            >
              {"Size Guide ->"}
            </Link>
          </div>
          <div className="flex ml-0 mt-2">
            <SizeFilter sizes={sizes} hiddenTitle={true} multi={false} />
          </div>
          <div className="mt-[-21px]">
            <p className="text-[16px] font-medium mb-2">Colours Available</p>
            <ProductColor colors={colors}></ProductColor>
          </div>
          <div className="flex mt-1 items-center border-b-2 border-gray-300 pb-6">
            <button className="bg-black rounded-lg w-[150px] text-white flex items-center justify-center overflow-hidden pr-2">
              <CartIcon bgColor={"black"} />
              Add to Cart
            </button>
            <div className="flex rounded-md w-[90px] h-[30px] border-gray-400 items-center border-2 justify-center ml-[20px] px-2 bg-gray-100 shadow-sm">
              <p className="text-lg font-semibold text-black">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 pt-4 gap-5">
                {
                  extraSections.map((extraSection) => (
                    <div className= 'flex items-center mr-[-60px] cursor-pointer'>
                        {extraSection.icon}
                        <p className="px-2 font-medium hover:text-red-900">{extraSection.label}</p>
                    </div>
                  ))
                }
            </div>
        </div>
      </div>
    </div>
    <div className="md:w-[100%] w-full p-10">
    <div className="flex flex-col md:flex-row">
        <div className="w-[100%] lg:w-[50%] md:w-[40%]">
          <SectionHeading title="Product Description" />
          <p className="ml-10 px-8 text-[16px] font-medium">
            {product?.description}
          </p>
        </div>
      </div>
      <SectionHeading title={"Similar Products"} />
      <div className="flex px-10">
        <div className="pt-4 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-8 px-2 pb-10">
          {!similarProduct?.map((item : any, index : number) => (
            <ProductCard key={index} {...item} />
          ))}
          {similarProduct?.length && <p className="font-bold text-2xl ml-6">No Products Found!</p>}
        </div>
      </div>
    </div>
    {/* <Reviewer></Reviewer> */}
    </>
   
  );
};

export default ProductDetails;
