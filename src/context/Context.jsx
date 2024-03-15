import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context=createContext();

const ContextProvider=(props)=>{
    const [recentPrompt,setRecentPrompt]=useState();
    const [input,setInput]=useState();
    const [prevPrompt,setPrevPrompt]=useState([]);
    const [showResult,setShowResult]=useState(false);
    const [loading,setLoading]=useState(false);
    const [resultData,setResultData]=useState();

    const onSent=async (prompt)=>{
        await runChat(prompt);
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