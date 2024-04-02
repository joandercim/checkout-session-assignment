import { useContext, useEffect, useState } from 'react';
import { CustomerContext } from '../context/customer/CustomerContext';
import { FaTrash } from 'react-icons/fa';
import { CheckoutItem } from '../models/CheckoutItem';
import axios from 'axios';

const Cart = () => {
  const { itemsInCart } = useContext(CustomerContext);
  const [grandTotal, setGrandTotal] = useState(0);

  // Den här ska uppdateras när något tas bort ur kundvagnen
  useEffect(() => {
    let total = 0;
    itemsInCart.forEach((item) => (total += item.price * item.quantity));

    setGrandTotal(total);
  }, []);

  const handleCheckout = async () => {
    const checkOutItems = itemsInCart.map(
      (item) => new CheckoutItem(item.default_price, item.quantity)
    );

    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + '/stripe/create-checkout-session',
        checkOutItems
      );

      if (res.status === 200) {
        window.location = res.data.url;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-1/2 mx-auto">
      <ul>
        {itemsInCart.length !== 0 ? (
          itemsInCart.map((item, index) => (
            <li
              key={`${item.default_price}_${index}`}
              className="flex justify-between px-2 py-2 my-2 w-full border-b-2 "
            >
              <h2 className="w-[40%] inline">{item.name}</h2>
              <span>Antal: {item.quantity}</span>
              <span>Pris: {item.price} SEK</span>
              <FaTrash className="inline" />
            </li>
          ))
        ) : (
          <p>No items in cart</p>
        )}
      </ul>
      {itemsInCart.length !== 0 && (
        <div>
          <p className="py-2 my-2 px-2">Total: {grandTotal} SEK</p>
          <button
            onClick={handleCheckout}
            className="bg-green-400 py-2 px-5 hover:bg-green-600 uppercase"
          >
            Betala
          </button>
        </div>
      )}
    </div>
  );
};
export default Cart;
