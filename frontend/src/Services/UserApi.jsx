
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


export const editProduct=(id)=>{
    return userInstance.patch(`/updateproduct/${id}`)
}