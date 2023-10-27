"use client"
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import css from "./Checkout.module.scss";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";
import { privateAxios } from "../../../services/helper";
import { getCurrentUserDetail } from "@/auth/auth";

const stripePromise = loadStripe(
  "ENTER YOUR STRIPE PUBLIC KEY"
);

export default function Checkout() {
  type formattedcartItems ={
    cartItemId: number
    quantity: number,
    custId:number,
    product: object,
  }[]
  const [clientSecret, setClientSecret] = useState("");
  const [cartItems, setCartItems] = useState([{
    cartItemId:0,
    quantity:0,
    custId:0,
    product:[],
  }]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const custId=getCurrentUserDetail().userId;
        const response = await privateAxios.get(
          "/customer/"+custId+"/cartItems"
        );
        setCartItems(response.data);
      } catch (error) {
        console.error("CartItems Error : ", error);
      }
    };
    fetchCartItems();
  }, []);

  useEffect(
    () => {
      if (cartItems.length > 0) {
        const formattedcartItems:formattedcartItems = cartItems.map((item) => ({
          cartItemId: item.cartItemId,
          quantity: item.quantity,
          custId:item.custId,
          product: item.product,
        }));

        console.log("Formatted" + formattedcartItems);
        const fetchClientSecret = async () => {
          try {
            const response = await axios.post(
              "http://localhost:8080/create-payment-intent",
              {
                items: formattedcartItems,
              }
            );
            setClientSecret(response.data.clientSecret);
          } catch (error) {
            // Handle any errors that occurred during the API request
            console.error("Error fetching client secret:", error);
          }
        };

        fetchClientSecret();
      }
    },
    [cartItems]
  );

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className={css.container}>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div> 
  );
}
