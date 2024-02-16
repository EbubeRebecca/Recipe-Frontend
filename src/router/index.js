import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {
                has_header: true,
                requiresAuth: false,
                title: 'Hompeage'
            }
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue')
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import('../views/AdminPage.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Login.vue'),
            meta: {
                has_header: false,
                requiresAuth: false,
                title: 'Login'
            }
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/Register.vue'),
            meta: {
                has_header: false,
                requiresAuth: false,
                title: 'Register'
            }
        },
        {
            path: '/recipe/:id',
            name: 'viewrecipe',
            component: () => import('../views/RecipeDetail.vue'),
            meta: {
                has_header: true,
                requiresAuth: false,
                title: 'View Recipe'
            }

        },
    ]
})

export default router
