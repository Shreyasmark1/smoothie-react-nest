import axios from "axios"
import { BASE_URL } from "../utils/Constants"


export const httpPost = ({ path, body = null }) => {

    return new Promise((resolve, reject) => {
        axios.post(
            `${BASE_URL}${path}`,
            body
        )
            .then((res) => {
                return resolve(res)
            })
            .catch((e) => {
                return reject(e)
            })
    })

}

export const httpGet = ({ path, param = null }) => {

    return new Promise((resolve, reject) => {
        axios.get(
            `${BASE_URL}${path}`,
            {
                params: param
            }
        )
            .then((res) => {
                return resolve(res)
            })
            .catch((e) => {
                return reject(e)
            })
    })
}

export const httpPut = ({ path, body = null }) => {

    return new Promise((resolve, reject) => {
        axios.put(
            `${BASE_URL}${path}`,
            body
        )
            .then((res) => {
                return resolve(res)
            })
            .catch((e) => {
                return reject(e)
            })
    })

}

export const httpFileUpload = ({ path, file = null }) => {

    return new Promise((resolve, reject) => {
        axios.post(
            `${BASE_URL}${path}`,
            file
        )
        .then((res) => {
             return resolve(res)
        })
        .catch((e) => {
            return reject(e)
        })

    })
}