import axios from "axios";

const request = axios.create({
    baseURL: "http://localhost:3000/api/v1/auth"
})

const addAccessToken = (type, token) => {
    request.defaults.headers.common = {
        ...request.defaults.headers.common,
        Authorization: `${type} ${token}`
    }

    console.log(type, token)
} 

export { request as authRequest, addAccessToken };
