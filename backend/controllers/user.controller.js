import { User } from "../model/user.Model.js";
import bcrypt from "bcryptjs";
import  config from "../config.js";
import jwt from "jsonwebtoken"


//sign up function
// we use awit ki jb tk respose nhi aa jata tb tk wait kro 

export const signUp=async (req,res)=>{
    const{firstName,lastName,email,password}=req.body; //  re.body se le rhe h means frotend se le rha h 
    
    try{
        const user= await User.findOne({email:email})
        if(user){                                    
            return res.status(400).json({error:"User already exists"})//
        }

        const hashPassword= await bcrypt.hash(password,10) // bcrypt is used to hide or hash the password in database

        const newuser=new User({                             // for fresh users and (this is part of else)
            firstName,lastName,email,password:hashPassword, 
        })
         await newuser.save()
       return res.status(201).json({message:"User signup successed"})


    }catch(error){
        console.log("Error in signup: ",error)
         return res.status(201).json({message:"error in signup"})
    }
};



//login function



export const login= async(req,res)=>{
    const{email,password}=req.body;
     try{
        const user= await User.findOne({email:email})//
        const  ispasswordCorrect =await bcrypt.compare(password,user.password)// if email is same then check your password is same as user.password
        if(!user || !ispasswordCorrect){  //that means if user and password did not find in database show error
           return res.status(403).json({error:"Invaild credentials"})
        }
        //jb koi user signup ke baad login krta h or login me email or password shi store krta h tb uss aunthicated user ke liye ek token generate hoga or iss token ke through  uss user ke liye ek access provide hoga jisse vo website use kr payega
        //jwt code for token genreation
        const token=jwt.sign({id:user._id},config.JWT_USER_PASSWORD,{
            expiresIn:"1d" 

        })
        const cookieOptions={ // cookieoptions  token ke liye condtions de rha h 
            expires:new Date(Date.now()+24*60*60*1000), // that date means one day 
            httpOnly:true, // the cookie can not access directly
            sercure:process.env.NODE_ENV==="production", // 
            sameSite:"strict"
        }

        //after genrate the token we send the token in cookie. cookie helps to store  the token so the user dont want to login again and again

        res.cookie("jwt",token,cookieOptions)
        return res.status(201).json({message:"Login successed",user,token})
     } catch (error){
          console.log("Error in Login: ",error)
         return res.status(500).json({errors:"error in Login"})
     }
};


//logout function


export const logout=(req,res)=>{
    try{
        res.clearCookie("jwt") //clear the cookie and jwt is name of cookie
        return res.status(200).json({message:"Logout seccessed"})
    }
     


    catch (error){
        console.log("Error in Logout: ",error)
         return res.status(500).json({errors:"error in Logout"})
    }
}