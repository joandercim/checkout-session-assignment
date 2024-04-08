import axios from 'axios';
import { useEffect, useState } from 'react';

const Success = () => {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
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
      }
    };

    verifySession();
  }, [isVerified]);
  return <div>{!isVerified ? 'Laddar...' : 'Tack för din order!'}</div>;
};
export default Success;
