import { defineStore } from 'pinia'
import axiosR from '../api/http'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        user: null,
        token: '',
        error: null,
        isSuccess: false,
        isAuthenticated: false
    }),

    getters: {
        getUser(state) {
            return state.user
        },
        getToken(state) {
            return state.token
        },
        getError(state) {
            return state.error
        },
        getIsSuccess(state) {
            return state.isSuccess
        },
        isAuthenticated(state) {
            return !!state.token
        }
    },

    actions: {
        setErrors() {
            this.error = null
        },
        setIsSuccess() {
            this.isSuccess = false
        },
        async login(data, remember) {
            this.isSuccess = false
            axiosR
                .post(`/auth/sign-in`, data)
                .then((res) => {
                    if (res.status === 200) {
                        this.token = res.data.token
                        this.error = null
                        this.user = res.data.user
                        this.isSuccess = true
                        localStorage.setItem('token', res.data.token)
                        localStorage.setItem('remember', remember)
                    }
                })
                .catch((err) => {
                    this.error = err.data
                })
        },

        async forGotPassword(data) {
            this.isSuccess = false
            axiosR
                .post(`/user/for-got-password`, data)
                .then((res) => {
                    if (res.status === 200) {
                        this.error = null
                        this.isSuccess = true
                    }
                })
                .catch((err) => {
                    this.error = err.data
                })
        },
        async register(data) {
            this.isSuccess = false
            axiosR
                .post(`/auth/sign-up`, data)
                .then((res) => {
                    if (res.status === 200) {
                        this.error = null
                        this.isSuccess = true
                    }
                })
                .catch((err) => {
                    this.error = err.data
                })
        },
        async autoLogin() {
            const token = localStorage.getItem('token')
            if (token) {
                axiosR
                    .post(`/auth/auto-login`, { token: token })
                    .then((res) => {
                        this.user = res.data
                    })
                    .catch((e) => {
                        console.log(e);
                        localStorage.removeItem('token')
                        window.location.reload();
                    })
            }
        },
        logout() {
            axiosR
                .get('/auth/logout')
                .then((res) => {
                    if (res.status === 200) {
                        localStorage.removeItem('token')
                        this.user = null
                        this.successRes = true
                    }
                })
                .catch((error) => {
                    console.dir(error)
                })
        },
    }
})
