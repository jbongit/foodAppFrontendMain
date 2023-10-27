"use client"
import { isLoggedIn } from "@/auth/auth";
import userContext from "@/context/userContext";
import { myAxios, privateAxios } from "@/services/helper";
import useStore from "@/store/store";
import { Skeleton } from "@mui/material";
import Image from "next/image";
import React ,{ useState , useEffect , useContext} from "react";
import {toast} from "react-toastify";

const Featured = () => {
  const islogin=isLoggedIn();
  const {increment}=useStore();
  const userContextData=useContext(userContext);
  const [isLoading, setIsLoading] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([{
    "productId": 1,
    "restId": 1,
    "productName": "",
    "productDesc": "",
    "productPrice": "",
    "productCategory": ""
}]);

  useEffect(() => {
    const fetchProducts= async ()=>{
      try{
        const response=await myAxios.get("restaurant/1/products");
        setFeaturedProducts(response.data);
        setIsLoading(true);
      }
      catch(error){
        toast.error(error.response.data);
      }
    }
    fetchProducts();
  }, []);

  const handleAddToCart=(customerId:string,productId:number)=>{
    privateAxios.post("customer/"+customerId+"/product/"+productId+"/addToCart?quantity=1")
    .then(()=>{
      increment();
      toast.success("Successfully Added To Cart");
    })
    .catch((error)=>{
      toast.error("Something went wrong on server "+error);
    })
  };
  
  return (
    <div className="w-screen overflow-x-scroll text-red-500 demo">
      {!isLoading?<div className=" h-[70vh] md:h-[80vh] p-2"><Skeleton variant="rounded" animation="wave" height="100%" width="98.5%"/></div>:<>
        {/* WRAPPER */}
      <div className="w-max flex">
        {/* SINGLE ITEM */}
        {featuredProducts.map((item) => (
          <div
          key={item.productId}
          className="w-screen h-[70vh] md:h-[80vh] flex flex-col items-center justify-around p-4 hover:bg-fuchsia-50 transition-all duration-300 md:w-[33vw]"
        >
          {/* IMAGE CONTAINER */}
          {/* {item.img && (
            <div className="relative flex-1 w-full hover:rotate-[60deg] transition-all duration-500">
              <Image src="" alt="" fill className="object-contain" />
            </div>
          )} */}
          <div className="relative flex-1 w-full hover:rotate-[60deg] transition-all duration-500">
              <Image src="/temporary/p1.png" alt="" fill className="object-contain" />
            </div>
          {/* TEXT CONTAINER */}
          <div className=" flex-1 flex flex-col items-center justify-center text-center gap-1 md:gap2.5">
            <h1 className="text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl relative top-2">{item.productName}</h1>
            <p className="p-2 2xl:p-4">{item.productDesc}</p>
            <span className="text-xl font-bold">Rs. {item.productPrice}</span>
            <button onClick={()=>islogin?handleAddToCart(userContextData.user.data.userId,item.productId):toast.error("Please Login")} className="bg-red-500 relative top-2 text-white p-2 rounded-md">
              Add to Cart
            </button>
          </div>
        </div>
        ))}
      </div>
      </>}
    </div>
  );
};

export default Featured;