import { createContext, useState } from "react";
import Snackbar from "../components/snackbar/Snackbar";

export const SnackbarContext = createContext()

const SnackbarContextProvider = ({children}) => {

    const[message,setMessage] = useState('')

    const showSnackbar = (mesaage) => {
        setMessage(mesaage)
        setInterval(closeSnackbar,5000)
    }

    const closeSnackbar = () => {
        setMessage('')
    }

    return ( 
        <SnackbarContext.Provider value={{showSnackbar, closeSnackbar}}>
            {children}
            <Snackbar/>
        </SnackbarContext.Provider>
     );
}
 
export default SnackbarContextProvider;