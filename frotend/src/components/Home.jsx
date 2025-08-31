import React from 'react'
import Prompt from './Prompt'
import { useState } from 'react';
import { MessageCircleDashedIcon} from 'lucide-react'



import Sidebar from './Sidebar'

export default function Home() {
   const [showSidebar, setShowSidebar] = useState(true);
   const [newchat,setNewChat]=useState(false)
   const handlenewchat = () => {
  const confirm = window.confirm("Start a new chat? Previous conversation will be lost.");
  if (confirm) {
    setNewChat(prev => !prev);
  }
};
 
  return (

      <div className='flex h-screen bg-[#1e1e1e] text-white' >

      {/* ✅ Sidebar ko sirf tabhi render karo jab showSidebar true ho */}
      {showSidebar && (
        <div className={`fixed top-0 left-0 h-full w-64 bg-[#232327] z-20 transform transition-transform duration-300 ease-in-out ${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        }`}>
       
          {/* Sidebar ko prop bhej rahe hai for close button */}
  
          <Sidebar onClose={() => setShowSidebar(false)} onNewChat={handlenewchat} />
        </div>
      )
    }
     {!showSidebar && (
        <button
          className='absolute top-4 left-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500 transition'
          onClick={() => setShowSidebar(true)}
        ><MessageCircleDashedIcon></MessageCircleDashedIcon>
          {/* Show Sidebar */}
        </button>
      )}
      
     
    {/* // <div className='flex h-screen bg-[#1e1e1e] text-white' >
    //     {/* sidebar code */}
    {/* //   <div className='w-64 bg-[#232327]'><Sidebar></Sidebar> </div> */} 

       

      {/* promptcode */}
      <div className='flex-1   flex  flex-col w-full' >  
        
       
        <div className='flex-1 flex items-center justify-center px-6'>
            <Prompt newchat={newchat} ></Prompt>
        </div>
      </div>
    </div>
  )
  
}
