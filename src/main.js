import Vue from 'vue'
import Vuex from 'vuex'
import App from './App';
import 'ant-design-vue/dist/antd.css';
import router from './router'
import Antd, {message} from 'ant-design-vue';

Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(Vuex)

import moment from 'moment'

Vue.prototype.$moment = moment

import axios from 'axios'

Vue.prototype.axios = axios

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = "application/json;charset=UTF-8"
axios.interceptors.request.use(
    config => {
        const token = Vue.store.state.token
        token && (config.headers.Authorization = token)
        return config
    },
    error => {
        return Promise.error(error)
    }
)

// 响应拦截器
axios.interceptors.response.use(
    response => {
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
        if (error.response.code) {
            console.log(error)
        }
    }
)