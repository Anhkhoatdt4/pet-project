import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Navigation from '~/components/Navigation/Navigation'
import HeroSection from './components/HeroSection/HeroSection'
import NewArrivals from './components/Sections/NewArrivals'
import Category from './components/Sections/Categories/Category'
import content from '~/data/content.json'
import Footer from './components/Footer/Footer'
import Reviewer from './components/Review/Reviewer'

function App() {
  const location = useLocation();
  const productPages = ["/mens", "/womens", "/kids","/product"];
  
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
