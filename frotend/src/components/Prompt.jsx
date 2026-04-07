import { ArrowUp, Bot, Globe, Paperclip } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'


import ReactMarkdown from "react-markdown"
import remarkGFm from "remark-gfm"
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter"
import {tomorrow as codeTheme} from "react-syntax-highlighter/dist/esm/styles/prism"

export default function Prompt({ newchat}) {
 

  // Step 2: Save history in DB


  const [inputValue,setInputvalue]=useState("")
  const [Typemessage,setTypemessage]=useState("")

  const [prompt,setPrompt]=useState([]) // is prompt ka userstate hmne array islye rkha h taaki hm user ka qution or ai ka answer stor krr ske 
  const [loading,setLoading]=useState(false) // ye state loading ke liye j tk koi respine na aaye tb tk loader chlate rho 
  const promptEndREf=useRef()

useEffect(() => {
  if (newchat) {
    setPrompt([]);
    setTypemessage('');
  }
}, [newchat]);
  


  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (prompt.length > 0) {
    localStorage.setItem(`promptHistory_${user._id}`, JSON.stringify(prompt));
  }
}, [prompt]);
  
  useEffect(()=>{
    const user = JSON.parse( localStorage.getItem("user"))
     const storedPRompt=localStorage.getItem(`promptHistory_${user._id}`)
     if (storedPRompt){
      setPrompt(JSON.parse(storedPRompt))
     } 
    }, [])  
   


  useEffect(()=>{
     promptEndREf.current?.scrollIntoView({behavior:"smooth"})
  },[prompt,loading])

 

 




  const handlesend= async()=>{
    const trimmed=inputValue.trim() //trim means jb koi user message ke baad spacebar dbaye to vo space count na ho isliye ye trim lgaya h 
    if(!trimmed) return  // agr user kuch type nhi kiya h to usko return me kuch send mt kro "empty"
    setTypemessage(trimmed) //agr user ne kuch type kiya h to vhi value daal do jo user ne type ki h firr iske setypemessage typemessage ko update krega matlab inputvalue ki value ko type message me store krega or firr typemessage ko return kra lenge
    setInputvalue("") // fir setinput box again empty krdo
    setLoading(true)
    try{
      const token=localStorage.getItem("token") 
     const {data}= await axios.post("http://localhost:4002/api/v1/deepseekai/prompt",{ 
        content:trimmed 
      },{
        headers:{Authorization:`Bearer ${token}` //is line me hm headers ke authorization me bearer type ka token  bejh rhe h 
      },withCredentials:true
      
      }
    )
    setPrompt((prev)=>[
      ...prev, //user multiple data qution bejhega to prvios qutions bhi chaiye or new waale bhi 
      {role:"user",content:trimmed}, //agr role user h to qution bejh rha h 
      {role:"assistant",content:data.reply} //agr role assitant h to answer ai bejh rha h  or data me axios backend h islye data use krre h
    ])
    // Ye AI ka response aane ke turant baad daalna
await axios.post("http://localhost:4002/api/v1/history/save", {
  content: trimmed,         // user's qution
  response: data.reply      // AI's response
}, {
  headers: {
    Authorization: `Bearer ${token}`   // Token for authentication
  }
});


    }catch(error){
       setPrompt((prev)=>[
      ...prev,
      {role:"user",content:trimmed},
      {role:"assistant",content:"something went wrong the  AI response"}
    ])
  }
  finally{
    setLoading(false)
    setTypemessage(null)
  }
  
    
      
  
  };
  const handlekeydown=(e)=>{  //iss function ka mtlab h ki enter dbane se handlesend function ko call krdo
    if(e.key==="Enter")
      handlesend();
  }
  return (
  <div className='flex flex-col items-center justify-between h-screen w-full bg-[#171717] px-2 sm:px-4 pb-6'>
  
  {/* Header Section - Shrinks when messages appear */}
  {prompt.length === 0 && (
    <div className='flex flex-col items-center justify-center flex-1 transition-all duration-500'>
      <div className='text-center'>
        <div className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl mb-6 mx-auto shadow-lg shadow-blue-500/20" />
        <h1 className='text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight'>
          Hi, I'm <span className="text-blue-500">Megatrone</span>
        </h1>
        <p className='text-gray-400 text-lg'>How can I help you today?</p>
      </div>
    </div>
  )}

  {/* Chat History Area */}
  <div className={`w-full max-w-4xl flex-1 overflow-y-auto mt-4 mb-4 space-y-6 px-2 custom-scrollbar ${prompt.length > 0 ? 'block' : 'hidden md:block opacity-0'}`}>
    {prompt.map((msg, index) => (
      <div key={index} className={`w-full flex ${msg.role === "user" ? "justify-end" : "justify-start animate-in fade-in slide-in-from-bottom-2"}`}>
        {msg.role === "assistant" ? (
          <div className='max-w-[90%] md:max-w-[85%] bg-[#232323] border border-white/5 text-gray-100 rounded-2xl px-5 py-4 text-sm md:text-base shadow-sm'>
            <ReactMarkdown
              remarkPlugins={[remarkGFm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <div className="relative group">
                      <SyntaxHighlighter
                        style={codeTheme}
                        language={match[1]}
                        PreTag="div"
                        className="rounded-lg !mt-4 !mb-4 border border-white/10"
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code className='bg-[#383838] px-1.5 py-0.5 rounded text-blue-300' {...props}>
                      {children}
                    </code>
                  )
                }
              }}
            >
              {msg.content}
            </ReactMarkdown>
          </div>
        ) : (
          <div className='max-w-[85%] md:max-w-[70%] bg-blue-600 text-white rounded-2xl rounded-tr-none px-5 py-3 text-sm md:text-base shadow-lg shadow-blue-900/10'>
            {msg.content}
          </div>
        )}
      </div>
    ))}

    {/* Loading States */}
    {loading && Typemessage && (
      <div className='flex justify-end'>
        <div className='max-w-[70%] bg-blue-600/50 text-white/80 rounded-2xl px-5 py-3 text-sm animate-pulse'>
          {Typemessage}
        </div>
      </div>
    )}
    
    {loading && (
      <div className='flex justify-start animate-pulse'>
        <div className='bg-[#232323] text-gray-400 px-5 py-3 rounded-2xl text-sm border border-white/5'>
          Thinking...
        </div>
      </div>
    )}
    <div ref={promptEndREf} />
  </div>

  {/* Input Box Section */}
  <div className='w-full max-w-4xl px-2'>
    <div className='relative flex flex-col bg-[#212121] border border-white/10 rounded-[1.5rem] shadow-2xl focus-within:border-blue-500/50 transition-all duration-300'>
      <input 
        type='text' 
        value={inputValue}   
        onChange={(e) => setInputvalue(e.target.value)} 
        onKeyDown={handlekeydown}  
        placeholder='Message Megatrone...' 
        className='bg-transparent w-full text-white placeholder-gray-500 text-md md:text-lg outline-none px-6 py-4'
      />
      
      <div className='flex items-center justify-between px-4 pb-3'>
        <div className='flex gap-2'>
           {/* Add optional action buttons here */}
        </div>
        
        <div className='flex items-center gap-3'>
          <button className='text-gray-500 hover:text-white transition-colors p-1'>
            <Paperclip className="w-5 h-5" />
          </button>
          <button 
            onClick={handlesend}  
            disabled={!inputValue.trim()}
            className={`${inputValue.trim() ? 'bg-white text-black' : 'bg-gray-700 text-gray-500'} p-2 rounded-full transition-all duration-200`}
          > 
            <ArrowUp className='w-5 h-5 font-bold' />
          </button>
        </div>
      </div>
    </div>
    <p className="text-[10px] text-gray-600 text-center mt-3 uppercase tracking-widest font-medium">
      Megatrone can make mistakes. Check important info.
    </p>
  </div>
</div>
  )
}

