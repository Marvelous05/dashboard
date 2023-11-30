import Axios from "axios";


export const getToken = () =>{
    return localStorage.getItem("token")
}

export const setToken = (token) =>{
    localStorage.setItem("token",token)
}

export const axiosInstance = Axios.create({ 
    baseURL: "http://localhost:4000/api/v1",
    headers: {
        'Authorization': `Bearer `+ getToken(),
        // "Access-Control-Allow-Origin": "*"
    }
 });