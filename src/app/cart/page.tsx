"use client";
import { getCurrentUserDetail } from "@/auth/auth";
import { privateAxios } from "@/services/helper";
import useStore from "@/store/store";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { BsFillCartDashFill } from "react-icons/bs";
import Link from "next/link";
import { Skeleton } from "@mui/material";

const CartPage = () => {
  const [isLoading, setIsLoading] = useState(false);

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

  const [cartItemsPrice, setCartItemsPrice] = useState(0);
  const { cartItemsCount, setCartItemsCount } = useStore();
  const [cartItems, setCartItems] = useState([
    {
      cartItemId: 0,
      custId: 0,
      quantity: 0,
      product: {
        productId: 0,
        restId: 0,
        productName: "",
        productDesc: "",
        productPrice: "",
        productCategory: "",
      },
    },
  ]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await privateAxios.get(
          "customer/" + getCurrentUserDetail().userId + "/cartItems"
        );
        setIsLoading(true);
        let sum = 0;
        response.data.forEach((element: cartItem) => {
          sum += element.quantity * parseInt(element.product.productPrice);
        });
        setCartItemsPrice(sum);
        setCartItems(response.data);
      } catch (error) {
        toast.error("Please Login");
      }
    };
    fetchCartItems();
  }, []);

  const deleteItems = async (customerId: number, productId: number) => {
    try {
      const deletedCartItem = await privateAxios.delete(
        "customer/" + customerId + "/product/" + productId + "/remove"
      );
      setCartItemsCount(cartItemsCount - deletedCartItem.data.quantity);
      setCartItemsPrice(
        cartItemsPrice -
          deletedCartItem.data.quantity *
            parseInt(deletedCartItem.data.product.productPrice)
      );
      const response = await privateAxios.get(
        "customer/" + getCurrentUserDetail().userId + "/cartItems"
      );
      setCartItems(response.data);
      toast.success("Item successfully removed from cart");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row">
      {/* PRODUCTS CONTAINER */}
      <div className="h-1/2 p-4 flex flex-col overflow-scroll overflow-x-hidden lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40">
        <div className="text-center text-xs md:text-base flex flex-row items-center justify-between mb-4 uppercase font-bold">
          <div className="relative left-[1.7rem]">Image</div>
          <div className="relative left-[3.1rem]">
            <h1>Product Info</h1>
          </div>
          <h2 className="relative left-[3.5rem]">Price</h2>
          <h2 className="relative left-[2rem] ">Quantity</h2>
          <span className="md:text-[1.1rem]">
            <i className="fi fi-rr-trash"></i>
          </span>
        </div>
        {!isLoading ? (
          <div className=" relative left-2.5 h-[70vh] md:h-[80vh] ">
            <div className="h-1/3 p-2">
              <Skeleton
                variant="rounded"
                animation="wave"
                height="100%"
                width="100%"
              />
            </div>
            <div className="h-1/3 p-2">
              <Skeleton
                variant="rounded"
                animation="wave"
                height="100%"
                width="100%"
              />
            </div>
            <div className="h-1/3 p-2">
              <Skeleton
                variant="rounded"
                animation="wave"
                height="100%"
                width="100%"
              />
            </div>
          </div>
        ) : (
          <span>
            {/* CART ITEMS */}
            {cartItems.map((item) => (
              <div
                key={item.cartItemId}
                className="flex items-center justify-between mb-4 scale-[0.95] md:scale-[1]"
              >
                <Image
                  src="/temporary/p1.png"
                  alt=""
                  width={100}
                  height={100}
                />
                <div className="">
                  <h1 className="uppercase md:text-xl font-bold">
                    {item.product.productName}
                  </h1>
                  <span>{item.product.productDesc}</span>
                </div>
                <h2 className="font-bold">Rs. {item.product.productPrice}</h2>
                <h2 className="font-bold">{item.quantity}</h2>
                <span
                  onClick={() => {
                    deleteItems(
                      getCurrentUserDetail().userId,
                      item.product.productId
                    );
                  }}
                  className="cursor-pointer md:text-xl"
                >
                  <BsFillCartDashFill />
                </span>
              </div>
            ))}
          </span>
        )}
      </div>
      {/* PAYMENT CONTAINER */}
      <div className="h-1/2 p-4  bg-fuchsia-50 text-sm flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 lg:text-base 2xl:gap-6">
        <div className="flex justify-between">
          <span className="">Subtotal ({cartItemsCount} items)</span>
          <span className="">Rs. {cartItemsPrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Service Cost</span>
          <span className="">Rs. 0.00</span>
        </div>
        <div className="flex justify-between">
          <span className="">Delivery Cost</span>
          <span className="text-green-500">FREE!</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span className="">TOTAL(INCL. VAT)</span>
          <span className="font-bold">Rs. {cartItemsPrice}</span>
        </div>
        <Link href="/customer/checkout">
          <button className="bg-red-500 text-white p-1 md:p-2 rounded-md w-1/2 self-end">
            CHECKOUT
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
