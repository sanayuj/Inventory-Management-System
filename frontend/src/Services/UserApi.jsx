import { userInstance } from "../Axios/axiosInstance";

export const userLogin = (values) => {
  return userInstance.post("/login", { ...values }, { withCredentials: true });
};

export const addProduct = (values) => {
  return userInstance.post("/addproduct", { ...values });
};

export const logoutUser = () => {
  return userInstance.post("/logout");
};


export const getProduct = () => {
  return userInstance.get("/fetchAllProduct");
};

export const checkAuthUser = () => {
  return userInstance.get("/checkAuth", { withCredentials: true });
};



export const deleteProduct = (id) => {
  return userInstance.delete(`/deleteproduct/${id}`);
};


export const editProduct = (id, values) => {
  return userInstance.put(`/updateproduct/${id}`, { ...values });
};



