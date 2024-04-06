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
    <div>
      <h2>{customer?.name}</h2>
      <h2>Tidigare ordrar</h2>
      {customerOrders && (
        <ul className='mb-4'>
          {customerOrders?.map((order) => <PrevOrder key={order.timestamp} order={order} />)}
        </ul>
      )}
      <button
        onClick={logout}
        className="px-3 py-1 rounded-md border shadow-md active:shadow-none bg-green-300 hover:bg-green-400"
      >
        Logga ut
      </button>
    </div>
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
