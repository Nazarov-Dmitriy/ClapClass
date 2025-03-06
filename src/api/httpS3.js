import axios from 'axios'

const axiosFileS3 = axios.create({
    baseURL: import.meta.env.VITE_S3_URL,
    responseType: 'blob',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, x-requested-with'
    }
})

axiosFileS3.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

axiosFileS3.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return Promise.reject(error.response)
    }
)
export default axiosFileS3
