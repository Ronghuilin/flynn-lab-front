import Vue from 'vue'
import Vuex from 'vuex'
import App from './App';
import router from './router'
import axios from 'axios'
import moment from 'moment'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';


Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(Vuex)

Vue.prototype.moment = moment
Vue.prototype.axios = axios
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

// 响应拦截器
axios.interceptors.response.use(
    response => {
        console.log('interceptors response', response)
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        let data = response.data
        if (data && data.code === 1) {
            return Promise.resolve(response);
        } else {
            message.warn(data.msg)
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是2开头的的情况
    // 这里可以跟你们的后台开发人员协商好统一的错误状态码
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    // 下面列举几个常见的操作，其他需求可自行扩展
    error => {
        console.log('interceptors error', error)
        if (error.response.code) {
            console.log(error)
        }
    }
)
 */