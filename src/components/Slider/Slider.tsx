"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const data = [
  {
    id: 1,
    title: "always fresh & always crispy & always hot",
    image: "/slide1.png",
  },
  {
    id: 2,
    title: "we deliver your order wherever you are in Noida",
    image: "/slide2.png",
  },
  {
    id: 3,
    title: "the best pizza to share with your family",
    image: "/slide3.jpg",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((currentSlide) =>
        currentSlide === data.length - 1 ? 0 : currentSlide + 1
      );
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row bg-fuchsia-50">
      {/* TEXT CONTAINER */}
      <div className="flex-1 flex items-center justify-center flex-col gap-2 text-red-500 font-bold">
        <h1 className="text-4xl text-center uppercase p-4 md:text-5xl lg:text-6xl">
          {data[currentSlide].title}
        </h1>
        <Link href="/menu">
          <button className="bg-red-500 text-white py-2 px-4 rounded-md lg:text-xl">
            Order Now
          </button>
        </Link>
      </div>
      {/* IMAGE CONTAINER */}
      <div className="flex-1 relative">
        <Image
          src={data[currentSlide].image}
          alt=""
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default Slider;
