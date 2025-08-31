import React, { useState } from 'react'
import {  Eye} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

export default function Signup() {
  const [formdata,setformdata]=useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",

  });
  const [error,setError]=useState("")
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()


  const handlechange=(e)=>{
     const value=e.target.value 
     const name=e.target.name  
    
    setformdata({
    ...formdata, 
    [name]:value, 
   
  })
   
  }
  

 

  const handleSignup=async()=>{ //this function send the data in backend api  or this is function call the backend api
    setLoading(true)
    setError("")
    try{

     const {data}= await axios.post("http://localhost:4002/api/v1/user/signup",{ //axios is used for the call the backend ai means it connect the frotend and backend
        firstName:formdata.firstName, 
        lastName:formdata.lastName,
        email:formdata.email,
        password:formdata.password,//isme ye backend me ja rhi h or datbase me store  ho rhi  h 
      },{
        withCredentials:true,   //it is used for handle with cokies
      })
      alert(data.message || "signup succeded ")//data.message backend me jo likha h singup ho jaane ke baad singup successed vvhi alert  message me ayega
      navigate("/login")   //after signup you  will be on loginpage


    }catch(error){
        const msg= error?.response?.data?.errors || "signup failed" // msg backend ka error dikha rha h or ? ye define krra h ki agr koi error ata h  to hmara frotend band  na ho
        setError(msg) //set error used for show the error on the page
    }
    finally{

      setLoading(false) //agr signup  suecced ho gya to loading nhi dikhna chaiye

    }
  }


  return (
         <div className=' min-h-screen flex items-center justify-center bg-black px-4'>
      <div className='bg-[#1e1e1e] text-white max-w-md rounded-2xl p-6 shadow-lg '>
        {/* Heading */}
        <h1  className='text-white items-center justify-center text-center'>Signup</h1>
        {/* first name */}
        <div className='mb-4 mt-2'>
            <input  className=" w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7a6ff0]"type='text'
            name='firstName'
            placeholder='FirstName'
            value={formdata.firstName} //ye praticular firstname ke liye h jo ki form data me bejh rha h 
            onChange={handlechange} //kuch bhi jb text change hoga to onchange call hoga jisme handlechange function h 
            />
            
        </div>


        {/* Lastname */}
        <div className='mb-4 mt-2'>
            <input  className=" w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7a6ff0]"type='text'
            name='lastName'
            placeholder='LastName'
             value={formdata.lastName}
            onChange={handlechange} //handle change function hrr value ko update krra h uske name ke basics prr
            />
        </div>


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
        <button onClick= {handleSignup} disabled={loading}  className='w-full bg-[#463ac4] hover:bg-[#6c61ac] text-white fonst-semibold py-3 rounded-lg transition disabled:opacity-50'> {loading?"signing..":"signup"} </button>



        {/* links */}
        <div className='flex justify-between mt-4 text-sm '><a className='text-[#463ac4] hover:underline' href='/login'>Already registerd</a>
        <Link className='text-[#463ac4] hover:underline' to={"/login"}>Login</Link>
        </div>

      </div>
    </div>
  )
}
