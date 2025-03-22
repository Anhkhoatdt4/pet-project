import FilterIcon from '~/components/common/FilterIcon';
import Categories from '~/components/Filter/Categories';
import ColorsFilter from '~/components/Filter/ColorsFilter';
import PriceFilter from '~/components/Filter/PriceFilter';
import SizeFilter from '~/components/Filter/SizeFilter';
import content from '~/data/content.json';
import ProductCard from './ProductCard';

const ProductListPage = ({categoryType} : {categoryType: string}) => {
    const categories = content.categories;
    const products = content.products;
    const categoryContent = categories?.find((category) => category.code === categoryType);
    const productListItem = products?.filter((product) => product.category_id === categoryContent?.id);

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
                    <SizeFilter sizes={categoryContent?.meta_data.sizes || []} />
                </div>
            </div>

            <div className='p-[10px] w-[80%]'>
                <p className='text-black text-lg font-semibold underline decoration-black'>{categoryContent?.description}</p>
                <div className='pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {productListItem?.map((product, index) => (
                        <ProductCard key={index} {...product} id={Number(product.id)} />
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProductListPage;
