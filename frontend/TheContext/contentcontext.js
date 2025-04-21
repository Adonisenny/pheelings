import { createContext, useReducer } from "react"

export const ContentContext = createContext()


export const contentReducer =(state,action) => {
    switch(action.type){
        case 'SET_CONTENT':
            return{
                contents:action.payload
            }
            case 'CREATE_CONTENT':
                return{
                    contents:[action.payload, ...state.content]
                }
                case 'DELETE_CONTENT':
                    return{
                        contents:state?.content.filter(b => b?.id !== action.payload?._id)

                    }
                    default:
                        return state

    }
}


export const ContentContextProvider = ({children}) =>{

    const [state,dispatch] = useReducer(contentReducer, {
        content:[]
    })
    return(
        <ContentContext.Provider value={{...state,dispatch}}>{children}</ContentContext.Provider>
    )
}









