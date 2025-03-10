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
import CaseDetailsPage from '../views/cabinet/CaseDetailsPage.vue'
import ProfileView from '../views/cabinet/ProfileView.vue'
import EditArticle from '@/views/blog/edit/EditArticle.vue'
import AdminPage from '@/views/AdminPage.vue'
import { useUserStore } from '@/stores/userStore'
import ErrorPage from '@/views/error/ErrorPage.vue'
import EditCase from '@/components/admin/case/EditCase.vue'

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
                    component: EditArticle,
                    meta: { protected: true }
                },
                {
                    path: 'edit/:id',
                    name: 'edit-article',
                    component: EditArticle,
                    meta: { protected: true }
                },
                {
                    path: ':id',
                    name: 'blog-articke',
                    component: ArticlePage
                }
            ]
        },
        {
            path: '/case',
            children: [
                {
                    path: 'create',
                    name: 'create-case',
                    component: EditCase,
                    meta: { protected: true }
                },
                {
                    path: 'edit/:id',
                    name: 'edit-case',
                    component: EditCase,
                    meta: { protected: true }
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
            component: AdminPage,
            meta: { protected: true }
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
                    path: 'showcase/:id',
                    name: 'card-page',
                    component: CaseDetailsPage
                },
                {
                    path: 'my-cases',
                    name: 'my-cases',
                    component: MyCasesView
                },
                {
                    path: 'my-cases/:id',
                    name: 'card-page__favorite',
                    component: CaseDetailsPage
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
        },
        {
            path: '/error',
            name: 'error',
            component: ErrorPage
        }
    ],
    scrollBehavior(_, __, savedPosition) {
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

router.beforeEach((to, _, next) => {
    const user = useUserStore()
    if (to.matched.some((route) => route.meta.protected && route.meta.admin)) {
        if (
            localStorage.getItem('token') &&
            (user.getUser?.role === 'ROLE_ADMIN' || user.getUser?.role === 'ROLE_MODERATOR')
        ) {
            next()
            return
        }
        next('/')
    } else if (to.matched.some((route) => route.meta.protected)) {
        if (localStorage.getItem('token')) {
            next()
            return
        }
        next('/')
    } else {
        next()
    }
})

export default router
