import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <header>header</header>
      <main>
        <Outlet />
      </main>
      <footer>footer</footer>
    </>
  );
};
export default Layout;
