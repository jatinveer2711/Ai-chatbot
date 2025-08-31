import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Authprovider } from './context/AuthoProvider.jsx'

createRoot(document.getElementById('root')).render(
   <Authprovider>
   <BrowserRouter><App /></BrowserRouter>  
   </Authprovider>
   //  browser router me hmne app.jsx o import kra liya or app.jsx me sbke router  h (login home singup)
)
