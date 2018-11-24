// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'babel-polyfill' //ie空白
import '@/assets/styles/reset.styl' //重置css
import '@/assets/js/http.js' //请求超时拦截


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'


Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})

//  判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {

  if (sessionStorage.getItem("token")) {
    next()
  } else {
    next({
      path: '/login'
    })
  }
})
//  判断是否需要登录权限 以及是否登录
// router.beforeEach((to, from, next) => {
//   if (sessionStorage.getItem("token")) {
//     next()
//   } else {
//     next({
//       path: '/login'
//     })
//   }

// })
