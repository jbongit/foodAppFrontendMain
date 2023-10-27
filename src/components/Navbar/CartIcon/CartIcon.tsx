"use client";
import { getCurrentUserDetail } from "@/auth/auth";
import { privateAxios } from "@/services/helper";
import useStore from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

type cartItem = {
  cartItemId: number;
  custId: number;
  quantity: number;
  product: {
    productId: number;
    restId: number;
    productName: string;
    productDesc: string;
    productPrice: string;
    productCategory: string;
  };
};

const CartIcon = () => {
  const { cartItemsCount, setCartItemsCount } = useStore();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await privateAxios.get(
          "customer/" + getCurrentUserDetail().userId + "/cartItems"
        );
        let sum = 0;
        response.data.forEach((element: cartItem) => {
          sum += element.quantity;
        });
        setCartItemsCount(sum);
      } catch (error) {
        
      }
    };
    fetchCartItems();
  }, []);

  return (
    <Link href="/cart" className="flex items-center gap-2">
      <div className="relative w-8 h-8 md:w-5 md:h-5">
        <Image src="/cart.png" alt="" fill/>
      </div>
      <span>Cart ({cartItemsCount})</span>
    </Link>
  );
};

export default CartIcon;
