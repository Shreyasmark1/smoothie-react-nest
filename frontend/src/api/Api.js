import { httpPost } from './AxiosHelper'
import './AxiosInterceptor'

export const Register = (body) => {
    return new Promise((resolve, reject) => {

        httpPost({ path: '/user/signup', body: body })
            .then((res) => {
                resolve(res)
            })
            .catch((e) => {
                reject(e)
            })
    })

}