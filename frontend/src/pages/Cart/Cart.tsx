import React, { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link , useNavigate } from "react-router-dom";
import DeleteIcon from "~/components/common/DeleteIcon";
import Navigation from "~/components/Navigation/Navigation";
import { QuantityInput } from "~/components/QuantityInput/QuantityInput";
import { updateCartAction , deleteItemFromCart} from "~/store/actions/cartAction";
import { removeFromCart, selectCartItems } from "~/store/features/cart";
import { customStyles } from "~/styles/modal";
import { isTokenValid } from "~/utils/jwt-helper";
import ReactModal from "react-modal";

const headers = [
  "Product Details",
  "Price",
  "Quantity",
  "Shipping",
  "SubTotal",
  "Action",
];

interface DeleteItemType {
    productId: string;
    variantId: string;
}

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onChangeQuantity = useCallback(
    (value: number, productId: string, variantId: string) => {
      console.log("Received:", value);
      dispatch(updateCartAction(variantId, value));
    },
    [dispatch]
  );

  const [modalIsOpen , setModalIsOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<DeleteItemType | null>(null);

  const onDeleteProduct = useCallback((productId:string , variantId: string) => {
    console.log("Product delete requested:", productId, variantId);  // Log khi nhấn vào Delete icon
    setModalIsOpen(true);
    setDeleteItem({
        productId: productId, 
        variantId: variantId
    })
  },[])

  const onCloseModal = useCallback(() => {
    if (!deleteItem) {
        console.log("Modal closed without removing item");
    }
    setDeleteItem(null);
    setModalIsOpen(false);
}, [deleteItem]);

  const onDeleteItem = useCallback(() => {
    if (!deleteItem) return;
    console.log("Delete confirmed:", deleteItem);
    dispatch(removeFromCart({
        productId : deleteItem.productId,
        variantId : deleteItem.variantId
    }));
    setModalIsOpen(false);
  }, [deleteItem , dispatch])

  const subTotal = useMemo(() => {
    let totalValue = 0;
    cartItems.map((item : any) => {
        totalValue += item?.subTotal
    });
    return totalValue?.toFixed(2);
  }, [cartItems])

  const isLoggedIn = useMemo(() => {
    return isTokenValid();
  }, [])

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navigation />

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
                        onDeleteProduct(cartItem?.productId, cartItem?.variant?.id)
                      }
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        contentLabel="Remove Item"
        appElement={document.getElementById('root') || document.body}
      >
        <p>Are you sure want to remove this item ?</p>
        <div className="flex justify-between p-4">
            <button className="h-[48px]" onClick={onCloseModal}>Cancel</button>
            <button className="px-2 h-[43px] w-[80px] bg-black text-white rounded-lg border" onClick={onDeleteItem}>Remove</button>
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