/**
 * http配置
 */
// 引入axios以及element ui中的loading和message组件
import Vue from 'vue'
import axios from 'axios'
import store from '@/store'

import {
  Message,
  Loading
} from 'element-ui'


Vue.prototype.$http = axios
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';


if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://218.16.212.90:16452'
//   axios.defaults.baseURL = 'http://218.16.212.90:16460'
}

// 超时时间
axios.defaults.timeout = 20000

// http请求拦截器
var loadinginstace
axios.interceptors.request.use(config => {
  if (sessionStorage.getItem("token")) { // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.token = sessionStorage.getItem("token");
  }
  return config
}, error => {
  Message.error({
    message: '加载超时'
  })
  return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {
  return data
}, error => {
  if (error & error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '请求错误(400)';
        break;
      case 401:
        error.message = '未授权，请重新登录(401)';
        break;
      case 403:
        error.message = '拒绝访问(403)';
        break;
      case 404:
        error.message = '请求出错(404)';
        break;
      case 408:
        error.message = '请求超时(408)';
        break;
      case 500:
        error.message = '服务器错误(500)';
        break;
      case 501:
        err.message = '服务未实现(501)';
        break;
      case 502:
        error.message = '网络错误(502)';
        break;
      case 503:
        error.message = '服务不可用(503)';
        break;
      case 504:
        error.message = '网络超时(504)';
        break;
      case 505:
        error.message = 'HTTP版本不受支持(505)';
        break;
      default:
        error.message = `连接出错(${error.response.status})!`;
    }
  } else {
    Message.error({
      message: '连接服务器失败!'
    })
  }

  return Promise.reject(error)
})




export default axios
