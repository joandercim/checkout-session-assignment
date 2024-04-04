import { createBrowserRouter } from 'react-router-dom';
import Layout from '../pages/Layout';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Cart from '../pages/Cart';
import Login from '../pages/Login';
import Success from '../pages/Success';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Home />, index: true },
      { path: '/products', element: <Products /> },
      { path: '/login', element: <Login /> },
      { path: '/cart', element: <Cart /> },
      { path: '/success', element: <Success /> },
    ],
  },
]);
