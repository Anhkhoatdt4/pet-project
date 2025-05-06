import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addAddressAPI } from "~/api/address";

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
  status: string ;
}
// interface Order {
//   id: string;
//   amount: number;
//   createdAt: string;
//   orderStatus: "PENDING" | "SHIPPED" | "CANCELLED" | "DELIVERED";
//   discount : number,
// }

interface Authority {
  id: string;
  roleCode: string;
  roleDescription: string;
  authority: string;
}

interface UserInfo {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  addressList: Address[];
  authorityList: Authority[];
  }
  
  interface Address {
    id: string;
    name: string | null;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
  }
  
  interface State {
    userInfo: UserInfo | null;
    orders: Order[];
  }
  export const initialState: State = {
    userInfo: {
      id: "", 
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      addressList: [],
      authorityList: []
    },
    orders: []
  };
const userSlice = createSlice({
  name: "userState",
  initialState: initialState,
  reducers: {
    loadUserInfo: (state: State, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    saveAddress: (state : State, action: PayloadAction<Address>) => {
        if (state.userInfo) {
           state.userInfo.addressList.push(action.payload);
        }
    },
    removeAddress: (state: State, action: PayloadAction<string>) => {
      if (state.userInfo){
        console.log('action1 ' , action.payload);
        
        state.userInfo.addressList = state.userInfo.addressList.filter(
          (address) => address?.id !== action.payload
        )
      }
    },
    loadOrders: (state:State, action: PayloadAction<Order[]>) => {
      console.log('action - order ' , action.payload);
      state.orders = action.payload;
    },
    cancelOrder: (state: State, action: PayloadAction<string>) => {
      if (action.payload){
        const order = state.orders.find(o => o.id === action.payload);
        if (order) {
          order.orderStatus = "CANCELLED"
        }
      }
    }
  },
});

export const {loadUserInfo , saveAddress , removeAddress, loadOrders , cancelOrder} = userSlice.actions;
export const selectUserInfo = (state : {userState : State}) => state.userState.userInfo;
export const selectAllOrders = (state : {userState: State}) : Order[] => state.userState.orders;
export default userSlice.reducer;