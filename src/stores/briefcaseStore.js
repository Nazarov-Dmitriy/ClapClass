import { defineStore } from 'pinia'
import axiosR from '../api/http'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useBriefcaseStore = defineStore('userBriefcase', {
    state: () => ({
        briefcase: null,
        list: null,
        randomList: null,
        error: null,
        disableRequest: false,
        isSuccess: '',
        currentRating: 0
    }),

    getters: {
        getBriefcase(state) {
            return state.briefcase
        },
        getListBriefcase(state) {
            return state.list
        },
        getError(state) {
            return state.error
        },
        getIsSuccess(state) {
            return state.isSuccess
        },
        getListBriefcaseRandom(state) {
            return state.randomList
        },
        getDisableRequest(state) {
            return state.disableRequest
        },
        getCurrentRating(state) {
            return state.currentRating
        }
    },

    actions: {
        setErrors() {
            this.error = null
        },
        setIsSuccess() {
            this.isSuccess = ''
        },
        clearBriefcase() {
            this.briefcase = null
        },

        add(data) {
            this.isSuccess = ''
            axiosR
                .post(`/briefcase/add`, data)
                .then((res) => {
                    if (res.status === 200) {
                        this.error = null
                        this.isSuccess = 'add'
                        this.briefcase = res.data
                        toast.success('Кейс сохранен', {
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
                .put(`/briefcase/edit`, data)
                .then((res) => {
                    if (res.status === 200) {
                        this.briefcase = res.data
                        this.error = null
                        this.isSuccess = 'edit'
                        toast.success('Информация обновлена', {
                            autoClose: 3000,
                            dangerouslyHTMLString: true
                        })
                    }
                })
                .catch((err) => {
                    this.error = err.data
                })
        },
        getCaseListDb(params) {
            axiosR
                .get(`/briefcase/list`, { params })
                .then((res) => {
                    if (res.status === 200) {
                        this.list = res.data
                    }
                })
                .catch((err) => {
                    this.error = err.data
                })
        },
        getCaseFavoriteListDb(params) {
            axiosR
                .get(`/briefcase/list/favorite`, { params })
                .then((res) => {
                    if (res.status === 200) {
                        this.list = res.data
                    }
                })
                .catch((err) => {
                    this.error = err.data
                })
        },
        getBriefcaseStoreDb(id) {
            axiosR
                .get(`/briefcase/${id}`)
                .then((res) => {
                    if (res.status === 200) {
                        this.briefcase = { ...this.briefcase, ...res.data }
                    }
                })
                .catch((err) => {
                    this.error = err.data
                })
        },
        remove(id) {
            this.isSuccess = ''
            axiosR
                .get(`/briefcase/remove/${id}`)
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
        addSliderImages(data) {
            this.isSuccess = ''
            this.disableRequest = true

            axiosR
                .post(`/briefcase/slider-image/add`, data)
                .then((res) => {
                    if (res.status === 200) {
                        this.error = null
                        this.isSuccess = 'add-slider-image'
                        this.briefcase = { ...this.briefcase, images_slider: res.data }
                        toast.success('Фотогарфии сохранены', {
                            autoClose: 3000,
                            dangerouslyHTMLString: true
                        })
                    }
                })
                .catch((err) => {
                    this.error = err.data
                })
                .finally(() => (this.disableRequest = false))
        },
        removeSliderImage(data) {
            this.isSuccess = ''
            axiosR
                .post(`/briefcase/remove/slider-image`, data)
                .then((res) => {
                    if (res.status === 200) {
                        this.error = null
                        this.isSuccess = 'remove-slider'
                        let images_slider = this.briefcase.images_slider.filter(
                            (el) => el.id !== res.data
                        )
                        this.briefcase = { ...this.briefcase, images_slider: images_slider }
                    }
                })
                .catch((err) => {
                    this.error = err.data
                })
        },
        addRulesVideo(data) {
            this.isSuccess = ''
            this.disableRequest = true
            axiosR
                .post(`/briefcase/rules-video/add`, data)
                .then((res) => {
                    if (res.status === 200) {
                        this.error = null
                        this.isSuccess = 'video-rules'
                        this.briefcase = res.data
                        toast.success('Видео правила добавлены', {
                            autoClose: 3000,
                            dangerouslyHTMLString: true
                        })
                    }
                })
                .catch((err) => {
                    this.error = err.data
                })
                .finally(() => (this.disableRequest = false))
        },
        editRulesVideo(data) {
            this.isSuccess = ''
            this.disableRequest = true
            axiosR
                .post(`/briefcase/rules-video/edit`, data)
                .then((res) => {
                    if (res.status === 200) {
                        this.error = null
                        this.isSuccess = 'video-rules'
                        this.briefcase = res.data
                    }
                    toast.success('Видео правила изменены', {
                        autoClose: 3000,
                        dangerouslyHTMLString: true
                    })
                })
                .catch((err) => {
                    this.error = err.data
                })
                .finally(() => (this.disableRequest = false))
        },
        addLevelCase(data) {
            this.isSuccess = ''
            this.disableRequest = true
            axiosR
                .post(`/briefcase/level-case/add`, data)
                .then((res) => {
                    if (res.status === 200) {
                        this.error = null
                        this.isSuccess = 'level-add'
                        this.briefcase = res.data
                    }
                    toast.success('Уровень добавлен', {
                        autoClose: 3000,
                        dangerouslyHTMLString: true
                    })
                })
                .catch((err) => {
                    this.error = { ...this.error, level: { ...err.data } }
                })
                .finally(() => (this.disableRequest = false))
        },
        editLevelCase(data) {
            this.isSuccess = ''
            this.disableRequest = true

            axiosR
                .post(`/briefcase/level-case/edit`, data)
                .then((res) => {
                    if (res.status === 200) {
                        this.error = null
                        this.isSuccess = 'level-edit'
                        let levels = this.briefcase?.levels.map((el) =>
                            el.id === res.data.id ? res.data : el
                        )
                        this.briefcase = { ...this.briefcase, levels: levels }
                    }
                    toast.success('Уровень обновлен', {
                        autoClose: 3000,
                        dangerouslyHTMLString: true
                    })
                })
                .catch((err) => {
                    this.error = { ...this.error, [`level${data.get('levelId')}`]: { ...err.data } }
                })
                .finally(() => (this.disableRequest = false))
        },
        removeLevel(params) {
            this.isSuccess = ''
            axiosR
                .get(`/briefcase/remove-level`, { params })
                .then((res) => {
                    if (res.status === 200) {
                        this.isSuccess = 'remove-level'
                        let levels = this.briefcase.levels.filter((el) => el.id !== res.data)
                        this.briefcase = { ...this.briefcase, levels: levels }
                        toast.success('Уровень удален', {
                            autoClose: 3000,
                            dangerouslyHTMLString: true
                        })
                    }
                })
                .catch((err) => {
                    this.error = err.data
                })
        },
        getRandomListDb(param) {
            axiosR
                .get('/briefcase/random-list', { params: param })
                .then((res) => {
                    if (res.status === 200) {
                        this.randomList = res.data
                    }
                })
                .catch((err) => {
                    this.error = err?.data
                })
        },
        setShow(id) {
            axiosR.get(`/briefcase/show/${id}`).catch((err) => {
                this.error = err.data
            })
        },
        addFavorite(params) {
            this.isSuccess = ''
            axiosR
                .get('/briefcase/favorite/add', {
                    params: params
                })
                .then((res) => {
                    if (res.status == 200) {
                        this.isSuccess = 'favorite-change'
                        this.briefcase = { ...this.briefcase, favorite: true }
                    }
                })
        },
        getFavorite(params) {
            axiosR
                .get('/briefcase/favorite', {
                    params: params
                })
                .then((res) => {
                    if (res.status == 200) {
                        this.briefcase = { ...this.briefcase, favorite: res.data }
                    }
                })
                .catch((err) => {
                    this.error = err.data
                })
        },
        removeFavorite(params) {
            this.isSuccess = ''
            axiosR
                .get('/briefcase/favorite/remove', {
                    params: params
                })
                .then((res) => {
                    if (res.status == 200) {
                        this.isSuccess = 'favorite-change'
                        this.briefcase = { ...this.briefcase, favorite: false }
                    }
                })
        },
        addRating(params) {
            this.isSuccess = ''
            axiosR
                .get('/briefcase/rating/add', {
                    params: params
                })
                .then((res) => {
                    if (res.status == 200) {
                        this.currentRating = res.data
                    }
                })
        },
        getRating(params) {
            axiosR
                .get('/briefcase/rating', {
                    params: params
                })
                .then((res) => {
                    if (res.status == 200) {
                        this.currentRating = res.data
                    }
                })
                .catch((err) => {
                    this.error = err.data
                })
        },
        async setArticlePublished(id) {
            this.isSuccess = ''
            axiosR
                .put('/briefcase/published/' + id)
                .then((res) => {
                    if (res.status == 200) {
                        this.isSuccess = 'published'
                    }
                })
                .catch((err) => {
                    console.dir(err)
                })
        }
    }
})
