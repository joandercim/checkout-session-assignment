import axios from 'axios';
import { useEffect, useState } from 'react';

const Success = () => {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (isVerified) return;
    const verifySession = async () => {
      const sessionId: string | null = localStorage.getItem('sessionId');

      if (sessionId) {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/stripe/verify-checkout-session/`,
          {
            sessionId: JSON.parse(sessionId),
          }
        );

        setIsVerified(res.data.verified);
      }
    };

    verifySession();
  }, []);
  return <div>{!isVerified ? 'Laddar...' : 'Tack för din order!'}</div>;
};
export default Success;
