import FilterIcon from '~/components/common/FilterIcon';
import Categories from '~/components/Filter/Categories';
import ColorsFilter from '~/components/Filter/ColorsFilter';
import PriceFilter from '~/components/Filter/PriceFilter';
import SizeFilter from '~/components/Filter/SizeFilter';
import content from '~/data/content.json';
import ProductCard from './ProductCard';
import { getAllProducts } from '~/api/fetchProducts';
import { useSelector, useDispatch} from 'react-redux';
import { setLoading } from '~/store/features/common';
import { useEffect, useMemo, useState} from 'react';

const ProductListPage = ({categoryType} : {categoryType: string}) => {
    const categories = content.categories;
    const categoryContent = categories?.find((category) => category.code === categoryType);
    const productListItem = content.products?.filter((product) => product.category_id === categoryContent?.id);
    const dispatch = useDispatch();
    const categoryData = useSelector((state: {categoryState: { categories: any[] } }) => state?.categoryState?.categories);
    const category = useMemo(() => {
        return categoryData?.find((categoryData) => categoryData?.code === categoryType);
    }, [categoryType, categoryData]);
    console.log('Value of categoryData:', categoryData);
    
    console.log("Category ", category);
    
    const [products, setProducts] = useState<Record<string, any>[]>([]);

    useEffect(() => {  
        dispatch(setLoading(true));
        if (category?.id){
         getAllProducts(category?.id).then((res) => {
            console.log("Products fetched successfully:", res);
            setProducts(res);
        }).catch((error) => {
            console.error("Error fetching products:", error);
        }).finally(() => {
            dispatch(setLoading(false));
        });
        }
      
    }, [category?.id, dispatch]);

    const handleSizeChange = (selectedSizes: string[]) => {
    // TODO: Thực hiện filter sản phẩm theo size hoặc cập nhật state filter
    console.log('Selected sizes:', selectedSizes);
    };

    return (
    <div>
        <div className='flex w-full p-5 gap-4'>
            <div className='w-[20%] p-[10px] border rounded-lg m-[20px]'>
                <div className='flex justify-between'>
                    <p className='text-[16px] text-gray-600 font-medium'>Filter</p>
                    <FilterIcon />
                </div>
                <div >
                   <p className='text-[16px] text-black mt-5'>Categories</p> 
                   <Categories types={categoryContent?.types || []} />
                </div>
                <div className='flex flex-col mt-5'>
                    <PriceFilter />
                    <hr></hr>
                    <ColorsFilter colors={categoryContent?.meta_data.colors || []} />
                    <hr />
                    <SizeFilter
                        sizes={categoryContent?.meta_data.sizes || []}
                        multi={false}
                        onChange={handleSizeChange}
                        />
                </div>
            </div>

            <div className='p-[10px] w-[80%]'>
                <p className='text-black text-lg font-semibold underline decoration-black'>{category?.description}</p>
                <div className='pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {products?.map((product, index) => (
                       <ProductCard
                       key={product?.id + " " + index}
                       id={Number(product.id)}
                       title={product.title}
                       description={product.description}
                       price={product.price}
                       discount={product.discount}
                       rating={typeof product.rating === 'number' ? product.rating : 0}
                       thumbnail={product.thumbnail}
                       brand={product.brand}
                       slug={product.slug}
                   />
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProductListPage;
