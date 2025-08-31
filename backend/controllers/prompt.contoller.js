import { OpenAI }  from "openai";
import { prompt } from "../model/user.prompt.js";
// import { Content } from "openai/resources/containers/files/content.mjs";
const openai = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: process.env.OPEN_API_KEY
});

//

export const   sendPromt=async(req,res)=>{
    
    const {content}=req.body // req.body means frotend se aa rhi h 
    const userID=req.userID; 
    if(!content || content.trim()===""){ 
        return res.status(400).json({errors:"prompt content is required"});
        }
        try{
            //save user prompt 
             const userPrompt=await prompt.create({ 
                userID,
                role:"user",
                content
             })
            
            //send prompt to openai
            const completion =await openai.chat.completions.create({ // user jo bhi content dala usko ai me send krne ke liye
                messages:[{role:"user",content : content}], // role means jo user send krra h or content me hmne content pass kiya jisme user apna content dalega
                model:"openai/gpt-4o",
                max_tokens:1000
            });
            const aicontent = completion.choices[0].message.content; // ai answer de rha h  

            //save assitant prompt 
             const aimessage=await prompt.create({  // ai content databse me sote krre h  jo ki prompt ke karan ho rha h 
                userID,
                role:"assistant",
                content:aicontent // content me hm ai ka asnwer store krre h 
             })
             return res.status(200).json({reply:aicontent}) // ai ka asnwer return krre h 

        } catch (error){  // it is used for catch the error
            console.log("Error in prompt: ",error)
            return res.status(500).json({error:"something went wrong with ai response"})

        }
    }

