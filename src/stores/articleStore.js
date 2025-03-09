import { defineStore } from 'pinia'
import axiosR from '../api/http'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useArticleStore = defineStore('userArticle', {
    state: () => ({
        article: null,
        list: null,
        error: null,
        isSuccess: '',
        sublingId: null,
        randomArticle: null,
        favoriteArticle: false
    }),

    getters: {
        getArticle(state) {
            return state.article
        },
        getError(state) {
            return state.error
        },
        getIsSuccess(state) {
            return state.isSuccess
        },
        getArticleList(state) {
            return state.list
        },
        getArticleSiblingId(state) {
            return state.sublingId
        },
        getRandomArticle(state) {
            return state.randomArticle
        },
        getFavoriteArticle(state) {
            return state.favoriteArticle
        }
    },

    actions: {
        setErrors() {
            this.error = null
        },
        setIsSuccess() {
            this.isSuccess = ''
        },
        add(data) {
            this.isSuccess = ''
            axiosR
                .post(`/article/add`, data)
                .then((res) => {
                    if (res.status === 200) {
                        this.error = null
                        this.isSuccess = 'add'
                        toast.success('Статья сохранена', {
                            autoClose: 3000,
                            dangerouslyHTMLString: true
                        })
                    }
                })
                .catch((err) => {
                    this.error = err.data
                })
        },
        edit(data) {
            this.isSuccess = ''
            axiosR
                .put(`/article/edit`, data)
                .then((res) => {
                    if (res.status === 200) {
                        this.article = res.data
                        this.error = null
                        this.isSuccess = 'edit'
                        toast.success('Статья сохранена', {
                            autoClose: 3000,
                            dangerouslyHTMLString: true
                        })
                    }
                })
                .catch((err) => {
                    this.error = err.data
                })
        },
        getArticleDb(id) {
            axiosR
                .get(`/article/${id}`)
                .then((res) => {
                    if (res.status === 200) {
                        this.article = res.data
                    }
                })
                .catch((err) => {
                    this.error = err.data
                })
        },
        getArticleListDb(params) {
            axiosR
                .get(`/article/list`, { params })
                .then((res) => {
                    if (res.status === 200) {
                        this.list = res.data
                    }
                })
                .catch((err) => {
                    this.error = err.data
                })
        },
        getArticleFavoriteListDb(params) {
            axiosR
                .get(`/article/list/favorite`, { params })
                .then((res) => {
                    if (res.status === 200) {
                        this.list = res.data
                    }
                })
                .catch((err) => {
                    this.error = err.data
                })
        },
        remove(id) {
            this.isSuccess = ''
            axiosR
                .get(`/article/remove/${id}`)
                .then((res) => {
                    if (res.status === 200) {
                        this.isSuccess = 'remove'
                        toast.success('Статья удалена', {
                            autoClose: 3000,
                            dangerouslyHTMLString: true
                        })
                    }
                })
                .catch((err) => {
                    this.error = err.data
                })
        },
        setShow(id) {
            axiosR.get(`/article/show/${id}`).catch((err) => {
                this.error = err.data
            })
        },
        setLike(params) {
            axiosR
                .get('/article/like', {
                    params
                })
                .then((res) => {
                    if (res.status === 200) {
                        this.article = { ...this.article, likes: res.data }
                    }
                })
                .catch((err) => {
                    this.error = err.data
                })
        },
        getArticleSiblingIdDb(id) {
            this.sublingId = null
            axiosR
                .get(`/article/sibling-id/${id}`)
                .then((res) => {
                    if (res.status === 200) {
                        this.sublingId = res.data
                    }
                })
                .catch((err) => {
                    this.error = err.data
                })
        },
        getRandomArticlesDb(param) {
            axiosR
                .get('/article/random-list', { params: param })
                .then((res) => {
                    if (res.status === 200) {
                        this.randomArticle = res.data
                    }
                })
                .catch((err) => {
                    this.error = err.data
                })
        },
        addFavorite(params) {
            axiosR
                .get('/article/add-favorite', {
                    params: params
                })
                .then((res) => {
                    if (res.status == 200) {
                        this.favoriteArticle = true
                    }
                })
        },
        removeFavorite(params) {
            axiosR
                .get('/article/remove-favorite', {
                    params: params
                })
                .then((res) => {
                    if (res.status == 200) {
                        this.favoriteArticle = false
                    }
                })
        },
        getFavorite(params) {
            this.favoriteArticle = false

            axiosR
                .get('/article/favorite', {
                    params: params
                })
                .then((res) => {
                    if (res.status == 200) {
                        this.favoriteArticle = res.data
                    }
                })
        }
    }
})
