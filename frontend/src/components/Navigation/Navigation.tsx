import React, { useEffect } from 'react'
import logo from '~/assets/logo/logo.jpg'
import { Wishlist } from '../common/Wishlist'
import AccountIcon from '../common/AccountIcon'
import { CartIcon } from '../common/CartIcon'
import { NavLink } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa';
import { countCartItems } from '~/store/features/cart'
import { useSelector } from 'react-redux'

const Navigation = () => {
  const [scrolling, setScrolling] = React.useState(false);
  const [bgColor, setBgColor] = React.useState('rgb(49, 47, 47)')
  const [menuOpen , setMenuOpen] = React.useState(false);
  const cartLength = useSelector(countCartItems);
  useEffect(() => {
      const handleScroll = () => {
          if (window.scrollY > 750) {
              setScrolling(true)
          } else {
              setScrolling(false)
          }
      }
      window.addEventListener('scroll', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
  }, [])

  
  return (
    <nav className="fixed left-0 top-0 w-full flex items-center justify-between gap-20 px-16 py-2 
     border-b border-orange-300 z-50 transition-all duration-500"
     style={{ backgroundColor: scrolling ? '#374151' : bgColor }}
     >
      <div className='flex items-center gap-5'>
        {/* Logo */}
        <img src={logo} alt="" className='h-12 w-auto'/>
        <NavLink to="/" className='text-3xl text-white font-bold'>HEAVEN</NavLink>
      </div>

        {/* Menu Icon Mobile */}
        <div className="md:hidden fixed right-5 top-6 z-50">
        <button 
          className={`text-white text-2xl transition-all duration-300 ${menuOpen ? 'top-6' : 'top-[-8px]'} ${window.innerWidth <= 500 ? 'mt-4 mb-2': ''} `} 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className={`absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto 
        bg-gray-900 md:bg-transparent md:flex flex-col md:flex-row 
        gap-6 md:gap-10 items-center p-6 md:p-0 
        transition-all duration-300 mt-2 ${menuOpen ? 'block' : 'hidden md:flex'}`}
      >
        {/* Nav items */}
        <ul className='flex gap-20 text-white uppercase text-lg'>
          <li><NavLink to="/" className={({isActive}) => isActive ? 'active-link' : ''}>Trang chủ</NavLink></li>
          <li><NavLink to="/mens" className={({isActive}) => isActive ? 'active-link' : ''}>Men</NavLink></li>
          <li><NavLink to="/womens" className={({ isActive }: { isActive: boolean }) => isActive ? 'active-link' : ''}>Women</NavLink></li>
          <li><NavLink to="/kids" className={({isActive}) => isActive ? 'active-link' : ''}>Kids</NavLink></li>
        </ul>
      </div>

      <div className='flex flex-nowrap items-center gap-4'>
        <ul className='flex flex-wrap gap-4'>
          <li><button><Wishlist/></button></li>
          <li><NavLink to='/account-details/profile' className={ ({isActive}) => isActive ? 'active-link' : ''}><AccountIcon/></NavLink></li>
          <li>
            <NavLink to='/cart-items' className={ ({isActive}) => isActive ? 'active-link' : ''}><CartIcon bgColor={"transparent"}/></NavLink>
          </li>
          {cartLength > 0 && 
          <div className='absolute ml-[150px] inline-flex items-center justify-center h-4 w-4 bg-white text-black font-bold rounded-full border-2 text-xs border-whit'>
            {cartLength}
          </div>}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
