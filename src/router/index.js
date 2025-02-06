import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import BlogPage from '../views/blog/BlogPage.vue'
import ArticlePage from '../views/blog/ArticlePage.vue'
import CooperationPage from '../views/CooperationPage.vue'
import ServicesPage from '../views/ServicesPage.vue'
import AboutView from '../views/AboutView.vue'
import CabinetView from '../views/cabinet/ShowcaseView.vue'
import MyCasesView from '../views/cabinet/MyCasesView.vue'
import MyArticleView from '../views/cabinet/MyArticleView.vue'
import CardPage from '../views/cabinet/CardPage.vue'
import ProfileView from '../views/cabinet/ProfileView.vue'
import EditArticle from '@/views/blog/edit/EditArticle.vue'
import AdminPage from '@/views/AdminPage.vue'

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
                    path: 'create',
                    name: 'create-article',
                    component: EditArticle
                },
                {
                    path: 'edit/:id',
                    name: 'edit-article',
                    component: EditArticle
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
        },
        {
            path: '/admin',
            name: 'admin-page',
            component: AdminPage
        },
        {
            path: '/cabinet',
            children: [
                {
                    path: 'showcase',
                    name: 'showcase',
                    component: CabinetView
                },
                {
                    path: 'showcase/:name/',
                    props: true,
                    name: 'card-page',
                    component: CardPage
                },
                {
                    path: 'my-cases',
                    name: 'my-cases',
                    component: MyCasesView
                },
                {
                    path: 'my-article',
                    name: 'my-article',
                    component: MyArticleView
                },
                {
                    path: 'profile',
                    name: 'profile',
                    component: ProfileView
                }
            ]
        }
    ],
    scrollBehavior(to, from, savedPosition) {
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
