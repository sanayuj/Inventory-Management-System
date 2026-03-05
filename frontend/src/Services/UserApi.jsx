
import { userInstance } from "../Axios/axiosInstance";



export const userLogin = (values) => {
  return userInstance.post("/login", { ...values }, { withCredentials: true });
};

export const getProduct=()=>{
    return userInstance.get("/fetchAllProduct")
}

export const addProduct=(values)=>{
    console.log(values,"Service add product@@@@");
    
    return userInstance.post("/addproduct",{...values})
}

export const deleteProduct = (id) => {
    console.log("service called !!!");
    
  return userInstance.delete(`/deleteproduct/${id}`);
};


export const editProduct=(id,values)=>{
    return userInstance.put(`/updateproduct/${id}`,{...values})
}

export const logoutUser=()=>{
    return userInstance.post("/logout")
}

export const checkAuthUser=()=>{
    return userInstance.get("/checkAuth",{withCredentials: true})
}