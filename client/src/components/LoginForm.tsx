import { ChangeEvent, useContext, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { CustomerContext } from '../context/customer/CustomerContext';
import { Customer } from '../models/Customer';
import { CustomerLocation } from '../models/CustomerLocation';
import { useNavigate } from 'react-router-dom';
import { motion} from 'framer-motion';
import axios from 'axios';

const LoginForm = () => {
  const [isRegistered, setIsRegistered] = useState(true);
  const [newCustomerInput, setNewCustomerInput] = useState<Customer>(
    new Customer('1', '', '', '', new CustomerLocation('', '', ''))
  );
  const [inputEmail, setInputEmail] = useState('');
  const [inputPass, setInputPass] = useState('');

  const [loginFailed, setLoginFailed] = useState<String>();
  const [createCustomerFailed, setCreateCustomerFailed] = useState<String>();

  const [shake, setShake] = useState(false);

  const { login } = useContext(CustomerContext);

  const navigate = useNavigate();

  const handleLogin = async () => {
    const statusCode = await login(inputEmail, inputPass);

    if (statusCode === 200) {
      setInputEmail('');
      setInputPass('');
      navigate('/');
    } else if (statusCode === 401) {
      setLoginFailed('Fel lösenord eller e-post.');

      setShake(true);

      setTimeout(() => {
        setShake(false);
      }, 300);

      setTimeout(() => {
        setLoginFailed(undefined);
      }, 4000);
      return;
    } else {
      setLoginFailed('Något gick tyvärr fel.');
      return;
    }
  };

  const handleCreateCustomer = async () => {
    try {
      const dbres = await axios.post(
        import.meta.env.VITE_API_URL + '/customers/create',
        newCustomerInput
      );

      if (dbres.status !== 201) {
        console.log('Fel vid skapande av kund eller Stripe-kund');
        setCreateCustomerFailed('Något gick tyvärr fel.')
        return;
      }
      
      console.log('Customer created in stripe and db!');
      setIsRegistered(true)
    } catch (error) {
      setCreateCustomerFailed('Något gick tyvärr fel.')
      console.error('Fel vid skapande av kund eller Stripe-kund:', error);
    }
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

  const shakeVariants = {
    initial: {
      scale: 1,
    },
    animate: {
      scale: 1.01,
      transform: [
        'rotate(1deg)',
        'rotate(-1deg)',
        'rotate(1deg)',
      ],
      transition: {
        transform: {
          duration: 0.2,
        },
      },
    },
    exit: {
      scale: 1,
      transform: 'rotate(0deg)',
      transition: {
        transform: {
          duration: .1
        }
      }
    },
  };

  return (
    <motion.div
      initial={{ scale: 1 }}
      variants={shakeVariants}
      animate={shake ? 'animate' : 'exit'}
      className="border max-w-80 mx-auto p-2 mt-5 relative shadow-md"
    >
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
      {loginFailed && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.2 } }}
          exit={{ opacity: 0 }}
          className="absolute -top-4 italic bg-red-400 text-white p-2 mx-4 rounded-full left-0 right-0 text-center"
        >
          {loginFailed ? loginFailed : createCustomerFailed}
        </motion.p>
      )}
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
              required
            />
            <input
              type="email"
              className="p-2 rounded-md m-2 border"
              name="email"
              id="email"
              placeholder="E-post"
              value={newCustomerInput.email}
              onChange={(e) => handleCreateCustomerChange(e)}
              required
            />
            <input
              type="text"
              className="p-2 rounded-md m-2 border"
              name="street"
              id="street"
              placeholder="Gatuadress"
              value={newCustomerInput.location.street}
              onChange={(e) => handleCreateCustomerChange(e)}
              required
            />
            <input
              type="text"
              className="p-2 rounded-md m-2 border"
              name="zipCode"
              id="zipCode"
              placeholder="Postnummer"
              value={newCustomerInput.location.zipCode}
              onChange={(e) => handleCreateCustomerChange(e)}
              required
            />
            <input
              type="text"
              className="p-2 rounded-md m-2 border"
              name="city"
              id="city"
              placeholder="Stad"
              value={newCustomerInput.location.city}
              onChange={(e) => handleCreateCustomerChange(e)}
              required
            />
            <input
              type="password"
              className="p-2 rounded-md m-2 border"
              name="password"
              id="password"
              placeholder="Lösenord"
              value={newCustomerInput.password}
              onChange={(e) => handleCreateCustomerChange(e)}
              required
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
          className="go-back-container inline-block absolute left-2 top-2 text-sm opacity-50 hover:opacity-90"
        >
          <FaArrowLeft className="inline" />{' '}
          <span>Tillbaka till inloggning</span>
        </button>
      )}
    </motion.div>
  );
};
export default LoginForm;
