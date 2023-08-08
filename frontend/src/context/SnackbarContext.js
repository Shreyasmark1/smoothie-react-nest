import { createContext, useState } from "react";
import Snackbar from "../components/snackbar/Snackbar";

export const SnackbarContext = createContext()

const SnackbarContextProvider = ({children}) => {

    const[message,setMessage] = useState('')
    const[timer,setTimer] = useState(null)

    const showSnackbar = (mesaage) => {
        if(timer !== null){
            clearTimer()
        }
        setMessage(mesaage)
        setTimer(setInterval(closeSnackbar,5000))
    }

    const clearTimer = () =>{
        clearTimeout(timer)
    }

    const closeSnackbar = () => {
        setMessage('')
    }

    return ( 
        <SnackbarContext.Provider value={{showSnackbar, closeSnackbar}}>
            {children}
          {
            message?   <Snackbar mesaage={message} />:  null
          }
        </SnackbarContext.Provider>
     );
}
 
export default SnackbarContextProvider;