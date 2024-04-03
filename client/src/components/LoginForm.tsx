import { ChangeEvent, useContext, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { CustomerContext } from '../context/customer/CustomerContext';
import { Customer } from '../models/Customer';
import { CustomerLocation } from '../models/CustomerLocation';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [isRegistered, setIsRegistered] = useState(true);
  const { login, logout, createCustomer, customer } = useContext(CustomerContext);

  const navigate = useNavigate();

  const [newCustomerInput, setNewCustomerInput] = useState<Customer>(
    new Customer('', '', '', '', new CustomerLocation('', '', ''))
  );

  const [inputEmail, setInputEmail] = useState('');
  const [inputPass, setInputPass] = useState('');

  const handleLogin = async () => {
    const statusCode = await login(inputEmail, inputPass);

    if (statusCode === 200) {
      setInputEmail('');
      setInputPass('');
      navigate('/')
    } else if (statusCode === 401) {
      console.log(statusCode);
    } else {
      console.log(statusCode);
    }
  };

  const handleCreateCustomer = () => {
    createCustomer(newCustomerInput);
  };

  const handleCreateCustomerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    if (['street', 'city', 'zipCode'].includes(name)) {
      setNewCustomerInput((prevInput) => {
        return {
          ...prevInput,
          location: {
            ...prevInput.location,
            [name]: e.target.value,
          },
        };
      });
    } else {
      setNewCustomerInput({ ...newCustomerInput, [name]: e.target.value });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isRegistered) {
      if (e.target.name === 'email') {
        setInputEmail(e.target.value);
      } else {
        setInputPass(e.target.value);
      }
    }
  };

  const handleLogout = () => {
    logout();
  }

  return (
    <div className="border max-w-80 mx-auto p-2 mt-5 relative shadow-md">
      {customer !== '' && <button onClick={handleLogout}>logout</button>}
      <h1 className="text-center my-8">
        {isRegistered ? (
          <>
            Logga in eller{' '}
            <button
              onClick={() => setIsRegistered(false)}
              className="text-blue-700"
            >
              skapa konto
            </button>
          </>
        ) : (
          'Skapa konto'
        )}
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          isRegistered ? handleLogin() : handleCreateCustomer();
        }}
      >
        {isRegistered ? (
          <div>
            <label htmlFor="email" className="text-sm block ml-2 ">
              E-post
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="p-2 rounded-md mb-3 mx-2 border"
              value={inputEmail}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="password" className="text-sm block ml-2 ">
              Lösenord
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="p-2 rounded-md mb-3 mx-2 border"
              value={inputPass}
              onChange={(e) => handleChange(e)}
            />
          </div>
        ) : (
          <div>
            <input
              type="text"
              className="p-2 rounded-md m-2 border"
              name="name"
              id="name"
              placeholder="Namn"
              value={newCustomerInput.name}
              onChange={(e) => handleCreateCustomerChange(e)}
            />
            <input
              type="email"
              className="p-2 rounded-md m-2 border"
              name="email"
              id="email"
              placeholder="E-post"
              value={newCustomerInput.email}
              onChange={(e) => handleCreateCustomerChange(e)}
            />
            <input
              type="text"
              className="p-2 rounded-md m-2 border"
              name="street"
              id="street"
              placeholder="Gatuadress"
              value={newCustomerInput.location.street}
              onChange={(e) => handleCreateCustomerChange(e)}
            />
            <input
              type="text"
              className="p-2 rounded-md m-2 border"
              name="zipCode"
              id="zipCode"
              placeholder="Postnummer"
              value={newCustomerInput.location.zipCode}
              onChange={(e) => handleCreateCustomerChange(e)}
            />
            <input
              type="text"
              className="p-2 rounded-md m-2 border"
              name="city"
              id="city"
              placeholder="Stad"
              value={newCustomerInput.location.city}
              onChange={(e) => handleCreateCustomerChange(e)}
            />
            <input
              type="password"
              className="p-2 rounded-md m-2 border"
              name="password"
              id="password"
              placeholder="Lösenord"
              value={newCustomerInput.password}
              onChange={(e) => handleCreateCustomerChange(e)}
            />
          </div>
        )}
        <button className="m-2 px-4 py-2 rounded-md border shadow-md active:shadow-none bg-green-300 hover:bg-green-400">
          {isRegistered ? 'Logga in' : 'Skapa konto'}
        </button>
      </form>
      {!isRegistered && (
        <button
          onClick={() => setIsRegistered(true)}
          className="go-back-container inline-block absolute left-2 top-2 text-sm opacity-50 hover:opacity-90">
            <FaArrowLeft className="inline" />{' '}
            <span>Tillbaka till inloggning</span>
          </button>
        )}
    </div>
  );
};
export default LoginForm;
