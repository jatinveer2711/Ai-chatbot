import { Children, createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

export const AuthoContext=createContext()

export  const Authprovider=({children})=>{ // is children me saare components aa rhe h "children=all components"
    const [authuser,setAuthuser]=useState(()=> {
      return localStorage.getItem("token") || Cookies.get("jwt") || null // is state me hm token or cookie get krre h localstorage se
    })
    return (
    <AuthoContext.Provider value={[authuser,setAuthuser]}>{children}</AuthoContext.Provider> //fir </AuthoContext.Provider> me  stat ko wrap kr denge taaki bahar use kr paaye
    )
}
//useauth ka useContext(AuthoContext) ko access krne ke liye usecontext ka use krre h 
export const useAuth=()=>useContext(AuthoContext) //Authocontext ko usecontext hook me daal diya h taaki isko bahar use krr paaye

// hme multiple componets me userlogin data chaiye isliye hmne ye folder bnaya h 
// iss folder ko wrap krke main.jsx me daal denge