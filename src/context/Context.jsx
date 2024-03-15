import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context=createContext();

const ContextProvider=(props)=>{
    const [recentPrompt,setRecentPrompt]=useState();
    const [input,setInput]=useState();
    const [prevPrompt,setPrevPrompt]=useState([]);
    const [showResult,setShowResult]=useState(false);
    const [loading,setLoading]=useState(false);
    const [resultData,setResultData]=useState('');

    const onSent=async (prompt)=>{
        setResultData('');
        setLoading(true);
        setShowResult(true);
        let response;
        if(prompt!==undefined)
        {
            setRecentPrompt(input);
             response=await runChat(prompt);
        }else{
             response=await runChat(input);
            setRecentPrompt(input);
            setPrevPrompt(()=>[...prevPrompt,input]);
        }
          
        let responseArray=response.split("**");
        let newResponse="";
        for(let i=0;i<responseArray.length;i++)
        {
            if(i===0||i%2==0)
            {
                newResponse+=responseArray[i];
            }else{
                newResponse+="<b>"+responseArray[i]+"</b>"
            }
        }
        let newArray2=newResponse.split("*").join("</br>")
        setResultData(newArray2);
        setLoading(false);
        setInput("");
        console.log("data",newArray2)
    }
   
const contextValue={
    recentPrompt,setRecentPrompt,
    input,setInput,
    prevPrompt,setPrevPrompt,
    showResult,setShowResult,
    loading,setLoading,
    resultData,setResultData,
    onSent
}

return(
    <Context.Provider value={contextValue}>
        {props.children}
    </Context.Provider>
)
}

export default ContextProvider;