import React from "react";
import Menu from "../Menu/Menu";
import Link from "next/link";
import CartIcon from "./CartIcon/CartIcon";
import Image from "next/image";
import NavbarAuth from "./NavbarAuth/NavbarAuth";

const Navbar = () => {
  return (
    <div className="h-12 text-red-500 p-4 bg-white flex justify-between items-center border-b-2 border-b-red-500 uppercase md:font-bold md:h-24 lg:px-20 xl:px-40">
      
      {/* LEFT LINKS */}
      <div className="hidden md:flex gap-4 flex-1">
        <Link href="/">HomePage</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/contact">Contact</Link>
      </div>

      {/* LOGO */}
      <div className="text-xl font-bold flex-1 md:text-center md:text-4xl">
        <Link href="/">Aahar</Link>
      </div>

      {/* MOBILE MENU */}
      <div className="md:hidden z-50">
        <Menu />
      </div>

      {/* RIGHT LINKS */}
      <div className="hidden md:flex gap-4 items-center justify-end flex-1">
        <div className="md:absolute top-3 r-2 flex items-center gap-2 cursor-pointer bg-orange-400 px-1 rounded-md text-white font-medium">
            <Image src="/phone.png" alt="" width={16} height={16} className="relative left-1"/>
            <span>123 456 7890</span>
        </div>
        <NavbarAuth />
        <CartIcon />
      </div>
    </div>
  );
};

export default Navbar;
