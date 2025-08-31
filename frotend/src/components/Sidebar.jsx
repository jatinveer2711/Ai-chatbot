// import React, { useState } from 'react'
import { LogOut, X ,ChartAreaIcon} from 'lucide-react'
import profile from "/image.png"
import React, { useEffect, useState } from "react";
import { useAuth } from '../context/AuthoProvider'
import { useNavigate } from 'react-router-dom'


import axios from 'axios'

export default function Sidebar({onClose,onNewChat}) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token'); // login ke baad save kiya hoga
        const res = await axios.get("http://localhost:4002/api/v1/history/history", { // ye backend me route ko call krri h jisme middleware h or gethistory function h 
          headers: {
            Authorization: `Bearer ${token}`  //token bejh diya middleware ko ab vo verify krega 
          }
        });
        setHistory(res.data); //data fetch krr liya
      } catch (err) {
        console.error('Error fetching history:', err);
      }
    };

    fetchHistory();
  }, []);



  const user = JSON.parse( localStorage.getItem("user"))
console.log(user)

const[,setAuthuser]=useAuth() //ye hmne isiye inport kraya h taaki hm setauthuser ki value null kr de 
const navigate=useNavigate()//navigate ko isliye import krre h taaki hm user ko login page prr bejh de logout click krne ke baad


const handlelogout=async()=>{
  
  try {
    const {data}=await axios.get("http://localhost:4002/api/v1/user/logout",{ //ye url hmari backend ki funnction ko call krra h jisme clear cookie ka code h 
    withCredentials:true
  })
  localStorage.removeItem("user") //user ke data ko remove kr dega 
  localStorage.removeItem('token') //token ko remove kr dega 
  alert(data.message) //backend me jo message pda hua h usko send krdo lo;gout successful 
  
  setAuthuser(null) //setauthuser ki value null kr denge jismme token or cookie pdi hu;i  h 
  navigate("/login")  //sb ho jane ke baad user ko login page prr bejh do
  }
  catch(error) {
          alert(error?.response?.data?.errors || "logout failed") //koi error aata h to usko ye message dikha do 
  }
}

return (
  
 

  
    < div className='h-full flex flex-col bg-[#232327]'>


      {/* Header */}
      <div className='p-4 border-gray-700 flex items-center justify-between'>
      <div className='text-xl font-bold text-white'></div>
      <button onClick={onClose}><X className='text-gray-300 w-6 h-6'/></button>
      </div>
    


     <div>
      <button
  onClick={() => setShowSidebar(false)}
  className="absolute top-4 left-4 flex items-center gap-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
  Chat
</button></div>

      



      {/* History */}
      <div className='flex-1 overflow-y-auto px-4 py-3 space-y-2'>
      <button    onClick={ onNewChat} className='w-full bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl mb-4'>+New Chat</button>
      <div className='flex-1 overflow-y-auto px-4 py-3 space-y-2'> <ul>
  {history.map((item) => (
    <li key={item._id} className='mb-4 p-2 bg-[#2e2e2e] rounded'>
      <p><b>Prompt:</b> {item.content}</p>
      <p><b>Response:</b> {item.response}</p>
    </li>
  ))}
</ul>
</div>
      </div>
      
      
     
      

     <div>
     <div className='p-4 border-t  border-gray-700'>
        <div className='flex flex-col gap-3'>
            <div className='flex items-center gap-2 cursor-pointer'>
                <img className='rounded-full w-8 h-8'src={profile} alt=''/>
                <span className='text-gray-300'>{user?user.firstName:"My profile"}</span> 
            </div> 
            <button onClick={handlelogout} className='flex items-center gap-2 text-sm text-white px-4 py-2 rounded-lg  hover:bg-gray-700 transition duration-300'><LogOut className=''/>Logout</button>
        </div>
     </div>
      
    </div>
    </div>
  )
}




// line 60 prr agr user h to user ka firstname dikhana h   nhi to myprofile dikahani h  or user ek variable jisme localstorage se user data get krre h 

