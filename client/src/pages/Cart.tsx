import { useContext, useEffect, useState } from 'react';
import { CustomerContext } from '../context/customer/CustomerContext';
import { FaTrash } from 'react-icons/fa';
import { CheckoutItem } from '../models/CheckoutItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { itemsInCart, removeProduct, customer } = useContext(CustomerContext);
  const [grandTotal, setGrandTotal] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let total = 0;
    itemsInCart.forEach((item) => (total += item.price * item.quantity));
    setGrandTotal(total);
  }, [itemsInCart]);

  useEffect(() => {
    if (customer !== '') {
      setIsLoggedIn(true);
      console.log(customer);
    } else {
      setIsLoggedIn(false);
    }
  }, [customer]);

  const handleCheckout = async () => {
    const checkoutItems = itemsInCart.map(
      (item) => new CheckoutItem(item.productId, item.quantity)
    );

    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + '/stripe/create-checkout-session',
        {
          checkoutItems,
          customer,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 401) {
        console.log('You are not logged in');
        return;
      }

      if (res.status === 200) {
        localStorage.setItem('sessionId', JSON.stringify(res.data.sessionId));
        window.location = res.data.url;
        // Spara sessionId i localstorage för att kunna hämta det i verifySession
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id: string) => {
    removeProduct(id);
  };

  return (
    <div className="w-1/2 mx-auto">
      <ul>
        {itemsInCart.length !== 0 ? (
          itemsInCart.map((item, index) => (
            <li
              key={`${item.productId}_${index}`}
              className="flex justify-between px-2 py-2 my-2 w-full border-b-2"
            >
              <h2 className="w-[40%] inline">{item.name}</h2>
              <span>Antal: {item.quantity}</span>
              <span>Pris: {item.price} SEK</span>
              <button onClick={() => handleDelete(item.productId)}>
                <FaTrash className="inline" />
              </button>
            </li>
          ))
        ) : (
          <p className="text-center text-2xl">Din varukorg är tom.</p>
        )}
      </ul>
      {itemsInCart.length !== 0 && (
        <div>
          <p className="py-2 my-2 px-2 font-semibold">
            Total: {grandTotal} SEK
          </p>
          {isLoggedIn ? (
            <button
              onClick={handleCheckout}
              className="bg-green-400 py-2 ml-2 px-5 hover:bg-green-600 uppercase rounded-md"
            >
              Betala
            </button>
          ) : (
            <div className="ml-2">
              <p className="mb-2 italic">
                Du måste vara inloggad för att lägga en beställning.
              </p>
              <button
                onClick={() => navigate('/login')}
                className="bg-green-300 py-2 px-4 hover:bg-green-400 rounded-md"
              >
                Logga in
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Cart;
