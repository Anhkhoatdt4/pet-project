import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetailInfo } from "~/api/authentication/getUserInfo";
import { selectCartItems } from "~/store/features/cart";
import { setLoading } from "~/store/features/common";
import { useLocation, useNavigate } from "react-router-dom";
import cityStates from "~/data/cities.json";
import PaymentPage from "../PaymentPage/PaymentPage";

interface Address {
  id: string;
}

interface UserInfo {
  id: string;
  addressList: Address[];
}
const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] =  useState<UserInfo | null>(null);
  const [cities, setCities] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [addressPhone, setAddressPhone] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const location = useLocation();
  const { totalAfterDiscount } = location.state || {};
  const [deliveryType, setDeliveryType] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const subTotal = useMemo(() => {
    let totalValue = 0;
    cartItems.map((item: any) => {
      totalValue += item.subTotal;
    });
    return totalValue;
  }, [cartItems]);

  const getCityIdFromStateName = (stateName: string) => {
    const normalize = (str: string) =>
      str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    const city = cityStates.find((city) =>
      normalize(stateName).includes(normalize(city.State))
    );
    console.log("city : ", city);
    return city?.Id;
  };

  useEffect(() => {
    dispatch(setLoading(true));
    getUserDetailInfo()
      .then((res) => {
        console.log("res: ", res);
        setUserInfo(res);
        setName(`${res.firstName} ${res.lastName}`);
        setEmail(res.email || "");

        if (res.addressList && res.addressList.length > 0) {
          const defaultAddress = res.addressList[0];
          console.log("defaultAddress: ", defaultAddress);
          setSelectedAddress(defaultAddress);
          if (defaultAddress.state) {
            const stateId = defaultAddress.state;
            const IdStateFromUser = getCityIdFromStateName(stateId);
            if (IdStateFromUser !== undefined) {
              setSelectedCity(IdStateFromUser.toString());
            }
          }

          setAddress(
            `${defaultAddress.street}, ${defaultAddress.city}, ${defaultAddress.state} ${defaultAddress.zipCode}`
          );
          setPhone(defaultAddress.phoneNumber);
          setAddressPhone(defaultAddress.phoneNumber);
        }
      })
      .catch((err) => {
        console.error("Lỗi khi lấy thông tin người dùng:", err);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch]);

  useEffect(() => {
    fetch("/city/city.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Lỗi khi tải file JSON");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCities(data);
      })
      .catch((err) => {
        console.error("Lỗi khi tải dữ liệu JSON:", err);
      });
  }, []);

  const handleSelectAddress = (address: any) => {
    setSelectedAddress(address);
    setAddress(
      `${address.street}, ${address.city}, ${address.state} ${address.zipCode}`
    );
    setAddressPhone(address.phoneNumber);
  };

  const handleDeliveryTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const type = event.target.value;
    // console.log('type : ' , type);
    setDeliveryType(type);
    const today = new Date();
    const dateToAdd = type === "FAST" ? 3 : 4;
    today.setDate(today.getDate() + dateToAdd);
    // console.log("today.toISOString() " , today.toISOString());
    const formattedDate = today.toISOString().split("T")[0];
    setDeliveryDate(formattedDate);
  };

  return (
    <>
      <div className="p-8 flex mt-[-30px]">
        <div className="flex flex-col ml-[173px] w-[50%]">
          <div className=" mt-[10px]">
            <p className="uppercase font-bold">HEAVEN SHOP</p>
            <div
              className="h-[18px] w-[570px] p-4 flex"
              style={{ backgroundColor: "#e9ecef" }}
            >
              <p
                className="mt-[-10px] text-blue-500 text-md hover:text-blue-800 hover:cursor-pointer"
                onClick={() => navigate("/cart-items")}
              >
                Shopping Cart
              </p>
              <p className="mt-[-10px] ml-1 text-md"> &gt; Checkout</p>
            </div>
          </div>
          <div className="w-full">
            <p className="font-bold text-lg mb-2 mt-2">Delivery Infomation</p>
            <div className="flex mb-1">
              <div className="flex flex-col w-[570px]">
                <label className="font-semibold mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border p-2 w-full rounded-lg border-r-4 border-gray-600"
                  placeholder="Your Name"
                />
              </div>
            </div>
            <div className="flex gap-4 mb-4">
              <div className="flex flex-col w-[47%]">
                <label className="font-semibold mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border p-2 w-full rounded-lg border-r-4 border-gray-600"
                  placeholder="Your Email"
                />
              </div>

              <div className="flex flex-col w-[32%]">
                <label className="font-semibold mb-1">Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border p-2 w-full rounded-lg border-r-4 border-gray-600"
                  placeholder="Your Phone"
                />
              </div>
            </div>
            <div className="flex mb-2">
              <div className="flex flex-col w-[570px]">
                <label className="font-semibold mb-1">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border p-2 w-full rounded-lg border-r-4 border-gray-600"
                  placeholder="Your Name"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* City */}
              <div className="flex flex-col w-[25%]">
                <label className="font-semibold mb-1">City</label>
                <select
                  className="border p-2 w-full rounded-lg border-r-4 border-gray-600"
                  value={selectedCity}
                  onChange={(e: any) => {
                    setSelectedCity(e.target.value);
                    setSelectedDistrict("");
                    setSelectedWard("");
                  }}
                >
                  <option value="" className="text-center">
                    -- Select city --
                  </option>
                  {cities.map((city: any) => (
                    <option key={city.Id} value={city.Id}>
                      {city.Name}
                    </option>
                  ))}
                </select>
              </div>

              {/* District */}
              <div className="flex flex-col w-[25%]">
                <label className="font-semibold mb-1">District</label>
                <select
                  className="border p-2 w-full rounded-lg border-r-4 border-gray-600"
                  value={selectedDistrict}
                  onChange={(e: any) => {
                    setSelectedDistrict(e.target.value);
                    setSelectedWard("");
                  }}
                >
                  <option value="" className="text-center">
                    -- Select district --
                  </option>
                  {cities
                    .find((city: any) => city.Id === selectedCity)
                    ?.Districts.map((district: any) => (
                      <option key={district.Id} value={district.Id}>
                        {district.Name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Ward */}
              <div className="flex flex-col w-[188px]">
                <label className="font-semibold mb-1">Ward</label>
                <select
                  className="border p-2 w-full rounded-lg border-r-4 border-gray-600"
                  value={selectedWard}
                  onChange={(e: any) => setSelectedWard(e.target.value)}
                >
                  <option value="" className="text-center ">
                    -- Select ward --
                  </option>
                  {cities
                    .find((city: any) => city.Id === selectedCity)
                    ?.Districts.find(
                      (district: any) => district.Id === selectedDistrict
                    )
                    ?.Wards.map((ward: any) => (
                      <option key={ward.Id} value={ward.Id}>
                        {ward.Name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1 mt-3">
              {/* Address */}
              <h3 className="font-bold">Select Delivery Method:</h3>
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="delivery"
                  value="FAST"
                  checked={deliveryType === "FAST"}
                  onChange={handleDeliveryTypeChange}
                />
                Express Delivery
              </label>
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  name="delivery"
                  value="SLOW"
                  checked={deliveryType === "SLOW"}
                  onChange={handleDeliveryTypeChange}
                />
                Standard Delivery
              </label>
              {deliveryDate && (
                <div className="mt-1">
                  <label>Estimated Delivery Date: </label>
                  <input type="date" value={deliveryDate || ""} readOnly />
                </div>
              )}
            </div>

            <div className="mt-3 flex flex-col gap-2">
              <p className="font-bold">Payment Method</p>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <input
                    type="radio"
                    name="payment_method"
                    value={"CARD"}
                    onChange={() => setPaymentMethod("CARD")}
                  ></input>
                  <p> Credit/Debit Card</p>
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="payment_method"
                  value={"COD"}
                  onChange={() => setPaymentMethod("COD")}
                />
                <p> Cash on delivery</p>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="payment_method"
                  value={"UPI"}
                  onChange={() => setPaymentMethod("COD")}
                />
                <p> UPI/Wallet</p>
              </div>
            </div>

            {paymentMethod === 'CARD' && <PaymentPage userId={userInfo?.id} addressId={userInfo?.addressList?.[0]?.id}/>}

            {paymentMethod !== 'CARD' && 
            <button
              onClick={() => navigate("/payment")}
              className="mt-3 w-[88px] h-[40px] border rounded-lg bg-black text-white font-bold hover:scale-105 hover:text-red-700 hover:bg-white duration-200 transition-all"
            >
              Pay Now
            </button>
}
          </div>
        </div>

        <div
          className="w-[40%] p-8 pb-20 mr-4"
          style={{ backgroundColor: "#f9f7f7", height: "100vh" }}
        >
          <div className="flex p-4 flex-col gap-7">
            {cartItems.map((cartItem: any, index) => (
              <>
                <div key={index} className="flex items-center space-x-4 gap-4">
                  {/* Ảnh sản phẩm */}
                  <img
                    src={cartItem.thumbnail}
                    alt={"product-" + index}
                    className="w-[120px] h-[100px] object-cover rounded-lg shadow-md"
                  />
                  <div className="flex flex-col text-sm px-2 text-gray-700 w-full">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-lg text-black">
                        {cartItem?.name || "Name"}
                      </p>
                      <p className="font-semibold text-lg text-black">
                        ${cartItem?.price || "0.00"}
                      </p>
                    </div>
                    <p className="text-gray-500">
                      Size: {cartItem.variant.size}
                    </p>
                    <p className="text-gray-500">
                      Color: {cartItem.variant.color}
                    </p>
                  </div>
                </div>
              </>
            ))}
          </div>

          <div className="w-[60%] h-[40%]  rounded-lg p-4 flex flex-col gap-4 m-3 text-[16px]">
            <p>Order Summary</p>
            <p>Items Count = {cartItems?.length}</p>
            <p>SubTotal = ${subTotal}</p>
            <p>Shipping = FREE</p>
            {totalAfterDiscount > 0 && (
              <p>Discount = ${(subTotal - totalAfterDiscount).toFixed(2)} </p>
            )}
            <hr className="h-[2px] bg-gray-400"></hr>
            <p className="font-medium">
              Total Amount = ${totalAfterDiscount || subTotal}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;

{
  /* <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
  {cities.map((city) => (
    <option key={city.Id} value={city.Id}>
      {city.Name}
    </option>
  ))}
</select>

value={city.Id} → User chọn gì thì setSelectedCity(city.Id).

Bạn sẽ có selectedCity là "01", "79", v.v.

Dễ dàng find ra object từ mảng. */
}
