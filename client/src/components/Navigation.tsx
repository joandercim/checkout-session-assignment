import { useContext } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import { CustomerContext } from '../context/customer/CustomerContext';

const Navigation = () => {
  const { itemsInCart } = useContext(CustomerContext);

  let itemsInCartTotal = 0;
  itemsInCart.forEach((item) => (itemsInCartTotal += item.quantity));

  return (
    <div className="navigation-wrapper">
      <nav className="flex justify-between items-center px-10 ">
        <div className="left-side-nav">
          <Link to="/" className="p-2 block">Logo</Link>
        </div>
        <div className="right-side-nav">
          <ul className="flex gap-6 items-center">
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
            <li>
              <NavLink to="/login">
                <button className="border my-2 py-1 px-4 rounded-md bg-orange-200 hover:bg-orange-300">
                  Login
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart">
                <FaShoppingCart className="inline text-xl text-gray-700" />{' '}
                {itemsInCart.length !== 0 && <span>({itemsInCartTotal})</span>}
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default Navigation;
