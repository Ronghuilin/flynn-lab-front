import Vue from 'vue'
import Vuex from 'vuex'
import App from './App';
import router from './router'
import moment from 'moment'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import {env, getReq, initEnv, postReq} from './api/request.js'

Vue.config.productionTip = false
initEnv(env.dev)


Vue.use(Antd)
Vue.use(Vuex)

Vue.prototype.getReq=getReq
Vue.prototype.postReq=postReq

Vue.prototype.moment = moment
Vue.prototype.store = new Vuex.Store({
    state: {
        token: null
    },
    mutations: {
        setToken(t) {
            this.token = t
        }
    }
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

/**
 axios.defaults.timeout = 10000
 axios.defaults.headers.post['Content-Type'] = "application/json;charset=UTF-8"
 axios.interceptors.request.use(
 config => {
        // const token = Vue.store.state.token
        // token && (config.headers.Authorization = token)
        config.headers.FlynnToken = 'test-token-flynn'
        return config
    },
 error => {
        return Promise.error(error)
    }
 )
 */


