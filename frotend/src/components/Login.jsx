import React, { useState } from 'react'
import {  Eye} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useAuth } from '../context/AuthoProvider';

export default function login() {
  const [formdata,setformdata]=useState({
       
        email:"",
        password:"",

  });
  const [error,setError]=useState("")
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()

  const[,setAuthuser]=useAuth();


  const handlechange=(e)=>{
     const value=e.target.value
     const name=e.target.name
    //  console.log(value,name)
    setformdata({
    ...formdata,
    [name]:value,
  })
  }
  

 

  const handleSignup=async()=>{
    setLoading(true)
    setError("")
    try{

     const {data}= await axios.post("http://localhost:4002/api/v1/user/login",{
        // firstName:formdata.firstName,
        // lastName:formdata.lastName,
        email:formdata.email,
        password:formdata.password,
      },{
        withCredentials:true,   //it is used for handle with cokies
      })
      console.log(data);
      alert(data.message || "login succeded")
      localStorage.setItem("user",JSON.stringify(data.user)) //browser ke local storage prr data send krre h  user ka
      localStorage.setItem("token",data.token)   //browser ke local storage prr token send krre h 
      setAuthuser(data.token) // brwoser ke localsotage me save token ko le rha h 
      navigate("/login")


    }catch(error){
        const msg= error?.response?.data?.errors || "login failed"
        setError(msg)
    }
    finally{

      setLoading(false)

    }
  }


  return (
         <div className=' min-h-screen flex items-center justify-center bg-black px-4'>
      <div className='bg-[#1e1e1e] text-white max-w-md rounded-2xl p-6 shadow-lg '>
        {/* Heading */}
        <h1  className='text-white items-center justify-center text-center'>login</h1>
         
         
         
          {/* email */}
         <div className='mb-4 mt-2'>
            <input  className=" w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7a6ff0]"type='text'
            name='email'
            placeholder='Enter your Email Here'
             value={formdata.email}
            onChange={handlechange}
            
            
             />
        </div>


        {/* password */}
         <div className='mb-4 mt-2 relative'>
            <input  className=" w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7a6ff0]"type='password'
            name='password'
            placeholder='Enter your password'
             value={formdata.password}
            onChange={handlechange}
            />
            <span className=' absolute right-3 top-3 text-gray-400'><Eye size={18}></Eye></span>
            
        </div>


        {/* Error Message */}
        {error && <span className='text-red-600 text-sm mb-4'>{error}</span>}



        {/* term and condition */}
        <p className='text-xs text-gray-400 mt-4 mb-6'>By singinup or logging in, you consent to deepseek's <a className='underline' href=''> Terms and use</a> and <a className='underline' href=''>Privacy  policy</a></p>



        {/* singup button */}
        <button onClick= {handleSignup} disabled={loading}  className='w-full bg-[#463ac4] hover:bg-[#6c61ac] text-white fonst-semibold py-3 rounded-lg transition disabled:opacity-50'> {loading?"login in..":"login"} </button>



        {/* links */}
        <div className='flex justify-between mt-4 text-sm '><a className='text-[#463ac4] hover:underline' href='/signup'>Haven't account</a>
        <Link className='text-[#463ac4] hover:underline' to={"/signup"}>signup</Link>
        </div>

      </div>
    </div>
  )
}

