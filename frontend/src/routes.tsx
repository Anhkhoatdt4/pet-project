import { createBrowserRouter } from 'react-router-dom';
import ProductListPage from './pages/ProductListPage/ProductListPage';
import App from './App';
import ProductDetails from './pages/ProductDetailPage/ProductDetails';
import { loadProductBySlug } from '~/components/routes/loadProductBySlug';
import Login from './pages/Login/Login';
import AuthenticationWrapper from './components/AuthenticationWrapper';
import Register from '~/components/AuthRegister/Register';
import OAuth2LoginCallback from './pages/Login/OAuth2LoginCallback';

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
        }
    ]);

export default router;