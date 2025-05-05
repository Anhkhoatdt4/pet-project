import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import React, { useEffect, ReactNode} from "react";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
import { setLoading } from "~/store/features/common";
import { getUserDetailInfo } from "~/api/authentication/getUserInfo";
interface PaymentFormProps {
  userId?: string;
  addressId?: string;
}

const PaymentPage = (props : PaymentFormProps) => {
  const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "";
  const stripePromise = loadStripe(stripeKey);

  const options: StripeElementsOptions = {
    mode: "payment",
    amount: 1000,
    payment_method_types: ['card', 'cashapp'],
    // LƯU Ý QUAN TRỌNG: Stripe yêu cầu amount tính bằng đơn vị nhỏ nhất (cents cho USD)
    // Nếu bạn muốn $12.00 thì phải là 1200
    currency: "usd",
    // Fully customizable with appearance API.
    appearance: {
      theme: "stripe",
    },
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    getUserDetailInfo()
      .then((res) => {
      })
      .catch((err) => {
        console.log("Error: ", err);
        throw new Error(err);
      })
      .finally(() => dispatch(setLoading(false)));
  }, [dispatch]);
  const {userId = "", addressId = ""} = props;
  return (
    <Elements stripe={stripePromise} options={options}>
     <CheckoutForm userId={userId} addressId={addressId}/>   
    </Elements>
  );
};

export default PaymentPage;
