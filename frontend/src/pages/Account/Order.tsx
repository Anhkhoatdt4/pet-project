import { error } from "console";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrderAPI, fetchOrderApi } from "~/api/order";
import Spinner from "~/components/Spinner/Spinner";
import { setLoading } from "~/store/features/common";
import { cancelOrder, loadOrders, selectAllOrders } from "~/store/features/user";
import moment from "moment";
import ProgressBar from "~/components/ProgressBar/ProgressBar";
import { getStepCount } from "~/utils/order-utils";

interface Address {
  id: string;
  name: string | null;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
}

interface ProductVariant {
  id: string;
  color: string;
  size: string;
  stockQuantity: number;
}

interface Resource {
  id: string;
  name: string;
  url: string;
  isPrimary: boolean;
  type: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  rating: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
  productVariants: ProductVariant[];
  resources: Resource[];
  newArrival: boolean;
}

interface OrderItem {
  // id: string;
  // itemPrice: number;
  // productVariantId: string | null;
  product: Product;
  // quantity: number;
  id: string;
  name: string;
  price: number;
  quantity: number;
  url: string;
  slug: string;
}

interface Order {
  id: string;
  orderDate: string;
  orderStatus: string;
  totalAmount: number;
  shipmentNumber: string;
  expectedDeliveryDate: string;
  orderItemDetails: OrderItem[];
  address: Address;
  status: string;
}
const Order = () => {
  const dispatch = useDispatch();
  const allOrders = useSelector(selectAllOrders);
  const [selectedFilter, setSelectedFilter] = useState("ACTIVE");
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState("");
  const isLoading = useSelector(
    (state: { commonState: { loading: boolean } }) => state.commonState.loading
  );

  useEffect(() => {
    dispatch(setLoading(true));
    fetchOrderApi()
      .then((res) => {
        dispatch(loadOrders(res));
      })
      .catch((error: any) => {
        throw error;
      })
      .finally(() => dispatch(setLoading(false)));
  }, [dispatch]);

  useEffect(() => {
    const displayOrders: Order[] = allOrders
      .map((order: Order) => {
        const validOrderItems = order.orderItemDetails
          .map((orderItem: OrderItem) => {
            const isProductObject = typeof orderItem.product === "object";
            const product = isProductObject
              ? (orderItem.product as Product)
              : undefined;
            if (!product) return undefined;

            return {
              id: orderItem.id,
              product: orderItem.product,
              name: product.name,
              price: product.price,
              quantity: orderItem.quantity,
              url: product.resources?.[0]?.url,
              slug: product.slug,
            };
          })
          .filter(Boolean) as OrderItem[];

        if (validOrderItems.length === 0) return undefined;

        return {
          id: order.id,
          orderDate: order.orderDate,
          orderStatus: order.orderStatus,
          totalAmount: order.totalAmount,
          status: (() => {
            if (
              order.orderStatus === "PENDING" ||
              order.orderStatus === "PROCESSING" ||
              order.orderStatus === "SHIPPED"
            ) {
              return "ACTIVE";
            } else if (
              order.orderStatus === "CONFIRMED" ||
              order.orderStatus === "DELIVERED"
            ) {
              return "COMPLETED";
            } else if (order.orderStatus === "CANCELLED") {
              return "CANCELLED";
            }
            return order.orderStatus;
          })(),
          shipmentNumber: order.shipmentNumber,
          address: order.address,
          expectedDeliveryDate: order.expectedDeliveryDate,
          orderItemDetails: validOrderItems,
        };
      })
      .filter(Boolean) as Order[]; // Bỏ order nào bị undefined

    setOrders(displayOrders);
  }, [allOrders]);

  useEffect(() => {
    console.log(
      "order status:",
      orders.map((order) => order.orderStatus)
    ); // Kiểm tra status các đơn hàng
  }, [orders]);
  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      console.log("value ", value);
      setSelectedFilter(value);
    },
    []
  );

  const onCancelOrder = useCallback ((id : string) => {
    dispatch(setLoading(true));
    cancelOrderAPI(id).then(res => {
      console.log("cancelOrderAPI : " , res);
    }).catch((error: Error) => {
      console.error("Cancel order failed:", error);
      throw error;
    })
    .finally(() => dispatch(setLoading(false)))
  }, [])

  return (
    <>
      <div>
        {orders?.length > 0 && (
          <div className="md:w-[70%] w-full">
            <div className="flex justify-between">
              <h1 className="text-2xl mb-4">My Orders</h1>
              <select
                className="border-2 rounded-lg mb-4 p-2"
                value={selectedFilter}
                onChange={handleOnChange}
              >
                <option value="ACTIVE">Active</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
            {orders?.map((order, index) => {
              return (
                order?.status === selectedFilter && (
                  <div key={index}>
                    <div className="bg-gray-200 p-4 mb-8 rounded-2xl">
                      <p className="text-lg font-bold">
                        Order no. #{order?.id}
                      </p>
                      <div className="flex justify-between mt-2">
                        <div className="flex flex-col text-gray-500 text-sm">
                          <p>
                            Order Date :{" "}
                            {moment(order?.orderDate).format("MMMM DD YYYY")}
                          </p>
                          <p>
                            Expected Delivery Date:{" "}
                            {order.expectedDeliveryDate
                              ? moment(order.expectedDeliveryDate).format(
                                  "MMMM DD YYYY"
                                )
                              : moment(order?.orderDate)
                                  .add(3, "days")
                                  .format("MMMM DD YYYY")}
                          </p>
                        </div>
                        <div className="flex flex-col text-gray-500 text-sm">
                          <p>Order Status : {order?.orderStatus}</p>
                          <button
                            onClick={() => setSelectedOrder(order?.id)}
                            className="text-blue-900 text-right rounded underline cursor-pointer"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>

                    {selectedOrder === order?.id && (
                      <div>
                        {order?.orderItemDetails?.map((orderItem, index) => {
                          console.log("orderItem?.url ", orderItem?.url);

                          return (
                            <div key={index} className="flex gap-4">
                              <img
                                src={orderItem?.url}
                                alt={orderItem?.name}
                                className="w-[120px] h-[120px] object-cover m-2 rounded"
                              />
                              <div className="flex flex-col text-sm py-2 text-gray-600">
                                <p className="font-medium">
                                  {orderItem?.name || "Name"}
                                </p>
                                <p>Quantity {orderItem?.quantity}</p>
                              </div>
                            </div>
                          );
                        })}
                        <div className="flex justify-between">
                          <p>Total : ${order?.totalAmount}</p>
                          <button
                            onClick={() => setSelectedOrder("")}
                            className="text-blue-900 text-right rounded underline cursor-pointer mb-8"
                          >
                            Hide Details
                          </button>
                        </div>
                        {order?.orderStatus !== "CANCELLED" && (
                          <>
                            <ProgressBar
                              stepCount={getStepCount[order?.orderStatus as keyof typeof getStepCount]}
                            />
                            {getStepCount[order?.orderStatus as keyof typeof getStepCount] <= 2 && (
                              <button
                                onClick={() => onCancelOrder(order?.id)}
                                className="bg-black h-[38px] w-[120px] text-white rounded-lg mb-2"
                              >
                                Cancel Order
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )
              );
            })}
          </div>
        )}
      </div>
      
      <div>{isLoading && <Spinner />}</div>
    </>
  );
};

export default Order;
