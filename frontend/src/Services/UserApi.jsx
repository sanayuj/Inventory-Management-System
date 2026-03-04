
import { userInstance } from "../Axios/axiosInstance";



export const userLogin = (values) => {
    console.log("Service!",values);
    
  return userInstance.post("/login", { ...values }, { withCredentials: true });
};