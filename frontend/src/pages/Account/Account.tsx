import React, { useCallback, useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Navigation from "~/components/Navigation/Navigation";
import { logOut } from "~/utils/jwt-helper";
import { useDispatch } from "react-redux";
import { setLoading } from "~/store/features/common";
import { getUserDetailInfo } from "~/api/authentication/getUserInfo";
import VectorGraphics from "~/components/common/VectorGraphics";
import { UserInfo } from '~/types/UserInfo';
import { loadUserInfo } from "~/store/features/user";
const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    useEffect(() => {
      dispatch(setLoading(true));
      getUserDetailInfo()
        .then((res) => {
          console.log("res : " , res);
          dispatch(loadUserInfo(res));
        })
        .catch((err) => {
          console.log("Error: ", err);
          throw new Error(err);
        })
        .finally(() => dispatch(setLoading(false)));
    }, [dispatch]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <div className="flex bg-white pt-[70px] mt-10">
          <div className="flex-col flex w-[35%] items-center justify-center">
            <img src="/images/logo-account.jpg" className="w-[155px] h-[155px] rounded-full">
            </img>
            <div className="flex flex-col items-center">
            <p className="text-xl font-bold">Hello {userInfo?.firstName}</p>
            <p className="font-bold">Welcome to your account</p>
            </div>
            <div className="md:flex flex-col mt-3 gap-4">
              <ul className="space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                <li>
                  <NavLink to={"/account-details/profile"} className={({isActive}) => 
                  `${!isActive ? "bg-black hover:bg-gray-400" : "bg-gray-600 hover:bg-black"} inline-flex items-center px-4 py-3 text-white rounded-lg active w-full`
                  }>
                   <VectorGraphics/>
                   Profile
                  </NavLink>
                </li>
              </ul>
              <ul className="space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                <li>
                  <NavLink to={"/account-details/orders"} className={({isActive}) => 
                  `${!isActive ? "bg-black hover:bg-gray-400" : "bg-gray-600 hover:bg-black"} inline-flex items-center px-4 py-3 text-white rounded-lg active w-full`
                  }>
                   <VectorGraphics/>
                   Orders
                  </NavLink>
                </li>
              </ul>
              <ul className="space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                <li>
                  <NavLink to={"/account-details/settings"} className={({isActive}) => 
                  `${!isActive ? "bg-black hover:bg-gray-400" : "bg-gray-600 hover:bg-black"} inline-flex items-center px-4 py-3 text-white rounded-lg active w-full`
                  }>
                   <VectorGraphics/>
                   Setting
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex-grow">
              <Outlet context={userInfo}/>
          </div>
      </div>
      </div>
    </>
  );
};

export default Account;
