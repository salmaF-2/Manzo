import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/stripe-react-components';
import { useState, useEffect } from 'react';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export const StripeProvider = ({ children }) => {
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    stripePromise.then(stripeObj => {
      setStripe(stripeObj);
    });
  }, []);

  if (!stripe) return <div>Loading Stripe...</div>;

  return (
    <Elements stripe={stripe}>
      {children}
    </Elements>
  );
};