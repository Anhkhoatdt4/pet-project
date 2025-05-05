import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { log } from "util";
import { addAddressAPI } from "~/api/address";

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
    orders: any[];
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
    }
  },
});

export const {loadUserInfo , saveAddress , removeAddress} = userSlice.actions;
export const selectUserInfo = (state : {userState : State}) => state.userState.userInfo
export default userSlice.reducer;