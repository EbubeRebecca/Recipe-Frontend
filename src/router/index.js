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
                has_header: false,
                requiresAuth: false,
                title: 'Homepage'
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

        {
            path: '/recipes/create',
            name: 'createrecipe',
            component: () => import('../views/CreateRecipeView.vue'),
            meta: {
                has_header: true,
                requiresAuth: true,
                title: 'New Recipe'
            }

        },
    ]
})


router.beforeEach((to, from, next) => {

    // This goes through the matched routes from last to first, finding the closest route with a title.
    // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

    // Find the nearest route element with meta tags.
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
    //const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

    // If a route with a title was found, set the document (page) title to that value.
    if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

    // Remove any stale meta tags from the document using the key attribute we set below.
    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

    // Skip rendering meta tags if there are none.
    if (!nearestWithMeta) return next();

    // Turn the meta tag definitions into actual elements in the head.
    nearestWithMeta.meta.metaTags.map(tagDef => {
        const tag = document.createElement('meta');

        Object.keys(tagDef).forEach(key => {
            tag.setAttribute(key, tagDef[key]);
        });

        // We use this to track which meta tags we create, so we don't interfere with other ones.
        tag.setAttribute('data-vue-router-controlled', '');

        return tag;
    })
        // Add the meta tags to the document head.
        .forEach(tag => document.head.appendChild(tag));


    if (to.matched.some(record => record.meta.requiresAuth)) {
        let isAuthenticated = false;
        if (localStorage.getItem('token')) {
            isAuthenticated = true;
        }
        else {
            isAuthenticated = false;
        }
        if (isAuthenticated) {
            next()
        } else {

            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })

        }
    } else {
        next()
    }
})

export default router
