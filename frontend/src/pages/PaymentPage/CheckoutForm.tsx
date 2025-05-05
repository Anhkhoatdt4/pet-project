import React, { ReactNode, useCallback, useState } from "react";
import {
  AddressElement,
  CardElement,
  PaymentElement,
  ShippingAddressElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "~/store/features/cart";
import { createOrderRequest } from "~/utils/order-utils";
import { setLoading } from "~/store/features/common";
import { sendOrderRequest } from "~/api/order";

interface CheckoutFormProps {
  userId: string;
  addressId: string;
}

interface OrderResponse {
  // Cập nhật với các thuộc tính thực tế của phản hồi đơn hàng
  orderId: string;
  paymentMethod: string;
  credentials: any;
}

const CheckoutForm = ({ userId, addressId }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderResponse, setOrderResponse] = useState<OrderResponse | undefined>(
    undefined
  );
  const loading = useSelector((state : {commonState : {isLoading : boolean}} ) => state.commonState.isLoading);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      console.log("Stripe:", stripe)
      console.log("Elements:", elements)
      event.preventDefault();
      const orderRequest = createOrderRequest(cartItems, userId, addressId);
      console.log("orderRequest : ", orderRequest);
      dispatch(setLoading(true));
      setError("");
      setOrderResponse({
        orderId: "",
        paymentMethod: "CARD",
        credentials: {},
      });
      if (elements !== null) {
        const { error } = await elements.submit();
        if (error?.message) {
          console.log('error');
          setError(error.message);
          dispatch(setLoading(false));
          return;
        }
      }
      else {
        console.log('elements is null');
      }

      if (elements){
        sendOrderRequest(orderRequest).then(async res => {
          dispatch(setLoading(true))
          setOrderResponse(res);
          console.log("res " , res);
          
          stripe?.confirmPayment({
            elements,
            clientSecret: res?.credentials?.client_secret,

            confirmParams: {
              payment_method:'pm_card_visa',
              return_url:'http://localhost:5173/confirmPayment'
            }
          }).then(res => {
            console.log("Response ",res);
            dispatch(setLoading(false));
          }).catch(err => {
            throw new Error(err);
          }).finally(() => dispatch(setLoading(false)))
        })
      }
    },
    [addressId, dispatch, userId]
  );
  return (
    <form
      className="items-center p-2 mt-4 w-[620px] h-[320px]"
      onSubmit={handleSubmit}
    >
      <PaymentElement />
      <button
        type="submit"
        className="mt-3 w-[88px] h-[40px] border rounded-lg bg-black text-white font-bold hover:scale-105 hover:text-red-700 hover:bg-white duration-200 transition-all"
      >
        Pay Now
      </button>
      {error && <p className="text-sm pt-4 text-red-600">{error}</p>}
    </form>
  );
};

export default CheckoutForm;
