import { createContext, useContext, useReducer } from "react";

export const ThreadContext =createContext()


export const Threadreducer =(state,action) => {
switch(action.type){
    case "SET_THREAD":
        return{
            thread:action.payload
        }
        case "CREATE_THREAD":
            return{
                thread:[action?.payload,...state?.thread]
            }
            case "DELETE_THREAD":
                return{
                    thread:state?.thread?.filter(b => b?.id !== action.payload?._id)

                }
                default:
                    return state

}

}






export const ThreadContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(Threadreducer,{
        thread:[]
    }
    )
    return(
        <ThreadContext.Provider value={{...state,dispatch}}>
            {children}
        </ThreadContext.Provider>
    )
}