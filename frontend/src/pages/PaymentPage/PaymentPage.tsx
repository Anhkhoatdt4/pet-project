import { loadStripe, Stripe, StripeElementsOptions } from "@stripe/stripe-js";
import React, { useEffect, ReactNode, useState} from "react";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
import { setLoading } from "~/store/features/common";
import { getUserDetailInfo } from "~/api/authentication/getUserInfo";
import { loadUserInfo } from "~/store/features/user";
import { UserInfo } from '~/types/UserInfo';
interface PaymentFormProps {
  userId?: string;
  addressId?: string;
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "");

const PaymentPage = (props: PaymentFormProps) => {
  const [stripeReady, setStripeReady] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    stripePromise.then((stripe) => {
      if (stripe) {
        console.log("✅ Stripe đã sẵn sàng:", stripe);
        setStripeReady(true);
      } else {
        console.error("❌ Stripe load thất bại!");
      }
    }
  );
  }, []);

  useEffect(() => {
    dispatch(setLoading(true));
    getUserDetailInfo()
      .then((res) => {
        console.log("getUserDetailInfo " , res);
      })
      .catch((err) => {
        console.error("Error: ", err);
        throw new Error(err);
      })
      .finally(() => dispatch(setLoading(false)));
  }, [dispatch]);

  const options: StripeElementsOptions = {
    mode: "payment",
    amount: 1000,
    payment_method_types: ['card', 'cashapp'],
    currency: "usd",
    appearance: {
      theme: "stripe",
    },
  };

  const { userId = "", addressId = "" } = props;

  return (
    <>
      {!stripeReady ? (
        <p>Loading Stripe...</p> // Có thể thay bằng spinner hoặc skeleton
      ) : (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm userId={userId} addressId={addressId} />
        </Elements>
      )}
    </>
  );
};

export default PaymentPage;