import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Detail from '../views/Detail.vue'
import Video from '../views/Video.vue'
import Blog from '../views/Blog.vue'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/detail/:data',
        name: 'Detail',
        component: Detail,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/video',
        name: 'Video',
        component: Video,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/blog',
        name: 'Blog',
        component: Blog,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    }
]



const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (router.app.$store.state.user.username) { //this.$store失效，是this指向问题
            next()
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        }
    } else {
        next()
    }
})

export default router