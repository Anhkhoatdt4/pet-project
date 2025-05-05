import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAddressAPI } from "~/api/address";
import { setLoading } from "~/store/features/common";
import { saveAddress } from "~/store/features/user";

interface AddNewAddressProps {
  onCancel: () => void;
}
const AddNewAddress: React.FC<AddNewAddressProps> = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });
  
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prevFromData : any) => {
        return {
            ... prevFromData,
            [name] : value
        }
    });
  }

  const navigate = useNavigate();

  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const handleSave = useCallback((event : any) => {
    event.preventDefault();
    dispatch(setLoading(true));
    setError('');
    console.log("formData " , formData);
    
    addAddressAPI(formData).then((res : any) => {
        console.log("save address");
        
        dispatch(saveAddress(res));
        onCancel && onCancel();
    }).catch((error : Error) => {
        setError('Address was not added.')
    }).finally(() => dispatch(setLoading(false)));
  },[dispatch , onCancel , formData])
  return (
    <div className="p-6">
      {/* Render form for adding a new address */}
      <h3 className="text-xl font-semibold mb-4">Add New Address</h3>
      <form>
        <div className="mb-4">
          <label className="block font-medium">Address Name:</label>
          <input
            type="text"
            name="name"
            className="border p-2 rounded w-full"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            className="border p-2 rounded w-full"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Street:</label>
          <input
            type="text"
            name="street"
            className="border p-2 rounded w-full"
            value={formData.street}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">City:</label>
          <input
            type="text"
            name="city"
            className="border p-2 rounded w-full"
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">State:</label>
          <input
            type="text"
            name="state"
            className="border p-2 rounded w-full"
            value={formData.state}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium">Zip Code:</label>
          <input
            type="text"
            name="zipCode"
            className="border p-2 rounded w-full"
            value={formData.zipCode}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex gap-2 mt-2">
          <button
            className="bg-black text-white px-4 py-2 rounded hover:text-red-500"
            onClick={handleSave}
          >
            Save
          </button>
          <button
           type="button"
            className="bg-gray-400 text-white px-4 py-2 rounded hover:text-black"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
      {error && <p className='text-lg text-red-700'>{error}</p>}
    </div>
  );
};

export default AddNewAddress;
