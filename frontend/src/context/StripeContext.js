import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/stripe-react';
import { useState, useEffect } from 'react';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export const StripeProvider = ({ children }) => {
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    stripePromise.then(stripeObj => {
      setStripe(stripeObj);
    });
  }, []);

  if (!stripe) return <div>Loading payment system...</div>;

  return (
    <Elements stripe={stripe}>
      {children}
    </Elements>
  );
};