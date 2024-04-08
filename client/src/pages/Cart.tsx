import { useContext, useEffect, useState } from 'react';
import { CustomerContext } from '../context/customer/CustomerContext';
import { FaTrash } from 'react-icons/fa';
import { CheckoutItem } from '../models/CheckoutItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ICouponResponse } from '../models/ICouponResponse';

interface IServicePoint {
  name: string;
  servicePointId: string;
  deliveryAddress: {
    city: string;
    streetName: string;
    streetNumber: string;
    postalCode: string;
  };
}

interface ISelectedServicePoint {
  name: string;
  servicePointId: string;
}

const Cart = () => {
  const { itemsInCart, removeProduct, customer } = useContext(CustomerContext);
  const [grandTotal, setGrandTotal] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [promotionCode, setPromotionCode] = useState<string>('');
  const [verifiedDiscount, setVerifiedDiscount] = useState<number | null>();
  const [promitionId, setPromotionId] = useState<string | null>();
  const [selectedServicePoint, setSelectedServicePoint] =
    useState<ISelectedServicePoint | null>();
  const [closestServicePoints, setClosestServicePoints] =
    useState<IServicePoint[]>();

  const navigate = useNavigate();

  useEffect(() => {
    let total = 0;
    itemsInCart.forEach((item) => (total += item.price * item.quantity));

    if (verifiedDiscount) {
      setGrandTotal(total * (verifiedDiscount / 100));
      return;
    }

    setGrandTotal(total);
  }, [itemsInCart, verifiedDiscount]);

  useEffect(() => {
    if (customer) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [customer]);

  useEffect(() => {
    if (closestServicePoints || itemsInCart.length < 1) return;
    const getServicePoints = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/postnord/servicepoints/${customer?.location.zipCode}`
      );
      setClosestServicePoints(res.data.servicePoints);
    };
    getServicePoints();
  }, [itemsInCart]);

  const handleCheckout = async () => {
    if (!selectedServicePoint) {
      alert('Du måste välja ett utlämningsställe');
      return;
    }

    const checkoutItems = itemsInCart.map(
      (item) => new CheckoutItem(item.productId, item.quantity)
    );

    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + '/stripe/create-checkout-session',
        {
          checkoutItems,
          customer: customer?.email,
          couponId: promitionId,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 401) {
        console.error('You are not logged in');
        return;
      }

      if (res.status === 200) {
        localStorage.setItem(
          'servicePoint',
          JSON.stringify(selectedServicePoint)
        );
        localStorage.setItem('sessionId', JSON.stringify(res.data.sessionId));
        window.location = res.data.url;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id: string) => {
    removeProduct(id);
  };

  const handlePromotion = async () => {
    try {
      const response = await axios.get<ICouponResponse>(
        import.meta.env.VITE_API_URL + '/stripe/coupons'
      );
      const promotionCodes = response.data.promotionCodes.data;

      const isValid = promotionCodes.find(
        (c) => c.name === promotionCode.toUpperCase()
      );

      if (isValid) {
        setVerifiedDiscount(isValid.percent_off);
        setPromotionId(isValid.id);
      }
    } catch (error) {
      console.error('Something went wrong', error);
    }
  };

  const handleServicePointChange = (name: string, servicePointId: string) => {
    setSelectedServicePoint({
      name,
      servicePointId,
    });
  };

  return (
    <>
      <div>
        <div className="flex flex-row-reverse container gap-10">
          {itemsInCart.length !== 0 && (
            <div className="promotion-container border w-1/5 mt-4 flex flex-col items-center p-3 shadow-lg max-h-56">
              <h2 className="my-3 font-semibold">Har du en rabattkod?</h2>
              <input
                value={promotionCode}
                onChange={(e) => setPromotionCode(e.target.value)}
                className="rounded-md border"
                type="text"
                name="promotion"
              />
              <button
                onClick={handlePromotion}
                className="bg-green-400 py-1 px-3 my-3 hover:bg-green-500 rounded-md"
              >
                Aktivera
              </button>
            </div>
          )}
          <div className="mx-auto max-w[80%] flex-grow">
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
                  <span className="block">Total:</span>{' '}
                  {verifiedDiscount && (
                    <span className="text-red-500 line-through italic">
                      {(grandTotal / verifiedDiscount) * 100} SEK
                    </span>
                  )}{' '}
                  {grandTotal} SEK
                </p>
              </div>
            )}
            <div className="flex gap-4">
              {closestServicePoints &&
                itemsInCart.length > 0 &&
                closestServicePoints.map((point) => (
                  <div key={point.servicePointId} className="w-full">
                    <input
                      className="hidden"
                      type="radio"
                      name="servicepoint"
                      id={point.servicePointId}
                      onChange={() =>
                        handleServicePointChange(
                          point.name,
                          point.servicePointId
                        )
                      }
                    />
                    <label
                      className="border rounded-md shadow-md h-32 w-full my-10 block text-center justify-center p-3 hover:bg-gray-50 active:shadow-none cursor-pointer"
                      htmlFor={point.servicePointId}
                    >
                      <p className="font-semibold">{point.name}</p>
                      <p className="">
                        {point.deliveryAddress.streetName}{' '}
                        {point.deliveryAddress.streetNumber}
                      </p>
                      <p className="">{point.deliveryAddress.city}</p>
                    </label>
                  </div>
                ))}
            </div>
          </div>
        </div>
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
    </>
  );
};
export default Cart;
