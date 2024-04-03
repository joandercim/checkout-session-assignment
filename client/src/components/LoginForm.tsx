import { ChangeEvent, useContext, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { CustomerContext } from '../context/customer/CustomerContext';
import { Customer } from '../models/Customer';
import { CustomerLocation } from '../models/CustomerLocation';

const LoginForm = () => {
  const [isRegistered, setIsRegistered] = useState(true);
  const { login, createCustomer } = useContext(CustomerContext);

  const [newCustomerInput, setNewCustomerInput] = useState<Customer>(
    new Customer('', '', '', '', '', new CustomerLocation('', '', '', ''))
  );

  const [inputEmail, setInputEmail] = useState('');
  const [inputPass, setInputPass] = useState('');

  const handleLogin = async () => {
    const statusCode = await login(inputEmail, inputPass);

    if (statusCode === 200) {
      console.log(statusCode);
    } else if (statusCode === 401) {
      console.log(statusCode);
    } else {
      console.log(statusCode);
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

  return (
    <div className="border max-w-80 mx-auto p-2 relative">
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
      <form>
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
              name="firstname"
              id="firstname"
              placeholder="Förnamn"
            />
            <input
              type="text"
              className="p-2 rounded-md m-2 border"
              name="lastname"
              id="lastname"
              placeholder="Efternamn"
            />
            <input
              type="email"
              className="p-2 rounded-md m-2 border"
              name="email"
              id="email"
              placeholder="E-post"
            />
            <input
              type="text"
              className="p-2 rounded-md m-2 border"
              name="street"
              id="street"
              placeholder="Gatuadress"
            />
            <input
              type="text"
              className="p-2 rounded-md m-2 border"
              name="streetnumber"
              id="streetnumber"
              placeholder="Gatunummer"
            />
            <input
              type="text"
              className="p-2 rounded-md m-2 border"
              name="zip"
              id="zip"
              placeholder="Postnummer"
            />
            <input
              type="text"
              className="p-2 rounded-md m-2 border"
              name="city"
              id="city"
              placeholder="Stad"
            />
            <input
              type="password"
              className="p-2 rounded-md m-2 border"
              name="password"
              id="password"
              placeholder="Lösenord"
            />
          </div>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="m-2 px-4 py-2 rounded-md border shadow-md active:shadow-none bg-green-300 hover:bg-green-400"
        >
          {isRegistered ? 'Logga in' : 'Skapa konto'}
        </button>
        {!isRegistered && (
          <button className="go-back-container inline-block absolute left-2 top-2 text-sm opacity-50 hover:opacity-90">
            <FaArrowLeft className="inline" />{' '}
            <span>Tillbaka till inloggning</span>
          </button>
        )}
      </form>
    </div>
  );
};
export default LoginForm;
