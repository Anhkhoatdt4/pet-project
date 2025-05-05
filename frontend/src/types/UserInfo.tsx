export interface Address {
  id: string;
  name: string | null;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
}

export interface Authority {
  id: string;
  roleCode: string;
  roleDescription: string;
  authority: string;
}

export interface UserInfo {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  authorityList: Authority[];
  addressList: Address[];
}
