import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.min.js"
import $ from 'jquery'
import './plugins/element.js'

var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8088/api'
Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.prototype.bus = new Vue();//bus定义为全局的一个对象

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')