'use client'
import React from 'react'
import {useForm} from 'react-hook-form'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CircularProgress} from "@mui/material";
import axios from "axios";

const Login = () => {
    // const{
    //     handleSubmit,
    //     register,
        
    //     formState:{error},
    // }=useForm();
    // const submitHandler =()=>{
    //     window.alert('Login Successful')
    // }
    // const handleButtonClick = () => {
    //     router.push("/users");
    //   };
    const router = useRouter()

    const [formData, setFormData] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState("")
  
    let navigateToPostLogin = () =>{
      router.push("/cards")
    }
  
    // let handleChange=(e)=>{
  
    //   setFormData({[e.name]: e.value,});
    //   console.log(formData)
    // }
  
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value.trim(),
      });
      console.log(formData)
    };
    let login = async(e)=>{
      try {
        e.preventDefault();
        setLoading(true)
        // let loginResponse = await axios.post(
        // //   'https://panel.navixy.com/api-v2/panel/account/auth',
        // 'http://localhost:4000/auth/authenticate',
        //   {
        //     "login":"admin@gmail.com",
        //     "password":"admin"
            
        // },
        let loginResponse = await axios.post('http://localhost:4000/auth/authenticate')
	.then((response) => {
		axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        { timeout: 5000 }
	})
        if(loginResponse.data.success == true){
          setLoading(false)
        }
        
        console.log(loginResponse.data.message);
        if(loginResponse.data.success == true){
        //   router.push(`/cards?hash=${loginResponse.data.hash}`)
          router.push(
            // `/cards?email=${loginResponse.data[0].email}&password=${loginResponse.data[0].password}`
            `/cards`
          );
        }else{
  
        }
        console.log(loginResponse.data);
      } catch (error) {
        // console.log(error.response.data.message);
        setError (error.message)
      }
  
    }
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-900 rounded-lg overflow-hidden">
        <div className="relative w-[380px] h-[420px] bg-gray-800 rounded-lg overflow-hidden">
            <div className="absolute w-[380px] h-[420px] bg-gradient-to-r
         from-blue-500 via-blue-500 to transparent top-[50%] left-[50%] animate-spin-slow origin-bottom-right">
        </div>
        <div className="absolute w-[380px] h-[420px] bg-gradient-to-r
         from-blue-500 via-blue-500 to transparent top-[50%] left-[50%] animate-spin-delay origin-bottom-right">
        </div>
       
        <div className=" absolute inset-1 bg-gray-800 rounded-lg  z-10 p-5">
            <form >
                <h2 className="text-xl font-semibold text-blue-500 text-center mb-12">
                    Login</h2>
                <div className="relative flex flex-col mb-12">
                    <input 
                    type="email"
                    id="email"
                    autoFocus
                    placeholder='' 
                    onChange={handleChange}

                    className='relative z-10 border-0 border-b-2 border-blue-500 h-10 bg-transparent
                     text-gray 100 outline-none px-2 peer'
                    //  {...register('email',{
                    //     required: 'Please Enter Email',
                    //     pattern: {
                    //         value:"",
                    //         message:'Please Enter Valid Email'
                    //     },
                    //  })}
                    />
                    <i className="bg-blue-500 rounded w-full bottom-0 left-0 absolute 
                    h-10 -z-10 duration-500 origin-bottom transform peer-focus:h-10 peer-placeholder-shown:h-[0.5px]"/>
                    <label className='peer-focus:font-medium absolute text-sm duration-500 transform translate-y-8 scale-75 top-3
                     left-0 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:text-gray-500
                     peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8'
                     htmlFor='email'> 
                    Enter Username</label>
                </div>
                <div className="relative flex flex-col mb-12">
                    <input 
                    type="password"
                    id="password"
                    placeholder=''
                    onChange={handleChange}
                    className='relative z-10 border-0 border-b-2 border-blue-500 h-10 bg-transparent
                     text-gray 100 outline-none px-2 peer'
                    //  {...register('password',{
                    //     required: 'Please Enter Password',
                    //     minLength:{
                    //         value:5,
                    //         message:"Password must be more than 4 characters"
                    //     }
                    //  })}
                    />
                    
                    <i className="bg-blue-500 rounded w-full bottom-0 left-0 absolute 
                    h-10 -z-10 duration-500 origin-bottom transform peer-focus:h-10 peer-placeholder-shown:h-[0.5px]"/>
                    <label className='peer-focus:font-medium absolute text-sm duration-500 transform translate-y-8 scale-75 top-3
                     left-0 z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 peer-placeholder-shown:text-gray-500
                     peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8'
                     htmlFor='password'> 
                    Password</label>
                </div>
               <button type="submit"
               onClick={login}
               className="py-3 text-gray-100 bg-blue-500 w-full rounded hover:bg-blue-600 hover:scale-100 duration-100">
                {isLoading ? <CircularProgress/>: "Sign in"}
                </button>
                <div className="bg-red-100 text-red-600">{error}</div>
            </form>
            </div>
        </div>
      
    </div>
  )
}

export default Login

