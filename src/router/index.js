import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import BlogPage from '../views/BlogPage.vue'
import ArticlePage from '../views/ArticlePage.vue'
import CooperationPage from '../views/CooperationPage.vue'
import ServicesPage from '../views/ServicesPage.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/blog',
            children: [
                {
                    path: '',
                    name: 'blog',
                    component: BlogPage
                },
                {
                    path: ':id',
                    name: 'blog-articke',
                    component: ArticlePage
                }
            ]
        },
        {
            path: '/cooperation',
            name: 'cooperation',
            component: CooperationPage
        },
        {
            path: '/services',
            name: 'services',
            component: ServicesPage
        },
        {
            path: '/about',
            name: 'about',
            component: AboutView
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                top: 0,
                behavior: 'smooth'
            }
        }
    }
})

export default router
