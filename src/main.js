// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './vuex/store'

Vue.prototype.$http = axios
Vue.config.productionTip = false
// axios.defaults.withCredentials = true


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

/*router.beforeEach((to, from, next) => {
  //可以用router.app来获取相关参数
  var islogin=router.app.$store.state.islogin;
  // from.path:当前url
  if (from.path == '/') {

  }
  //to.path ：你即将访问的url
  if (to.path == '/') {

  }
  // 限定条件
  if (!islogin && to.path != '/') {
      // next()：正常跳转，
      // 括号里加url就跳url
       next({ path: '/' })
  } else {
    next()
  }
})*/