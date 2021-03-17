import Vue from 'vue'
import {message} from 'ant-design-vue'
import axios from "axios";
// 响应拦截器
axios.interceptors.response.use(
    response => {
        // console.log('interceptors response', response)
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        // console.log(response)
        if (response.status === 200) {
            let result = response.data
            if (result.code !== 1) {
                message.warn(result.msg)
            }
            return Promise.resolve(response.data)
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是2开头的的情况
    // 这里可以跟你们的后台开发人员协商好统一的错误状态码
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    // 下面列举几个常见的操作，其他需求可自行扩展
    error => {
        if (error && error.response) {
            let errMsg = (error.response && error.response.data && error.response.data.error) || 'unkown error'
            if (error.response.status >= 500 && error.response.status <= 599) {
                // console.log("server error, status=", status, " error=", errMsg)
                message.warn('server error,' + error.response.status + ', ' + errMsg)
            } else if (status >= 400 && status <= 499) {
                // console.log('client error, status', status, " error=", errMsg)
                message.warn('client error, ' + error.response.status + ', ' + errMsg)
            } else {
                // console.log('unkown error, ', error.response.status, " error=", errMsg)
                message.warn('unkown error, ' + error.response.status + ', ' + errMsg)
            }
            console.error('error=', JSON.stringify(error))
            console.error(error)
        }

    }
)
Vue.prototype.axios = axios

export const env = {
    dev: {
        host: 'http://localhost:8128'
    },
    prod: {
        host: 'http://127.0.0.1:8128'
    }
}

export function initEnv(env) {
    console.log('current env = ', env)
    return Vue.prototype.env = env
}

function getUrl(uri) {
    return Vue.prototype.env.host + uri
}


export function getReq(uri, params, errorTips) {
    let url = getUrl(uri)
    console.log(uri, url)
    return new Promise((resolve) => {
        Vue.prototype.axios.get(url, {params: params})
            .then(result => {
                resolve(result)
                if (result && result.code === 1 && errorTips) {
                    message.warn(result.msg)
                }
            })
    })
}

export function postReq(uri, params, errorTips) {
    let url = getUrl(uri)
    return new Promise((resolve) => {
        Vue.prototype.axios.post(url, params)
            .then(result => {
                console.log('get check login...', result)
                if (result && result.code === 1 && errorTips) {
                    message.warn(result.msg)
                }
                resolve(result)
            })
    })
}