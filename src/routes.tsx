import { createBrowserRouter } from 'react-router-dom';
import ProductListPage from './pages/ProductListPage/ProductListPage';
import App from './App';
import ProductDetails from './pages/ProductDetailPage/ProductDetails';
import { loadProductById } from '~/components/routes/loadProductById';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: 'mens', element: <ProductListPage categoryType={'MEN'} /> },
            { path: 'womens', element: <ProductListPage categoryType={'WOMEN'} /> },
            { path: 'kids', element: <ProductListPage categoryType={'KID'} /> },
            { path: 'product/:productId', element: <ProductDetails />, loader: loadProductById },
        ],
    },
]);

export default router;