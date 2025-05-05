import { createBrowserRouter } from 'react-router-dom';
import ProductListPage from './pages/ProductListPage/ProductListPage';
import App from './App';
import ProductDetails from './pages/ProductDetailPage/ProductDetails';
import { loadProductBySlug } from '~/components/routes/loadProductBySlug';
import Login from './pages/Login/Login';
import AuthenticationWrapper from './components/AuthenticationWrapper';
import Register from '~/components/AuthRegister/Register';
import OAuth2LoginCallback from './pages/Login/OAuth2LoginCallback';
import Cart from './pages/Cart/Cart';
import AuthRoute from './components/AuthRoute/AuthRoute';
import Account from './pages/Account/Account';
import Checkout from './pages/Checkout/Checkout';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import ConfirmPayment from './pages/ConfirmPayment/ConfirmPayment';
import OrderSuccessPage from './pages/OrderSuccessPage/OrderSuccessPage';
import path from 'path';
import { element } from 'prop-types';
import Profile from './pages/Account/Profile';
import Order from './pages/Account/Order';
import Setting from './pages/Account/Setting';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: 'mens', element: <ProductListPage categoryType={'MEN'} /> },
            { path: 'womens', element: <ProductListPage categoryType={'WOMEN'} /> },
            { path: 'kids', element: <ProductListPage categoryType={'KID'} /> },
            { path: 'product/:slug', element: <ProductDetails />, loader: loadProductBySlug },
        ],
        },
        {
            path: '/v1',
            element: <AuthenticationWrapper />,
            children: [
                {
                    path: 'login',
                    element: <Login />
                },
                {
                    path: 'register',
                    element: <Register />,
                }
            ]
        },
        {
            path: '/oauth2/callback',
            element: <OAuth2LoginCallback/>,
        },
        {
            path: '/cart-items',
            element: <Cart/>
        },
        {
            path: '/account-details',
            element: <AuthRoute><Account/></AuthRoute>,
            children: [
                {
                    path: 'profile',
                    element: <AuthRoute><Profile/></AuthRoute>
                },
                {
                    path: 'orders',
                    element: <AuthRoute><Order/></AuthRoute>
                },
                {
                    path: 'settings',
                    element: <AuthRoute><Setting/></AuthRoute>
                },
               
            ]
        },
        {
            path: '/checkout',
            element: <AuthRoute><Checkout/></AuthRoute>
        },
        {
            path: '/payment',
            element: <AuthRoute><PaymentPage/></AuthRoute>
        },
        {
            path: '/confirmPayment',
            element: <ConfirmPayment/>
        },
        {
            path: 'orderConfirmed',
            element: <OrderSuccessPage/>
        }
    ]);

export default router;