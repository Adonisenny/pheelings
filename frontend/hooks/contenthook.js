import { useContext } from "react";
import { ContentContext } from "../TheContext/contentcontext";

export const UseContentContext = () => {
    const mycontext = useContext(ContentContext)
    if(!mycontext){
        throw Error('use contentContext in the right state')
    }
    return mycontext
}