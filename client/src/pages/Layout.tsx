import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { CustomerProvider } from '../context/customer/CustomerContext';

const Layout = () => {
  return (
      <CustomerProvider>
        <header>
          <Navigation />
        </header>
        <main className="min-h-[80dvh]">
          <Outlet />
        </main>
        <footer>footer</footer>
      </CustomerProvider>
  );
};
export default Layout;
