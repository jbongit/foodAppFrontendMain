"use client";
import { doLogout } from "@/auth/auth";
import userContext from "@/context/userContext";
import useStore from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useContext} from "react";
import { toast } from "react-toastify";

const NavbarAuth = () => {
  const {setCartItemsCount}=useStore();
  const router = useRouter();
  const userContextData = useContext(userContext);

  const profile_dropdown = () => {
    setIsOpen(!isOpen);
  };

  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    doLogout(() => {
      //logged out
      userContextData.setUser({
        data: null,
        login: false,
      });
      setCartItemsCount(0);
      toast.success("Logout Successfully");
      router.push("/");
    });
  };
 
  return (
    <div>
      {userContextData!==null && userContextData!==undefined && !userContextData.user.login? (
        <Link href="/login">Login</Link>
      ) : (
        <div onClick={profile_dropdown} className="flex flex-row items-center justify-center gap-1 text-lime-500">
          <div className="cursor-pointer">{userContextData.user.data.userName}</div>
          <span>
            <i className="fi fi-rr-angle-small-down absolute-center cursor-pointer"></i>
            <div
              id="profile-dropdown"
              className={
                isOpen
                  ? "absolute text-white flex flex-col bg-red-500 p-1 rounded-md z-10 left-[80vw] top-[20vh]"
                  : "hidden"
              }
            >
              <Link className="border-b-2 border-white" href="/customer/profile">
                Profile
              </Link>
              <Link className="border-b-2 border-white" href="/orders">
                Orders
              </Link>
              <Link className="" href="/login" onClick={logout}>
                Logout
              </Link>
            </div>
          </span>
        </div>
      )}
    </div>
  );
};

export default NavbarAuth;
