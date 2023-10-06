"use client"
import { useRouter } from "next/navigation";
import React , { useEffect } from "react";

const Success = () => {
  const router=useRouter();
  useEffect(() => {
    setTimeout(()=>router.push("/"),2000);
  }, []);
  
  return (
    <div className="flex flex-col h-[calc(100vh-9rem)] md:h-[calc(100vh-15rem)] absolute-center text-lime-500 font-bold  text-2xl md:text-4xl animate-pulse">
      <div>
        Thanks For Ordering From Aahar :)
      </div>
      <div className="text-base md:text-2xl">
        Please Wait .... Redirecting to Home Page !!!!!
      </div>
    </div>
  );
};

export default Success;
