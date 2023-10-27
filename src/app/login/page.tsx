"use client"
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { doLogin, getCurrentUserDetail } from "../../auth/auth";
import { loginUser, signUp } from "../../services/user-service";
import userContext from "../../context/userContext";
import * as Components from './Components';
import "./Login.css";
import { useRouter } from "next/navigation";
import { privateAxios } from "@/services/helper";
import useStore from "@/store/store";

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


const Login = () => {
  const { setCartItemsCount } = useStore();

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

  const userContxtData = useContext(userContext);
  const router=useRouter();

  const [loginDetail, setLoginDetail] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event, field) => {
    let actualValue = event.target.value;
    setLoginDetail({
      ...loginDetail,
      [field]: actualValue,
    });
  };

  const handleReset = () => {
    setLoginDetail({
      username: "",
      password: "",
    });
  };

  const handleLoginFormSubmit = (event) => {
    event.preventDefault();
    console.log(loginDetail);
    //validation
    if (
      loginDetail.username.trim() === "" ||
      loginDetail.password.trim() === ""
    ) {
      toast.error("Username Or Password  Is Required !!");
      return;
    };

    //submit the data to server to generate token
    loginUser(loginDetail)
      .then((data) => {
        //save the data to localstorage
        doLogin(data, () => {
          //redirect to user dashboard page
          userContxtData.setUser({
            data: data.user,
            login: true,
          });

          console.log(data.user);

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
          
          router.push("/");
          //navigate("/");
        });

        
        toast.success("Login Success");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400 || error.response.status === 404) {
          toast.error("Incorrect Credentials");
        } else {
          toast.error("Something went wrong  on server !!");
        }
      });
  };

  const [signIn, toggle] = useState(true);

  //Setting Up Sign Up Section
  const [signUpDetail, setSignUpDetail] = useState({
    "custName": "",
    "custEmailId": "",
    "houseNo": "Demo 1",
    "area": "Demo Area",
    "city": "Demo City",
    "state": "Demo State",
    "pincode": "123456",
    "latitude": "1.2",
    "longitude": "2.4",
    "custMobileno": "",
    "custPassword": ""
  });

  const handleSignUpFormSubmit = (event) => {
    event.preventDefault();
    console.log(signUpDetail);
    //validation
    if (
      signUpDetail.custName.trim() === "" ||
      signUpDetail.custEmailId.trim() === "" ||
      signUpDetail.custPassword.trim() === "" ||
      signUpDetail.custMobileno.trim() === ""
    ) {
      toast.error("Please Fill Required Details !!");
      return;
    };

    //submit the data to server
    signUp(signUpDetail)
      .then(() => {
        toast.success("Congratulaions , Registration is Successfully Completed !!");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400 || error.response.status === 404) {
          toast.error(error.response.data);
        } else {
          toast.error("Something went wrong  on server !!");
        }
      });
  };

  const handleSignUpChange = (event, field) => {
    let actualValue = event.target.value;
    setSignUpDetail({
      ...signUpDetail,
      [field]: actualValue,
    });
  };

  return (
    <section className="login-wrapper absolute-center">
    <img className="login-bg" src="assets/food-app-bg-image.png" alt="login-bg"></img>
    <Components.Container>
      <Components.SignUpContainer signin={signIn}>
        <Components.Form>
          <Components.Title>Create Account</Components.Title>
          <Components.Input type="text" value={signUpDetail.custName} onChange={(e)=>handleSignUpChange(e,"custName")} placeholder="Name" />
          <Components.Input type="email" value={signUpDetail.custEmailId} onChange={(e)=>handleSignUpChange(e,"custEmailId")} placeholder="Email" />
          <Components.Input type="password" value={signUpDetail.custPassword} onChange={(e)=>handleSignUpChange(e,"custPassword")} placeholder="Password" />
          <Components.Input type="text" value={signUpDetail.custMobileno} onChange={(e)=>handleSignUpChange(e,"custMobileno")} placeholder="Mobile Number" />
          <Components.Button onClick={handleSignUpFormSubmit}>Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signin={signIn}>
        <Components.Form>
          <Components.Title>Sign in</Components.Title>
          <Components.Input type="email" value={loginDetail.username} onChange={(e)=>handleChange(e,"username")} placeholder="Email"/>
          <Components.Input type="password" value={loginDetail.password} onChange={(e)=>handleChange(e,"password")} placeholder="Password"/>
          <Components.Anchor href="#">Forgot your password?</Components.Anchor>
          <Components.Button onClick={handleLoginFormSubmit}>Sign In</Components.Button>
          <Components.Button onClick={handleReset}>Reset</Components.Button>
        </Components.Form>
      </Components.SignInContainer>

      <Components.OverlayContainer signin={signIn}>
        <Components.Overlay signin={signIn}>
          <Components.LeftOverlayPanel signin={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep Eating Tasty and Healthy Food , Please Login from here !!
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>

          <Components.RightOverlayPanel signin={signIn}>
            <Components.Title>Hello, Foodie !!</Components.Title>
            <Components.Paragraph>
              Join Us Today and Get Ready to Eat Healthy and Tasty Food
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
    </section>
  );
};

export default Login;
