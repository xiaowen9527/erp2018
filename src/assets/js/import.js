/**
 * http配置
 */
// 引入axios以及element ui中的loading和message组件
import Vue from 'vue'
import axios from 'axios'


Vue.prototype.$ajax = axios.create({
  timeout: 1000 * 60 * 30,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  },
});





export default axios
