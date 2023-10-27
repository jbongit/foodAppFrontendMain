"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import CartIcon from "../Navbar/CartIcon/CartIcon";
import userContext from "@/context/userContext";
import { doLogout } from "@/auth/auth";
import {toast} from "react-toastify";
import { useRouter } from "next/navigation";
import useStore from "@/store/store";

const links = [
  { id: 1, title: "HomePage", url: "/" },
  { id: 2, title: "Menu", url: "/" },
  { id: 3, title: "Working Hours", url: "/" },
  { id: 4, title: "Contact", url: "/" },
];

const Menu = () => {
    const {setCartItemsCount}=useStore();

    const router=useRouter();

    const [open, setOpen] = useState(false);
  
    const userContextData = useContext(userContext);

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
        <Image
          src={open ? "/close.png" : "/open.png"}
          alt=""
          width={20}
          height={20}
          onClick={() => setOpen(!open)}
          className="cursor-pointer"
        />
        {open && (
          <div className="bg-red-500 text-white absolute left-0 top-24 w-full h-[calc(100vh-6rem)] flex flex-col gap-8 items-center justify-center text-2xl z-10">
            {links.map((item) => (
              <Link href={item.url} key={item.id} onClick={() => setOpen(false)}>
                {item.title}
              </Link>
            ))}
  
            <Link
              href={userContextData.user.login ? "/orders" : "/login"}
            >
              {userContextData.user.login? "Orders" : "Login"}
            </Link>

            {userContextData.user.login && <Link className="" href="/login" onClick={logout}>
                Logout
            </Link>
            }  
            

            <Link href="/cart">
              <CartIcon />
            </Link>
            
          </div>
        )}
      </div>
    );
  };

export default Menu;
