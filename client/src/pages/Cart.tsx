import { useContext, useEffect, useState } from 'react';
import { CustomerContext } from '../context/customer/CustomerContext';
import { CheckoutItem } from '../models/CheckoutItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ICouponResponse } from '../models/ICouponResponse';
import ClipLoader from 'react-spinners/ClipLoader';
import CartProductsList from '../components/CartProductsList';

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
  const { itemsInCart, customer } =
    useContext(CustomerContext);
  const [grandTotal, setGrandTotal] = useState(0);
  const [promotionCode, setPromotionCode] = useState<string>('');
  const [verifiedDiscount, setVerifiedDiscount] = useState<number | null>();
  const [promitionId, setPromotionId] = useState<string | null>();
  const [selectedServicePoint, setSelectedServicePoint] =
    useState<ISelectedServicePoint | null>();
  const [closestServicePoints, setClosestServicePoints] =
    useState<IServicePoint[]>();
  const [loading, setLoading] = useState(false);

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
    if (closestServicePoints || !itemsInCart.length && !customer) return;
    setLoading(true);
    const getServicePoints = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/postnord/servicepoints/${customer?.location.zipCode}`
        );
        setClosestServicePoints(res.data.servicePoints);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
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
            <form className="promotion-container border w-1/5 mt-4 flex flex-col items-center p-3 shadow-lg max-h-56">
              <h2 className="my-3 font-semibold">Har du en rabattkod?</h2>
              <input
                value={promotionCode}
                onChange={(e) => setPromotionCode(e.target.value)}
                className="rounded-md border p-1 placeholder:italic"
                type="text"
                name="promotion"
                placeholder='SUMMER50'
              />
              <button
                onClick={(e) => {
                  e.preventDefault()
                  handlePromotion();
                }}
                className="bg-green-400 py-1 px-3 my-3 hover:bg-green-500 rounded-md"
              >
                Aktivera
              </button>
            </form>
          )}
          <div className="mx-automax-w[80%] flex-grow">
            <ul>
              {itemsInCart.length !== 0 ? (
                <CartProductsList />
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
                      {Math.ceil((grandTotal / verifiedDiscount) * 100)} SEK
                    </span>
                  )}{' '}
                  {grandTotal} SEK
                </p>
              </div>
            )}
            <div className="flex gap-4">
              {(loading && !closestServicePoints && itemsInCart.length > 0) && (
                <div className="mx-auto">
                  <h4 className="text-center text-xl mb-5">
                    Laddar Postnord Servicepoints...
                  </h4>
                  <ClipLoader
                    color={'blue'}
                    loading={loading}
                    cssOverride={{ display: 'block', margin: 'auto' }}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              )}
              {(closestServicePoints &&
                itemsInCart.length > 0) && 
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
                      <p>
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
        {itemsInCart.length > 0 && (
          <>
            {customer ? (
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
          </>
        )}
      </div>
    </>
  );
};
export default Cart;
