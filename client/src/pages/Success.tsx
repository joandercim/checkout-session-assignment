import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

const Success = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [countDown, setCountDown] = useState(5)

  const navigate = useNavigate()

  useEffect(() => {
    if (isVerified && orderComplete) {
      countDown > 0 && ((setInterval(() => setCountDown((prev) => prev - 1), 1000)))
      setTimeout(() => {
        localStorage.removeItem('sessionId');
        localStorage.removeItem('servicePoint');
        navigate('/profile')
      }, 5000);
    }

    if (isVerified) return;
    const verifySession = async () => {
      const sessionId: string | null = localStorage.getItem('sessionId');
      const servicePoint: string | null = localStorage.getItem('servicePoint')

      if (sessionId && servicePoint) {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/stripe/verify-checkout-session/`,
          {
            sessionId: JSON.parse(sessionId),
            servicePoint: JSON.parse(servicePoint)
          }
        );

        setIsVerified(res.data.verified);
        setOrderComplete(true)
      }
    };
    
    verifySession();
  }, [isVerified]);
  return (
    <div>{!isVerified && !orderComplete? (
      <div className='mx-auto w-1/5'>
        <h2>Vänta medan vi hanterar din order</h2>
        <ClipLoader
                    color={'blue'}
                    loading={!isVerified}
                    cssOverride={{ display: 'block', margin: 'auto' }}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
      </div>
    ) : <h2>{`Tack för din order! Du omdirigeras om ${countDown} sekunder.`}</h2>}</div>
  );
};
export default Success;
