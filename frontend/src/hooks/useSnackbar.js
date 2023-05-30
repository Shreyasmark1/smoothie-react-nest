import { useContext } from "react"
import { SnackbarContext } from "../context/SnackbarContext"

export const useSnackbar = () => {

    const context = useContext(SnackbarContext)

    if(!context){
        throw Error("useSnackbar provider must be inside SnackbarContextProvider")
    }

    return context

}