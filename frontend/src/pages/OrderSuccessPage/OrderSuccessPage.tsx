import { CheckCircle } from "lucide-react";
import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import background from "~/assets/img/bg-thankyou.jpg"

const OrderSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = useMemo(() => {
    const query = new URLSearchParams(location.search);
    const orderId = query.get("orderId");
    return orderId;
  }, [location.search]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="flex justify-center items-center space-x-8">
        {/* Hình ảnh bên trái */}
        <div className="flex-shrink-0">
          <img src={background} className="w-[700px] object-contain" alt="bg-orderConfirmed" />
        </div>

        {/* Nội dung bên phải */}
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md text-center">
          <CheckCircle className="mx-auto text-green-500 w-16 h-16 mb-4" />
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Thank you for shopping with us!</h1>
          <p className="text-gray-600 mb-2">Your order has been successfully placed.</p>
          <p className="text-gray-700 mb-6">
            Your order ID is: <strong className="text-indigo-600">{orderId}</strong>
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate(`/orders/${orderId}`)}
              className="px-6 py-2 rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition"
            >
              Track Your Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
