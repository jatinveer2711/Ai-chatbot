// import React, { useState } from 'react'
import { LogOut, X ,Plus , ChartAreaIcon} from 'lucide-react'
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
  
 

  
   <div className='h-screen flex flex-col bg-[#171717] border-r border-white/5 w-72 transition-all duration-300 ease-in-out shadow-2xl'>

  {/* Header Section */}
  <div className='p-5 flex items-center justify-between'>
    <div className='flex items-center gap-2'>
      <div className='w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white'>M</div>
      <span className='text-lg font-semibold text-white tracking-tight'>Megatrone</span>
    </div>
    <button 
      onClick={onClose} 
      className="p-2 hover:bg-white/10 rounded-full transition-colors group"
    >
      <X className='text-gray-400 group-hover:text-white w-5 h-5'/>
    </button>
  </div>

  {/* Action Section */}
  <div className="px-4 mb-2">
    <button 
      onClick={onNewChat} 
      className='w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95'
    >
      <Plus size={18} /> New Chat
    </button>
  </div>

  {/* History List - Flex-1 ensures this takes up all remaining space */}
  <div className='flex-1 overflow-y-auto px-3 py-2 space-y-1 custom-scrollbar'>
    <p className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-widest">Recent Chats</p>
    
    <ul className="space-y-1">
      {history.map((item) => (
        <li 
          key={item._id} 
          className='group flex flex-col p-3 hover:bg-white/5 rounded-xl cursor-pointer transition-all border border-transparent hover:border-white/10'
        >
          <span className='text-sm text-gray-200 font-medium truncate w-full'>
             {item.content || "Untitled Chat"}
          </span>
          <span className='text-xs text-gray-500 truncate'>
            {item.response?.substring(0, 40)}...
          </span>
        </li>
      ))}
    </ul>
  </div>

  {/* Profile & Footer */}
  <div className='p-4 mt-auto border-t border-white/5 bg-[#1a1a1a]'>
    <div className='flex flex-col gap-2'>
      <div className='flex items-center gap-3 p-2 hover:bg-white/5 rounded-xl cursor-pointer transition-colors group'>
        <div className="relative">
          <img className='rounded-full w-9 h-9 border border-white/10' src={profile} alt='User'/>
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#1a1a1a] rounded-full"></div>
        </div>
        <div className="flex flex-col">
          <span className='text-sm font-medium text-white group-hover:text-indigo-400 transition-colors'>
            {user ? user.firstName : "Guest User"}
          </span>
          <span className="text-[10px] text-gray-500 uppercase">Pro Plan</span>
        </div>
      </div> 

      <button 
        onClick={handlelogout} 
        className='flex items-center gap-3 text-sm text-gray-400 font-medium px-3 py-2.5 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all duration-200'
      >
        <LogOut size={18} /> Logout
      </button>
    </div>
  </div>
  
</div>
  )
}




// line 60 prr agr user h to user ka firstname dikhana h   nhi to myprofile dikahani h  or user ek variable jisme localstorage se user data get krre h 

