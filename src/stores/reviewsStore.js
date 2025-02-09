import { defineStore } from 'pinia'
import axiosR from '@/api/http'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useReviewsStore = defineStore('reviewsStore', {
    state: () => ({
        list: null,
        errors: null,
        success: false
    }),
    getters: {
        getReviewsList(state) {
            return state.list
        },
        getErrors(state) {
            return state.errors
        },
        getSuccess(state) {
            return state.success
        }
    },
    actions: {
        addReviews(data) {
            this.success = false
            this.errors = null

            axiosR
                .post('/reviews/add', data)
                .then((res) => {
                    if (res.status === 200) {
                        this.success = true
                        toast.success('Отзыв сохранен', {
                            autoClose: 3000,
                            dangerouslyHTMLString: true
                        })
                    }
                })
                .catch((err) => {
                    this.errors = err.data
                })
        },
        ediReviews(data) {
            this.success = false
            this.errors = null
            axiosR
                .put('/reviews/edit', data)
                .then((res) => {
                    if (res.status === 200) {
                        this.success = true
                        toast.success('Отзыв сохранен', {
                            autoClose: 3000,
                            dangerouslyHTMLString: true
                        })
                    }
                })
                .catch((err) => {
                    this.errors = err.data
                })
        },
        getListDb() {
            this.errors = null
            axiosR
                .get('/reviews/list')
                .then((res) => {
                    if (res.status === 200) {
                        this.list = res.data
                    }
                })
                .catch((err) => {
                    this.errors = err.data
                })
        },
        removeReviews(id) {
            this.errors = null
            this.success = false

            axiosR
                .get('/reviews/remove/' + id)
                .then((res) => {
                    if (res.status === 200) {
                        this.success = true
                        toast.success('Отзыв удален', {
                            autoClose: 3000,
                            dangerouslyHTMLString: true
                        })
                    }
                })
                .catch((err) => {
                    this.errors = err.data
                })
        }
    }
})
