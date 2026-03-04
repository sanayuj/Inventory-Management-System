import axios from "axios"

const userInstance=axios.create({
    baseURL:"http://localhost:4000",
    withCredentials:true
});



// userInstance.interceptors.request.use((request)=>{
//     const token=localStorage.getItem("jwt")
//     request.headers.Authorization=`Bearer ${token}`
//     return request
// })

export {userInstance}