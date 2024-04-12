import { useContext } from 'react';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import { CustomerContext } from '../context/customer/CustomerContext';

const Navigation = () => {
  const { itemsInCart, customer } = useContext(CustomerContext);

  let itemsInCartTotal = 0;
  itemsInCart.forEach((item) => (itemsInCartTotal += item.quantity));

  return (
    <div className="navigation-wrapper mb-20">
      <nav className="flex justify-between items-center">
        <div className="left-side-nav">
          <Link to="/" className="block">
            <h1 className='text-2xl font-semibold uppercase'>Färgaffärn</h1>
          </Link>
        </div>
        <div className="right-side-nav">
          <ul className="flex gap-6 items-center h-16">
            <li>
              <NavLink to="/products">Produkter</NavLink>
            </li>
            {!customer ? (
              <li>
                <NavLink to="/login">
                  <button className="border my-2 py-1 px-4 rounded-md bg-orange-200 hover:bg-orange-300">
                    Logga in
                  </button>
                </NavLink>
              </li>
            ) : (
              <li>
                <NavLink to="/profile">
                  <button>
                    <FaUser className="inline text-xl text-gray-600 hover:text-gray-800" />
                  </button>
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/cart">
                <FaShoppingCart className="inline text-xl text-gray-600 hover:text-gray-800" />{' '}
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
