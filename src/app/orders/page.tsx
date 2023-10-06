"use client"
import { getCurrentUserDetail } from "@/auth/auth";
import { privateAxios } from "@/services/helper";
import React , { useEffect , useState } from "react";
import {toast} from "react-toastify";

const OrdersPage = () => {

  const [orderItems, setOrderItems] = useState([
    {
      "orderId": 0,
      "custId": 0,
      "dpId": null,
      "localDateTime": "",
      "quantity": 0,
      "status": "",
      "product": {
          "productId": 0,
          "restId": 0,
          "productName": "",
          "productDesc": "",
          "productPrice": "",
          "productCategory": ""
      }
  }
  ]);

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const custId=getCurrentUserDetail().userId;
        const response = await privateAxios.get(
          "/customer/"+custId+"/orders"
        );
        setOrderItems(response.data);
      } catch (error) {
        toast.error("Something went wrong on server");
      }
    };
    fetchOrderItems();
  }, [])
  
  return (
    <div className="p-4 lg:px-20 xl:px-40">
      <table className="w-full border-separate border-spacing-3">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:block">Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orderItems.map((item , index)=>(<tr key={index} className={index%2===0?"text-sm md:text-base bg-red-50":"text-sm md:text-base bg-gray-100"}>
            <td className="hidden md:block py-6 px-1">{item.orderId}</td>
            <td className="py-6 px-1">{item.localDateTime}</td>
            <td className="py-6 px-1">Rs. {item.product.productPrice}</td>
            <td className="hidden md:block py-6 px-1">{item.product.productPrice}</td>
            <td className="py-6 px-1">{item.status}</td>
          </tr>))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;