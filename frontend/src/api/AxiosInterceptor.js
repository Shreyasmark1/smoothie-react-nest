import axios from "axios"
import { BASE_URL } from "../utils/Constants"

const OPEN_URL_LIST = [
    '/signup',
    '/login'
]

const MULTI_PART_LIST = [
    '/upload-image',
    '/upload-document'
]

const AUTHENTICATE = '/login'

// const destroyToken = () => {
//     removeAdminAuthToken()
// }

const handleServerError = (error) => {

    if( error && error.response && error.response.data && error.response.data.description){
        return error.response.data.description
    }

    if(error.message){
        return error.message
    }

    return "Something went wrong"
}

const createRequestInterceptor = () => {

    axios.interceptors.request.use(config => {

        // let token = getAdminAuthtoken()

        // open url list will be excluded
        // if (!OPEN_URL_LIST.includes(config.url.replace(BASE_URL, '')) && token) {
        //     config.headers['Authorization'] = `Bearer ${token}`;
        // }

        if(!MULTI_PART_LIST.includes(config.url.replace(BASE_URL, ''))){

            config.headers['Content-Type'] = 'application/json';

        } else {

            config.headers['Content-Type'] = 'multipart/form-data'

        }

        // decamelize payload
        // if (config.method.toUpperCase() === 'POST' && config.data) {
        //     config.data = decamelizeKeys(config.data, { split: /(?=[A-Z0-9])/ })
        // }
        return config
    }, error => {
        return Promise.reject(error)
    })
}

const createResponseInterceptor = () => {


    const interceptor = axios.interceptors.response.use(({ config, data }) => {


    if (config.url.replace(BASE_URL, '') === AUTHENTICATE) {

        /*
           -> save token and user data in local storage
           -> delete token from data object
        */

        //TODO : Change below code according to API response
        // if (data.status && data.data.jwt ) {

        //     setAdminAuthToken(data.data.jwt)
            
        //     delete data.data.jwt

        // }

    }

    return Promise.resolve(data)

}, e =>  {

    // reject error if not 401
    // if (e.response.status !== 401) {
    //     return Promise.reject(handleServerError(e))
    // }

    if (e?.response?.status === 401) { //TODO : exclude authenticate api
        // destroyToken()
        window.location = "/login";
    }

    //TODO: uncomment and update 
    return Promise.reject(handleServerError(e))

    /*
        -> Eject response interceptor to avoid cyclic infinite 401
        -> Send token refresh request
        -> After sucessfull response store token and send previous request
        -> In case of error clear token and user data and navigate to login 
    */

    // axios.interceptors.response.eject(interceptor);

    // return axios.post(
    //     `${BASE_URL}silent-login`,
    //     null
    // )
    //     .then((res) => {
    //         //TODO : Change below code according to API response
    //         setAuthToken(res.data.data)
    //         createResponseInterceptor()
    //         return axios(e.response.config)
    //     })
    //     .catch((voError) => {
    //         destroyToken()
    //         createResponseInterceptor()
    //         return Promise.reject(handleServerError(voError))
    //     })
})
}

createRequestInterceptor()
createResponseInterceptor()