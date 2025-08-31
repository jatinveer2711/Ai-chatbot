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
  

// refresh ke baad user ka data htt na jaaye isliye hm localstorage me data store krre h or firr fetch krenge
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

  console.log(prompt)

 




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
    <div className='flex flex-col items-center justify-between flex-1 w-full px-4 pb-4'>
    <div>
      {/* greeting section  */}
      <div className='mt-16 text-center'>
        {/* <img src='' alt='' /> */}
        <h1 className='text-3xl font-semibold text-white mb-2'>Hi, I'am Megatrone</h1>
      </div>
      <p className='text-gray-400 texxt-base mt-2'>How  can I help you today?</p>
    </div>


    {/* prompt */}


    <div className='w-full max-w-4xl flex-1 overflow-y-auto mt-6 mb-4 space-y-4 max-h-[60vh] px-1'>
    {prompt.map((msg,index)=>(
      <div key ={index} className={`w-full flex ${msg.role==="user"?"justify-end":"justify-start"}`}>{msg.role==="assistant"?
        (<div className='w-full bg-[#232323] text-white rounded-xl px-4 py-3 text-sm whitespace-pre-wrap'>
          <ReactMarkdown
          remarkPlugins={[remarkGFm]}
          components={{
            code({node,inline,className,children,...props}) {
              const match =/language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                style={codeTheme}
                language={match[1]}
                PreTag="div"
                className="rounded-lg mt-2"
                {...props}
                >
                {String(children).replace(/\n$/,"")}
                </SyntaxHighlighter>
              ) : (
                <code
                className='bg-gray-800 px-1 py-0.5 rounded'
                {...props}
                >
                  {children}
                  </code>
              )

              
            }
          }}
          >{msg.content}
          </ReactMarkdown>
        </div>):(
       
        <div className='w-[50%] bg-blue-700 text-white rounded-xl px-4 py-2 text-sm whitespace-pre-wrap'>{msg.content}</div>

      )}</div>
    ))}
    {loading && Typemessage && (
      <div className=' justify-end self-end ml-auto break-words w-[30%] bg-blue-700 text-white rounded-xl px-4 py-2 text-sm whitespace-pre-wrap'>{Typemessage}</div>
    )}
    {loading && (
      <div className='flex justify-start w-full'>
      <div className='bg-[#323232] text-white px-4 py-2 rounded-xl text-sm whitespace-pre-wrap'>loading...</div>
      </div>
    )}
    <div ref={promptEndREf}/>
      </div>
    
      {/* <div></div> */}
    

    {/* input box */}

    
    <div className=' w-full  max-w-4xl relative mt-auto '>
      <div className=' flex items-center bg-[#2f2f2f] rounded-[2rem] px-6 py-2 shadow-md'>
        <input type='text' 
        value={inputValue}   //jb koi user text dalega to neeche di gyi line setInputvalue(e.target.value)} iinputvalue ko update krri h matlab isme present text daal rhi h or firr value usko inputvalue ko dikha rha h 
        //onkeydown me store handlekeydown ek function h jo ki handlesend ko call krra h "enter hi krne   se"
        onChange={(e)=>setInputvalue(e.target.value)} onKeyDown={handlekeydown}  placeholder='Message Deepseek' className=' flex items-center bg-transparent w-full text-white placeholder-gray-400 text-lg outline-none'/>
        <div className='flex items-center justify-between mt-4 gap-4'>
          <div className='flex gap-2'>
            {/* <button className='flex items-center gap-2 border-gray-500 text-white text-base px-3 py-1.5 rounded-full hover:bg-gray-600 transition'><Bot className='w-4 h-5'/>DeepThink (R1)</button> */}
            {/* <button className='flex items-center gap-2 border-gray-500 text-white text-base px-3 py-1.5 rounded-full hover:bg-gray-600 transition'><Globe className='w-4 h-5'/>Search</button> */}
            </div>
            <div className='flex items-center gap-2'>
              <button className='text-gray-400 hover:text-white transition'><Paperclip></Paperclip></button>
              <button onClick={handlesend}  className='bg-gray-500 hover:bg-blue-900 p-2 rounded-full text-white transition'> <ArrowUp className='w-4 h-4'></ArrowUp></button>
            </div>
        </div>
      </div>
    </div>



    </div>
  )
}

