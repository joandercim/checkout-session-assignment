import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const LoginForm = () => {
  const [isRegistered, setIsRegistered] = useState(true);

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
        </button></>
        ) : 
        'Skapa konto'
        }
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
            />
            <label htmlFor="password" className="text-sm block ml-2 ">
              Lösenord
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="p-2 rounded-md mb-3 mx-2 border"
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
        <button className="m-2 px-4 py-2 rounded-md border shadow-md active:shadow-none bg-green-300 hover:bg-green-400">
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
