import { createBrowserRouter } from 'react-router-dom';
import Layout from '../pages/Layout';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Checkout from '../pages/Checkout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/products', element: <Products /> },
      { path: '/checkout', element: <Checkout /> },
    ],
  },
]);
