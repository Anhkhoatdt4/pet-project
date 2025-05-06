interface OrderRequest {
  userId: string;
  addressId: string;
  totalAmount?: number;
  paymentMethod: string;
  expectedDeliveryDate: Date;
  orderItemRequests: OrderItemRequests[];
  discount: number;
}

interface OrderItemRequests {
  productId: string;
  productVariantId: string;
  discount: number;
  quantity: number;
}

export const createOrderRequest = (
  cartItems: any[],
  userId: string,
  addressId: string
) => {
  let totalAmount = 0;
  let discount = 0;
  const orderItemRequests = cartItems.map((cartItem: any) => {
    totalAmount += cartItem.subTotal;
    discount += (cartItem.subTotal * (cartItem.discount || 0)) / 100;

    return {
      productId: cartItem.productId,
      productVariantId: cartItem?.variant?.id,
      discount: cartItem.discount || 0,
      quantity: cartItem?.quantity || 1,
    };
  });

  totalAmount = parseFloat(totalAmount.toFixed(2));
  // Tạo request
  const request: OrderRequest = {
    userId,
    addressId,
    totalAmount,
    paymentMethod: "CARD",
    expectedDeliveryDate: new Date(),
    discount,
    orderItemRequests,
  };

  return request;
};

export const getStepCount = {
  PENDING: 0,
  PROCESSING: 1,
  CONFIRMED: 1,
  SHIPPED: 2,
  DELIVERED: 3,
};

// {
//     "userId": "f4ce3990-74eb-488b-b983-8f6544d96d6a",
//     "orderDate": "2025-04-24T15:30:00Z",
//     "addressId": "566fba66-2c90-420f-b286-33d0dbb6799a",
//     "totalAmount": 100.0,
//     "paymentMethod": "CARD",
//     "discount": 10.0,
//     "expectedDeliveryDate": "2025-04-30T15:30:00Z",
//     "orderItemRequests": [
//       {
//         "productId": "cab4f2e7-1c14-4d91-97a0-c220d90d453e",
//         "productVariantId": "9458390e-9eaa-4b33-9235-1741c0845b08",
//         "discount": 0,
//         "quantity": 1
//       }
//     ]
//   }
