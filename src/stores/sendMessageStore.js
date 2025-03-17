import { defineStore } from 'pinia'
import axiosR from '@/api/http'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useSendMessageStore = defineStore('sendMessageStore', {
    state: () => ({
        isSuccess: null,
        errors: null
    }),
    getters: {
        getIsSuccess(state) {
            return state.isSuccess
        }
    },
    actions: {
        setIsSuccess(val) {
            this.isSuccess = val
        },
        sendFaq(params) {
            this.isSuccess = ''
            axiosR
                .post('/send-mail/faq', { ...params })
                .then((res) => {
                    if (res.status === 200) {
                        this.isSuccess = true
                        this.errors = null
                    }
                })
                .catch((err) => {
                    this.errors = err.response.data
                })
        },
        sendOfferMaterial(data) {
            this.isSuccess = ''
            axiosR
                .post('/send-mail/offer-material', data)
                .then((res) => {
                    if (res.status === 200) {
                        this.status = 200
                        this.errors = null
                        this.isSuccess = 'send-case'
                                     }
                })
                .catch((err) => {
                    this.errors = err.response.data
                })
        },
        setStatusNull() {
            this.status = null
        },
        sendFormTheme(data) {
            this.isSuccess = ''
            axiosR
                .post('/send-mail/theme', data)
                .then((res) => {
                    if (res.status === 200) {
                        this.status = 200
                        this.errors = null
                        this.isSuccess = 'send-form'
                    }
                })
                .catch((err) => {
                    this.errors = err.response.data
                })
        }
    }
})
