import { defineStore } from 'pinia'
import axiosR from '../api/http'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useSocialStore = defineStore('userSocial', {
    state: () => ({
        list: null,
        error: null,
        isSuccess: ''
    }),
    getters: {
        getSocial(state) {
            return state.list
        },
        getError(state) {
            return state.error
        },
        getIsSuccess(state) {
            return state.isSuccess
        }
    },
    actions: {
        setErrors() {
            this.error = null
        },
        add(data) {
            this.isSuccess = ''
            axiosR
                .post(`/social/add`, data)
                .then((res) => {
                    if (res.status === 200) {
                        this.error = null
                        this.isSuccess = 'add'
                        toast.success('Данные сохранена', {
                            autoClose: 3000,
                            dangerouslyHTMLString: true
                        })
                    }
                })
                .catch((err) => {
                    this.error = err.data
                })
        },
        getListDb() {
            axiosR
                .get(`/social/list`)
                .then((res) => {
                    if (res.status === 200) {
                        this.error = null
                        this.list = res.data
                    }
                })
                .catch((err) => {
                    this.error = err.data
                })
        },
        edit(data) {
            this.isSuccess = ''
            axiosR
                .put('/social/edit', data)
                .then((res) => {
                    if (res.status === 200) {
                        this.error = null
                        let list = this.list.map((item) => {
                            if (item.name === res.data.name) {
                                return res.data
                            }
                            return item
                        })
                        this.list = list
                        this.isSuccess = 'edit'
                        toast.success('Ссылка сохранена', {
                            autoClose: 3000,
                            dangerouslyHTMLString: true
                        })
                    }
                })
                .catch((err) => {
                    this.error = err.data
                })
        },
        remove(name) {
            this.isSuccess = ''
            axiosR
                .get(`/social/remove/${name}`)
                .then((res) => {
                    if (res.status === 200) {
                        this.error = null
                        this.isSuccess = 'remove'
                        toast.success('Ссылка удалена', {
                            autoClose: 3000,
                            dangerouslyHTMLString: true
                        })
                    }
                })
                .catch((err) => {
                    this.error = err.data
                })
        }
    }
})
