import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/index'
import Blog from '../views/blog'
import Login from '../views/login'

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'Index',
        component: Index
    }, {
        path: '/blog/:id',
        name: 'Blog',
        component: Blog
    }, {
		path: '/login',
		name: 'Login',
		component: Login
	}]
})
