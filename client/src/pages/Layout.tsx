import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { CustomerProvider } from '../context/customer/CustomerContext';

const Layout = () => {
  return (
    <CustomerProvider>
      <div className="container mx-auto px-10">
        <header>
          <Navigation />
        </header>
        <main className="min-h-[80dvh]">
          <Outlet />
        </main>
        <footer>footer</footer>
      </div>
    </CustomerProvider>
  );
};
export default Layout;
