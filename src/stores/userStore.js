import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        user: null,
        token: '',
        error: null,
        successRes: false,
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
        getRes(state) {
            return state.successRes
        },
        isAuthenticated(state) {
            return !!state.token
        }
    },

    actions: {
        async fetchUser() {
            if (this.isAuthenticated) {
                try {
                    const { data } = await axiosR.get('/users')
                    this.user = {
                        id: data.id,
                        name: data.name,
                        email: data.email
                    }
                } catch (err) {
                    console.error('Ошибка при получении данных пользователя:', err)
                    this.error = {
                        message: 'Ошибка получения данных пользователя',
                        statusCode: err.response?.status || 500
                    }
                }
            }
        },

        async login(data) {
            try {
                const res = await axiosR.post('/auth', data)
                this.token = res.data.token
                this.user = {
                    id: res.data.id,
                    name: res.data.name,
                    email: res.data.email
                }
                cookie.set('token', res.data.token, {
                    expires: 1,
                    secure: true,
                    httpOnly: true,
                    sameSite: 'Strict'
                })
                this.error = null
            } catch (err) {
                this.error = {
                    message:
                        typeof err.response?.data === 'string' ? err.response.data : 'Ошибка входа',
                    statusCode: err.response?.status || 500
                }
                console.error('Ошибка при входе:', this.error)
            }
        },

        async autoLogin() {
            const token = cookie.get('token')
            if (token) {
                this.token = token
                this.isAuthenticated = true
                try {
                    const { data } = await axiosR.post('/auth', { token })
                    this.user = {
                        id: data.id,
                        name: data.name,
                        email: data.email
                    }
                } catch (err) {
                    console.error('Ошибка при автологине:', err)
                    this.token = null
                    this.isAuthenticated = false
                }
            } else {
                this.token = null
                this.isAuthenticated = false
            }
        },

        async registerUser(data, result) {
            try {
                const res = await axiosR.post('/register', data)
                if (res.status === 201) {
                    this.token = res.data.token
                    this.user = {
                        id: res.data.id,
                        name: res.data.name,
                        email: res.data.email
                    }
                    this.error = null
                    cookie.set('token', res.data.token, {
                        expires: 1,
                        secure: true,
                        httpOnly: true,
                        sameSite: 'Strict'
                    })
                    result(201)
                } else {
                    result(res.status)
                }
            } catch (err) {
                this.error = {
                    message:
                        typeof err.response?.data === 'string'
                            ? err.response.data
                            : 'Ошибка регистрации',
                    statusCode: err.response?.status || 500
                }
                console.error('Ошибка при регистрации:', this.error)
                result(err.response?.status || 500)
            }
        }
    }
})
