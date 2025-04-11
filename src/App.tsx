import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Navigation from '~/components/Navigation/Navigation'
import HeroSection from './components/HeroSection/HeroSection'
import NewArrivals from './components/Sections/NewArrivals'
import Category from './components/Sections/Categories/Category'
import content from '~/data/content.json'
import Footer from './components/Footer/Footer'
import Reviewer from './components/Review/Reviewer'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from './components/Spinner/Spinner'
import { useEffect } from 'react'
import { setLoading } from './store/features/common'
import { fetchCategories } from './api/fetchCategories'
import { loadCategories } from './store/features/category'

function App() {
  const location = useLocation();
  const productPages = ["/mens", "/womens", "/kids","/product"];
  const isLoading = useSelector((state: { commonState: { isLoading: boolean } }) => state.commonState.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    fetchCategories().then((res) => {
      console.log("Categories fetched successfully:", res);
      const categoryArray = Object.values(res.result);
      dispatch(loadCategories(categoryArray));
    }).catch((error) => {
      console.error("Error fetching categories:", error);
    }).finally(() => {
      dispatch(setLoading(false));
    });
  }, [dispatch])

  return (
    <> 
    
      <div className="App">
        {/* Luôn hiển thị Navigation */}
        <Navigation />

        {/* Nếu là trang sản phẩm, chỉ hiển thị nội dung từ Outlet */}
        {productPages.some((path) => location.pathname.startsWith(path)) ? (
          <div className="flex flex-col min-h-screen">
          {/* Nội dung chính */}
          <div className="flex-1 pt-[80px]">
            <Outlet />
          </div>
          <Reviewer/>
          {/* Footer luôn nằm sát dưới */}
          <Footer content={content} />
        </div>
        ) : (
          <>
            {/* HeroSection chứa video */}
            <HeroSection />
            <section className="container mx-auto px-4 py-10 bg-gray-200">
              <NewArrivals />
              <div className="mt-8">
                {content?.section?.map((category, index) => (
                  
                  <Category key={category?.title + index} {...category} />
                ))}
              </div>
            </section>
            <Reviewer color={true}/>
            <Footer content={content} />
          </>
        )}
      </div>
      
    </>
  );

}

export default App
