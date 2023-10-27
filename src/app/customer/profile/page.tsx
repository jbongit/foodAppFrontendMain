"use client"
import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { privateAxios } from "@/services/helper";
import { doLogout, getCurrentUserDetail } from "@/auth/auth";
import userContext from "@/context/userContext";

const Profile = () => {
  const userContextData=useContext(userContext);
  const [customer, setCustomer] = useState(null);
  const [custId, setCustId] = useState(null);
  const router=useRouter();

  useEffect(() => {
    setCustId(getCurrentUserDetail().userId);
  }, []);
  

  const [updatedCustomer, setUpdatedCustomer] = useState({
    "custName": "",
    "custEmailId": "",
    "houseNo": "",
    "area": "",
    "city": "",
    "state": "",
    "pincode": "",
    "latitude": "",
    "longitude": "",
    "custMobileno": "",
    "custPassword": "",
})

  const deleteProfile=async ()=>{
      try{
        await privateAxios.delete("/customer/"+custId);
        doLogout(()=>{
          userContextData.setUser({
            data: null,
            login: false,
          });
          toast.success("Successfully Deleted");
          router.push("/login");
        });
      }catch(error){
        toast.error("Something went wrong on server");
      }
  }

  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setUpdatedCustomer({
      ...updatedCustomer,
      [field]: actualValue,
    });
  };

  const updateProfile= async ()=>{
    try{
      await privateAxios.put("/customer/"+custId,updatedCustomer);
      const users=userContextData.user.data;
      users.userName=updatedCustomer.custName;
      userContextData.setUser({
        data: users,
        login:true}
        )
      toast.success("Profile Information Updated Successfully")
    }catch(error){
      toast.error(error.response.data);
    }
  }

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await privateAxios.get("customer/"+custId);
        setCustomer(response.data);
        setUpdatedCustomer(  {
            "custName": response.data.custName,
            "custEmailId": response.data.custEmailId,
            "houseNo": response.data.custAddress.houseNo,
            "area": response.data.custAddress.area,
            "city": response.data.custAddress.city,
            "state": response.data.custAddress.state,
            "pincode": response.data.custAddress.pincode,
            "latitude": response.data.custAddress.latitude,
            "longitude": response.data.custAddress.longitude,
            "custMobileno": response.data.custMobileno,
            "custPassword": response.data.custPassword,
        });
        // customer.customerName="Hi";
        // setCustomer(customer);
      } catch (error) {
        console.error("Customer Error : ", error);
      }
    };
    fetchCustomer();
  }, [custId]);

  return (
    <section className=" text-red-500">
      {customer != null && (
        <div className="">
          <div className="flex flex-col gap-3.5 relative md:top-2.5 justify-center items-center h-[calc(100vh-12rem)] md:h-[calc(100vh-15rem)] w-screen">
            {/* HEADING */}
            <div className="font-bold text-2xl text-center border-b-4 border-dashed border-red-500 uppercase">
              Profile Information
            </div>
            <div className="flex flex-row">
              {/* IMAGE CONTAINER */}
              <div className="flex-1">
                <img
                  className="object-contain w-1/2 relative top-[20%] left-[25%] border-4 border-dashed border-red-500 rounded-md p-2"
                  src="../assets/profile/profile-image.png"
                  alt="profile"
                />
              </div>
              {/* TEXT CONTAINER */}
              <div className="flex-1 gap-2 flex flex-col">
                <div className="">
                  <div className="text-sm font-semibold">Name : </div>
                  <input type="text" value={updatedCustomer.custName || ''} placeholder={customer.custName} onChange={(e)=>handleChange(e,"custName")} className="text-black" />
                </div>

                <div className="">
                  <div className="text-sm font-semibold">Email ID : </div>
                  <div className="text-black">{customer.custEmailId}</div>
                </div>

                <div className="profile-info">
                  <div className="text-sm font-semibold">Mobile Number : </div>
                  <input type="text" value={updatedCustomer.custMobileno || ''} placeholder={customer.custMobileno} onChange={(e)=>handleChange(e,"custMobileno")} className="text-black" />
                </div>

                <div className="profile-info">
                  <div className="text-sm font-semibold"> Address : </div>
                  <div className="text-black">
                    {customer.custAddress.houseNo},{customer.custAddress.area},
                    {customer.custAddress.city},{customer.custAddress.state}
                  </div>
                </div>

                <div className="flex flex-row gap-20">
                  <button className="text-white bg-red-500 rounded-md px-2 py-1 hover:bg-gray-500" onClick={updateProfile}>Update</button>
                  <button className="text-white bg-red-500 rounded-md px-2 py-1 hover:bg-gray-500" onClick={deleteProfile}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;
