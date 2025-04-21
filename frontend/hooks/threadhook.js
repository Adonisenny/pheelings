import { useContext } from "react";
import { ThreadContext } from "../TheContext/threadContext";




export const UseThreadContext = () => {
    const thecontext = useContext(ThreadContext)
    if(!thecontext){
        throw Error('use threadcontent in the right state')
    }
    return thecontext
}