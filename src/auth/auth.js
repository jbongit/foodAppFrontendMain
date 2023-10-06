//isLoggedIn=>
import { setCookie , deleteCookie , hasCookie , getCookie } from "cookies-next";

export const isLoggedIn = () => {
  return hasCookie("data");
  };
  
  //doLogin=> data=>set to localstorage
  
  export const doLogin = (data,next) => {
    setCookie("data",data);
    next()
  };
  
  //doLogout=> remove from localStorage
  
  export const doLogout = (next) => {
    deleteCookie("data",false);
    next()
  };
  
  //get currentUser
  export const getCurrentUserDetail = () => {
    if (isLoggedIn()) {
      return JSON.parse(getCookie("data")).user;
    } else {
      return undefined;
    }
  };
  
  export const getToken=()=>{
    if(isLoggedIn()){
      return JSON.parse(getCookie("data")).token
    }else{
      return null;
    }
  }