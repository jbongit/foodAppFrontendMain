import Image from "next/image";
import React from "react";
import CountDown from "./CountDown";
import Link from "next/link";

const Offer = () => {
  return (
    <div className='bg-black h-screen flex flex-col md:flex-row md:bg-[url("/offerBg.png")] md:h-[70vh]'>
      {/* TEXT CONTAINER */}
      <div className="flex-1 flex flex-col justify-center items-center text-center gap-5 p-4">
        <h1 className="text-white text-[2.5rem] font-bold xl:text-6xl">
          Order Healthy & Tasty Food
        </h1>
        <p className="text-white text-xl">Eat Delicious and Tasty Food</p>
        <CountDown />
        <Link href="/menu">
          <button className="bg-red-500 text-white p-2 rounded-md text-sm md:text-xl font-bold">
            Order Now
          </button>
        </Link>
      </div>
      {/* IMAGE CONTAINER */}
      <div className="relative flex-1 w-full left-5 md:h-full">
        <Image src="/offerProduct.png" alt="" fill className="object-contain" />
      </div>
    </div>
  );
};

export default Offer;
