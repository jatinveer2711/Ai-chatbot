import React from 'react'
import Home from './components/Home'
import Signup from './components/Signup'
import {Navigate, Route,Routes} from "react-router-dom"
import Login from './components/Login'
import { useAuth } from './context/AuthoProvider'

export default function App() {
  const [ authuser ]=useAuth() // useauth se le rha h auhtuser or authuser me token get krre h 
  console.log(authuser)
  return (
    <div >
    {/* authuser import krra h taaki ek authicated  user website ko accesss krr paaye  or ye  route ko protect krra h  */}
      <Routes>
      {/* agr authuser h to home page dikhayo or agr nhi h to use login page prr daal denge  */}
        <Route path="/" element={ authuser?<Home></Home>:<Navigate to={"/login"} />}/> 


              {/* agr authuser h to home page dikhayo or agr nhi h to use home  page prr daal denge  */}

        <Route path="/login" element={ authuser? <Navigate to={"/"}/>:<Login></Login>} />
              {/* agr authuser h to home page dikhayo or agr nhi h to use home page prr daal denge  */}

        <Route path="/signup" element= { authuser? <Navigate to={"/"}/>:<Signup></Signup>} />
      </Routes>
      {/* <Home></Home>
      <Login></Login>
      
      <Signup></Signup> */}
    </div>
  )
}
