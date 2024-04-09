import { useContext, useEffect, useState } from 'react';
import { CustomerContext } from '../context/customer/CustomerContext';
import { Link } from 'react-router-dom';
import { IOrder } from '../models/IOrder';
import axios from 'axios';
import PrevOrder from '../components/PrevOrder';

const Profile = () => {
  const { customer, logout } = useContext(CustomerContext);

  const [customerOrders, setCustomerOrders] = useState<IOrder[]>();
  
  useEffect(() => {
    if (customerOrders || !customer) return;

    const fetchOrders = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/customers/orders/${customer?.email}`
      );

      setCustomerOrders(res.data.orders);
    };

    fetchOrders();
  });

  return customer ? (
    <>
    <div>
      <h2 className='text-2xl'>{customer?.name}</h2>
      <hr className='mb-1 font-semibold mt-2'/>
      <h2 className='italic'>Tidigare ordrar</h2>
      {customerOrders && (
        <ul className='mb-4'>
          {customerOrders?.map((order) => <PrevOrder key={order.timestamp} order={order} />)}
        </ul>
      )}
    </div>
      <div className='flex justify-end mt-10 mr-2'>
      <button
        onClick={logout}
        className="px-3 py-1 rounded-md border shadow-md active:shadow-none bg-red-300 hover:bg-red-400"
      >
        Logga ut
      </button>
      </div>
      </>
  ) : (
    <h2 className="text-center text-2xl">
      <Link className="underline underline-offset-4" to={'/login'}>
        Logga in
      </Link>{' '}
      för att se din profil.
    </h2>
  );
};
export default Profile;
