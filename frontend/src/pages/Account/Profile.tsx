import React, { useCallback, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Address, UserInfo } from "~/types/UserInfo";
import AddNewAddress from "./AddNewAddress";
import { useDispatch, useSelector } from "react-redux";
import { loadUserInfo, removeAddress, selectUserInfo } from "~/store/features/user";
import { setLoading } from "~/store/features/common";
import { getUserDetailInfo } from "~/api/order";
import { deleteAddressAPI } from "~/api/address";
import { error } from "console";
const Profile = () => {
  // const userInfo = useOutletContext<UserInfo | null>();
  const dispatch = useDispatch();
  
  const [updateInfo, setUpdateInfo] = useState(false);
  const [addAddress, setAddAddress] = useState(false);
  const userInfo = useSelector(selectUserInfo);
  console.log('userInfo ' , userInfo);
  
  const [formData, setFormData] = useState({
    firstName: userInfo?.firstName || "",
    lastName: userInfo?.lastName || "",
    email: userInfo?.email || "",
    phoneNumber: userInfo?.phoneNumber || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleCancel = () => {
    setFormData({
      firstName: userInfo?.firstName || "",
      lastName: userInfo?.lastName || "",
      email: userInfo?.email || "",
      phoneNumber: userInfo?.phoneNumber || "",
    });
    setUpdateInfo(false);
  };

  const onDeleteAddress = useCallback((id : string) => {
    dispatch(setLoading(true));
    deleteAddressAPI(id).then(res => {
      console.log("Deleted ", res);
      dispatch(removeAddress(id))
    }).catch(error => {
      throw error;
    }).finally(() => setLoading(false))
  }, [dispatch])

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Personal Infomation:</h2>
      <button
        className="underline ml-4 text-blue-900 mt-4 font-bold hover:text-red-800"
        onClick={() => setUpdateInfo(true)}
      >
        Edit
      </button>
      {updateInfo ? (
        <>
          <div>
            <label className="block font-medium">First Name:</label>
            <input
              type="text"
              name="firstName"
              className="border p-2 rounded w-full"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block font-medium">Last Name:</label>
            <input
              type="text"
              name="lastName"
              className="border p-2 rounded w-full"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block font-medium">Email:</label>
            <input
              type="email"
              name="email"
              className="border p-2 rounded w-full"
              value={formData.email}
              disabled
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block font-medium">Phone:</label>
            <input
              type="tel"
              name="phoneNumber"
              className="border p-2 rounded w-full"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-2 mt-2">
            <button
              className="bg-black text-white px-4 py-2 rounded hover:text-red-500"
              // onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded hover:text-black"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <div className="mb-2 bg-white rounded-lg shadow p-4">
          <p className="font-semibold">
            <strong>Full Name:</strong> {userInfo?.firstName}{" "}
            {userInfo?.lastName}
          </p>
          <p className="font-semibold">
            <strong>Email:</strong> {userInfo?.email}
          </p>
          <p className="font-semibold">
            <strong>Phone:</strong> {userInfo?.phoneNumber}
          </p>
        </div>
      )}

      {!addAddress ? (
        <>
          <div className="flex justify-between">
            <div className="bg-white shadow-sm">Address </div>
            <button
              className="underline text-red-900 mr-10 bg-gray-50 border rounded-lg p-1 font-bold hover:bg-gray-300"
              onClick={() => setAddAddress(true)}
            >
              Add New
            </button>
          </div>
          <div className="pt-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 pb-10 mb-8">
            {userInfo?.addressList?.map((address: Address, index: number) => (
              <div
                key={index}
                className="bg-white shadow-lg border border-gray-300 rounded-lg overflow-hidden hover:scale-105 transform transition-all duration-300 ease-in-out"
              >
                <div className="p-6">
                  <p className="text-lg font-semibold text-gray-800">
                    {address?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {address?.phoneNumber}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    {address?.street}, {address?.city}, {address?.state}
                  </p>
                  <p className="text-sm text-gray-600">{address?.zipCode}</p>
                </div>
                <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
                  <button
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                    onClick={() => console.log("Edit address", address)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 transition-colors"
                    onClick={() => onDeleteAddress(address?.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <AddNewAddress
          onCancel={() => {
            setAddAddress(false);
          }}
        />
      )}
    </div>
  );
};

export default Profile;
