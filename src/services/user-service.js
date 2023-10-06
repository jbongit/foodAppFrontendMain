import { myAxios, privateAxios } from "./helper";

export const signUp = (user) => {
  return myAxios.post("/register/customer", user).then((response) => response.data);
};

export const loginUser = (loginDetail) => {
  return myAxios
    .post("/login", loginDetail)
    .then((response) => response.data);
    
};

export const getUser = (userId) => {
  return privateAxios.get(`/customer/${userId}`).then((resp) => resp.data);
};