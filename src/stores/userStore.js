import { defineStore } from 'pinia'
import axiosR from '../api/http'
import { toast } from "vue3-toastify";
import 'vue3-toastify/dist/index.css';


export const useUserStore = defineStore('userStore', {
    state: () => ({
        user: null,
        token: '',
        error: null,
        isSuccess: '',
        isAuthenticated: false,
        isSuccessUpdate: false
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
            this.isSuccess = ''
        },
        login(data, remember) {
            this.isSuccess = ''
            axiosR
                .post(`/auth/sign-in`, data)
                .then((res) => {
                    if (res.status === 200) {
                        this.token = res.data.token
                        this.error = null
                        this.user = res.data.user
                        this.isSuccess = 'login'
                        localStorage.setItem('token', res.data.token)
                        localStorage.setItem('remember', remember)
                    }
                })
                .catch((err) => {
                    this.error = err.data
                })
        },

        forGotPassword(data) {
            this.isSuccess = ''
            axiosR
                .post(`/user/for-got-password`, data)
                .then((res) => {
                    if (res.status === 200) {
                        this.error = null
                        this.isSuccess = 'forGotPassword'
                    }
                })
                .catch((err) => {
                    this.error = err.data
                })
        },
        register(data) {
            this.isSuccess = ''
            axiosR
                .post(`/auth/sign-up`, data)
                .then((res) => {
                    if (res.status === 200) {
                        this.error = null
                        this.isSuccess = 'register'
                        toast.success("Пользователь успешно зарегистрирован", {
                            autoClose: 3000,
                            dangerouslyHTMLString: true,
                        });
                    }
                })
                .catch((err) => {
                    this.error = err.data
                })
        },
        autoLogin() {
            const token = localStorage.getItem('token')
            if (token) {
                axiosR
                    .post(`/auth/auto-login`, { token: token })
                    .then((res) => {
                        this.user = res.data
                    })
                    .catch(() => {
                        localStorage.removeItem('token')
                        window.location.reload();
                    })
            }
        },
        updateUserInfo(data) {
            this.isSuccess = '';
            const time_token = localStorage.getItem('remember') ? localStorage.getItem('remember') === true ? 'long' : "short" : false

            axiosR
                .post(`/user/info`, { ...data, time_token: time_token })
                .then((res) => {
                    if (res.status === 200) {

                        toast.success("Изменения сохранены", {
                            autoClose: 3000,
                            dangerouslyHTMLString: true,
                        });
                        this.user = res.data.user

                        if (res.data.token !== '') {
                            localStorage.setItem('token', res.data.token)
                        }
                        this.isSuccess = 'update-user'
                    }
                })
                .catch((err) => {
                    this.error = err.data
                })
        },
        logout() {
            this.isSuccess = ''
            axiosR
                .get('/auth/logout')
                .then((res) => {
                    if (res.status === 200) {
                        localStorage.removeItem('token')
                        this.user = null
                        this.isSuccess = 'logout'
                    }
                })
                .catch(() => {
                    toast.success("Ошибка", {
                        autoClose: 3000,
                        dangerouslyHTMLString: true,
                    });
                })
        },
        userAddAvatar(data) {
            axiosR
                .post(`/user/avatar/add`, data)
                .then((res) => {
                    this.user.avatar = res.data
                })
                .catch((err) => {
                    this.error = err.data
                })
        },
        userRemoveAvatar() {
            axiosR
                .get(`/user/avatar/remove`)
                .then((res) => {
                    if (res.status === 200) {
                        this.user.avatar = null
                    }
                })
                .catch((err) => {
                    this.error = err.data
                })
        },
        changePassword(data) {
            this.isSuccess = ''
            const time_token = localStorage.getItem('remember') ? localStorage.getItem('remember') === true ? 'long' : "short" : false

            axiosR
                .post(`/user/change-password`, {...data,time_token: time_token} )
                .then((res) => {
                    if (res.status === 200) {
                        this.isSuccess = 'changePassword'
                        localStorage.setItem('token', res.data)
                        toast.success("Пароль успешно изменен", {
                            autoClose: 3000,
                            dangerouslyHTMLString: true,
                        });
                    }
                })
                .catch((err) => {
                    this.error = err.data
                })
        },
        addSubscribe(email) {
            this.errors = null
            this.isSuccess = ''
            axiosR
                .post('/user/subscribe',  email )
                .then((res) => {
                    if (res.status === 200) {
                        this.isSuccess = 'subscribe'
                        this.user.subscribe = res.data
                    }
                })
                .catch((err) => {
                    this.errors = err.response.data
                })
        },
    }
})
