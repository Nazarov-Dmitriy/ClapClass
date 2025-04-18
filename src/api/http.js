import axios from 'axios'

const axiosR = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
        'Access-Control-Allow-Headers': ' Content-Type, x-requested-with',
        'Access-Control-Allow-Credentials': true
    }
})

axiosR.interceptors.request.use(
    (config) => {
        if (localStorage.getItem('token')) {
            config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
            config.headers['X-Requested-With'] = `XMLHttpRequest`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

axiosR.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        console.log(error)

        if (error.code === 'ERR_NETWORK' && window.location.pathname !== '/error') {
            window.location.href = '/error?status=500'
        }

        if (error.status === 403 && window.location.pathname !== '/error') {
            window.location.href = '/error?status=403'
        }

        return Promise.reject(error.response)
    }
)

export default axiosR
