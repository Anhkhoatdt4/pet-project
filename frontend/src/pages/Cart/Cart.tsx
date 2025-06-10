import React, { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "~/components/common/DeleteIcon";
import Navigation from "~/components/Navigation/Navigation";
import { QuantityInput } from "~/components/QuantityInput/QuantityInput";
import {
  updateCartAction,
  deleteItemFromCart,
} from "~/store/actions/cartAction";
import { removeFromCart, selectCartItems } from "~/store/features/cart";
import { customStyles } from "~/styles/modal";
import { isTokenValid } from "~/utils/jwt-helper";
import ReactModal from "react-modal";
import emptyCart from "~/assets/img/emptyCart.jpg";

const headers = [
  "Product Details",
  "Price",
  "Quantity",
  "Shipping",
  "SubTotal",
  "Action",
];

const coupons: { [key: string]: number } = {
  DISCOUNT10: 10,
  DISCOUNT15: 15,
  DISCOUNT20: 20,
};

interface DeleteItemType {
  productId: string;
  variantId: string;
}

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const onChangeQuantity = useCallback(
    (value: number, productId: string, variantId: string) => {
      console.log("Received:", value);
      dispatch(updateCartAction(variantId, value));
    },
    [dispatch]
  );

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<DeleteItemType | null>(null);

  const onDeleteProduct = useCallback(
    (productId: string, variantId: string) => {
      // console.log("Product delete requested:", productId, variantId); // Log khi nhấn vào Delete icon
      setModalIsOpen(true);
      setDeleteItem({
        productId: productId,
        variantId: variantId,
      });
    },
    []
  );

  const onCloseModal = useCallback(() => {
    if (!deleteItem) {
      console.log("Modal closed without removing item");
    }
    setDeleteItem(null);
    setModalIsOpen(false);
  }, [deleteItem]);

  const onDeleteItem = useCallback(() => {
    if (!deleteItem) return;
    // console.log("Delete confirmed:", deleteItem);
    dispatch(
      removeFromCart({
        productId: deleteItem.productId,
        variantId: deleteItem.variantId,
      })
    );
    setModalIsOpen(false);
  }, [deleteItem, dispatch]);

  const subTotal = useMemo(() => {
    let totalValue = 0;
    cartItems.map((item: any) => {
      totalValue += item?.subTotal;
    });
    return totalValue?.toFixed(2);
  }, [cartItems]);

  const isLoggedIn = useMemo(() => {
    return isTokenValid();
  }, []);

  const totalAfterDiscount = useMemo(() => {
    const total = parseFloat(subTotal || "0");
    const discountAmount = (total * discount) / 100;
    let totalValueAfterDiscount = (total - discountAmount).toFixed(2);
    // console.log("totalValueAfterDiscount : ", totalValueAfterDiscount);
    return totalValueAfterDiscount;
  }, [subTotal, discount]);

  const applyDiscount = useCallback(() => {
    if (coupons[couponCode]) {
      setDiscount(coupons[couponCode]);
      console.log(`Discount applied: ${coupons[couponCode]}%`);
    } else {
      setDiscount(0);
      console.log("Invalid coupon code");
    }
  }, [couponCode]);

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyDiscount();
  };

  const handleCheckoutClick = () => {
    if (isLoggedIn) {
      navigate("/checkout", {
        state : {totalAfterDiscount : totalAfterDiscount || undefined},
      });
    } else {
      navigate("/v1/login");
    }
  };

  return (
    <>
      {}
      <div className="flex flex-col min-h-screen">
        <Navigation />

        {cartItems?.length > 0 ? (
          <div className="flex-1 p-4 mt-[60px]">
            {" "}
            {/* Thêm margin-top để tránh che khuất */}
            <div>
              <p>Home / Cart </p>
            </div>
            <table className="w-full text-lg">
              <thead className="text-sm bg-black text-white uppercase">
                {headers.map((header: any) => {
                  return (
                    <th
                      key={header}
                      scope="col"
                      className="px-6 py-3  border-r-2 border-r-white"
                    >
                      {header}
                    </th>
                  );
                })}
              </thead>
              <tbody>
                {cartItems?.map((cartItem: any, index: any) => (
                  <tr
                    key={index}
                    className="p-4 bg-white border-b hover:bg-gray-100"
                  >
                    <td>
                      <div className="flex p-4">
                        {/* Ảnh sản phẩm */}
                        <img
                          src={cartItem.thumbnail}
                          alt={"product-" + index}
                          className="w-[120px] h-[120px] object-cover rounded-lg shadow-md"
                        />
                        <div className="flex flex-col text-sm px-2 text-gray-700">
                          <p className="font-semibold text-lg text-black">
                            {cartItem?.name || "Name"}
                          </p>
                          <p className="text-gray-500">
                            Size: {cartItem.variant.size}
                          </p>
                          <p className="text-gray-500">
                            Color: {cartItem.variant.color}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-center text-sm text-gray-600">
                        ${cartItem?.price}
                      </p>
                    </td>
                    <td>
                      <QuantityInput
                        max={3}
                        quantity={cartItem?.quantity}
                        onChangeQuantity={(value: any) =>
                          onChangeQuantity(
                            value,
                            cartItem?.productId,
                            cartItem?.variant?.id
                          )
                        }
                      />
                    </td>
                    <td>
                      <p className="text-center text-sm text-gray-600">FREE</p>
                    </td>

                    <td>
                      <p className="text-center text-sm text-gray-600">
                        ${cartItem?.subTotal}
                      </p>
                    </td>
                    <td>
                      <button
                        className="flex justify-center items-center w-full"
                        onClick={() =>
                          onDeleteProduct(
                            cartItem?.productId,
                            cartItem?.variant?.id
                          )
                        }
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6 flex justify-between items-center p-4 bg-gray-100">
              <div className="ml-4 pl-2">
                <p className="text-lg font-bold">Discount Coupon</p>
                <p className="text-sm text-gray-600">Enter your coupon code</p>
                <form onSubmit={handleCouponSubmit}>
                  <input
                    type="text"
                    className="w-[200px] h-[40px] mt-2 border-gray-500 p-2 hover:outline-none rounded-lg"
                    placeholder="Enter code"
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button
                    className="w-[80px] h-[40px] bg-black text-white rounded-lg mt-2 hover:scale-105"
                    type="submit"
                  >
                    Apply
                  </button>
                </form>
              </div>

              <div className="flex flex-col justify-end sm:flex-row sm:items-center sm:justify-end w-full">
                <div className="text-left sm:text-right">
                  <p className="text-md font-normal text-gray-700 mr-[85px]">
                    Total Items: {cartItems.length}
                  </p>
                  <p className="text-md font-normal text-gray-700 mr-[90px]">
                    Shipping: $0
                  </p>
                  {discount > 0 && (
                    <p className="mt-2 text-md text-gray-700 mr-[20px]">
                      Discount Amount: $
                      {((parseFloat(subTotal || "0") * discount) / 100).toFixed(
                        2
                      )}
                    </p>
                  )}
                  {}
                  <p className="mt-2 text-[19px] text-black font-semibold mr-[16px] border-b-2 border-gray-300 pr-[18px]">
                    SubTotal: ${subTotal}
                  </p>
                  {discount > 0 && (
                    <p className="mt-2 text-xl font-semibold text-black mr-2">
                      Grand Total: ${totalAfterDiscount}
                    </p>
                  )}

                  <button
                    onClick={handleCheckoutClick}
                    className="px-6 py-3 mt-2 mr-4 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-200"
                  >
                    {isLoggedIn ? "Proceed to Checkout" : "Login to Checkout"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full items-center text-center mt-40">
            <div className="flex justify-center">
              <img
                src={emptyCart}
                className="w-[380px] h-[280px] "
                alt="empty-cart"
              />
            </div>
            <p className="text-3xl font-bold">Your cart is empty</p>
            <div className="p-4">
              <Link
                to={"/"}
                className="w-full p-2 items-center h-[48px] bg-black border rounded-lg mt-2 text-white hover:bg-gray-800"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        contentLabel="Remove Item"
        appElement={document.getElementById("root") || document.body}
      >
        <p>Are you sure want to remove this item ?</p>
        <div className="flex justify-between p-4">
          <button className="h-[48px]" onClick={onCloseModal}>
            Cancel
          </button>
          <button
            className="px-2 h-[43px] w-[80px] bg-black text-white rounded-lg border"
            onClick={onDeleteItem}
          >
            Remove
          </button>
        </div>
      </ReactModal>
    </>
  );
};

export default Cart;

// Props	Ý nghĩa
// isOpen={modalIsOpen}	Modal mở (true) hay đóng (false). Bạn điều khiển nó bằng biến modalIsOpen trong React state.
// onRequestClose={onCloseModal}	Hàm callback khi user muốn đóng Modal (bấm ESC hoặc click ra ngoài). Hàm onCloseModal sẽ đổi modalIsOpen thành false.
// style={customStyles}	Style tùy chỉnh cho Modal (bạn sẽ định nghĩa customStyles ở ngoài).
// contentLabel="Remove Item"	Label dành cho trợ năng (accessibility), giúp máy đọc (screen reader) hiểu nội dung Modal là gì. (Không ảnh hưởng giao diện).
